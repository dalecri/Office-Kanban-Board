import { $, esc } from './dom.js';
import { tasks, AGENTS } from '../state.js';
import { COLS, PRIOR } from '../config.js';
import { changed } from '../tasks.js';
import { openTask } from './task-editor.js';
let dragId = null;
let lastMove = null;
function moveTask(id, column) {
  const task = tasks.find((t) => t.id === id);
  if (!task || task.col === column || !COLS.some((c) => c[0] === column))
    return;
  lastMove = { id, from: task.col, to: column };
  task.col = column;
  changed();
  $('moveNotice').hidden = false;
  $('moveMessage').textContent =
    `Moved to ${COLS.find((c) => c[0] === column)[1]}`;
  $('undoMove').onclick = () => {
    const current = tasks.find((t) => t.id === lastMove?.id);
    if (current && current.col === lastMove.to) {
      current.col = lastMove.from;
      changed();
    }
    lastMove = null;
    $('moveNotice').hidden = true;
  };
}

export function renderBoard() {
  $('board').innerHTML = COLS.map(([id, label, color]) => {
    const list = tasks.filter((t) => t.col === id);
    return `<section class="column" data-col="${id}" style="--accent:${color}"><div class="column-head"><i class="dot"></i>${label}<span class="n">${list.length}</span><button data-add="${id}" aria-label="Add task to ${label}">+</button></div>${
      list
        .map((t) => {
          const a = AGENTS[t.agent];
          const next =
            t.col === 'doing'
              ? ['done', '✓ Complete']
              : t.col === 'done'
                ? ['todo', '↶ Reopen']
                : ['doing', '▶ Start work'];
          return `<article class="task-card"><button draggable="true" class="card ${a ? '' : 'unassigned'}" data-id="${esc(t.id)}" style="--tint:${a ? a.shirt + '16' : '#24212f'}"><span class="card-title">${esc(t.title)}</span><span class="card-meta"><i class="avatar-dot" style="background:${a?.shirt || '#6b657c'}"></i>${a?.name || 'Unassigned'}<span class="priority" style="color:${PRIOR[t.priority]}">${t.priority === 'high' ? '↑' : t.priority === 'medium' ? '−' : '↓'} ${t.priority}</span></span></button><div class="card-actions"><select data-move="${esc(t.id)}" aria-label="Move ${esc(t.title)} to another column"><option value="" selected>Move to…</option>${COLS.filter(
            (c) => c[0] !== t.col,
          )
            .map((c) => `<option value="${c[0]}">${c[1]}</option>`)
            .join(
              '',
            )}</select><button type="button" data-next="${esc(t.id)}" data-destination="${next[0]}">${next[1]}</button></div></article>`;
        })
        .join('') || '<div class="empty">Nothing here. Yet.</div>'
    }</section>`;
  }).join('');
  $('total').textContent = tasks.length;
  const done = tasks.filter((t) => t.col === 'done').length;
  $('complete').textContent = `${done} of ${tasks.length} completed`;
  $('progress').style.width =
    (tasks.length ? (done / tasks.length) * 100 : 0) + '%';
  document
    .querySelectorAll('[data-move]')
    .forEach((s) => (s.onchange = () => moveTask(s.dataset.move, s.value)));
  document
    .querySelectorAll('[data-next]')
    .forEach(
      (b) =>
        (b.onclick = () => moveTask(b.dataset.next, b.dataset.destination)),
    );
  document.querySelectorAll('.card').forEach((c) => {
    c.onclick = () => openTask(c.dataset.id);
    c.ondragstart = (e) => {
      dragId = c.dataset.id;
      e.dataTransfer.setData('text/plain', dragId);
      e.dataTransfer.effectAllowed = 'move';
    };
    c.ondragend = () => {
      dragId = null;
      document
        .querySelectorAll('.over')
        .forEach((x) => x.classList.remove('over'));
    };
  });
  document
    .querySelectorAll('[data-add]')
    .forEach((b) => (b.onclick = () => openTask(null, b.dataset.add)));
  document.querySelectorAll('.column').forEach((c) => {
    c.ondragover = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      c.classList.add('over');
    };
    c.ondragleave = (e) => {
      if (!c.contains(e.relatedTarget)) c.classList.remove('over');
    };
    c.ondrop = (e) => {
      e.preventDefault();
      const t = tasks.find(
        (t) => t.id === (dragId || e.dataTransfer.getData('text/plain')),
      );
      if (t) {
        moveTask(t.id, c.dataset.col);
      }
      c.classList.remove('over');
    };
  });
}
