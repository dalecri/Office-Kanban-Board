import { $, esc } from './dom.js';
import { tasks, AGENTS } from '../state.js';
import { COLS, PRIOR } from '../config.js';
import { changed } from '../tasks.js';
import { openTask } from './task-editor.js';
let dragId = null;
export function renderBoard() {
  $('board').innerHTML = COLS.map(([id, label, color]) => {
    const list = tasks.filter((t) => t.col === id);
    return `<section class="column" data-col="${id}" style="--accent:${color}"><div class="column-head"><i class="dot"></i>${label}<span class="n">${list.length}</span><button data-add="${id}" aria-label="Add task to ${label}">+</button></div>${
      list
        .map((t) => {
          const a = AGENTS[t.agent];
          return `<button draggable="true" class="card ${a ? '' : 'unassigned'}" data-id="${esc(t.id)}" style="--tint:${a ? a.shirt + '16' : '#24212f'}"><span class="card-title">${esc(t.title)}</span><span class="card-meta"><i class="avatar-dot" style="background:${a?.shirt || '#6b657c'}"></i>${a?.name || 'Unassigned'}<span class="priority" style="color:${PRIOR[t.priority]}">${t.priority === 'high' ? '↑' : t.priority === 'medium' ? '−' : '↓'} ${t.priority}</span></span></button>`;
        })
        .join('') || '<div class="empty">Nothing here. Yet.</div>'
    }</section>`;
  }).join('');
  $('total').textContent = tasks.length;
  const done = tasks.filter((t) => t.col === 'done').length;
  $('complete').textContent = `${done} of ${tasks.length} completed`;
  $('progress').style.width =
    (tasks.length ? (done / tasks.length) * 100 : 0) + '%';
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
        t.col = c.dataset.col;
        changed();
      }
      c.classList.remove('over');
    };
  });
}
