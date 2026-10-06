import { $, esc } from './dom.js';
import { tasks, AGENTS } from '../state.js';
import { COLS } from '../config.js';
import { changed } from '../tasks.js';
import { openTask } from './task-editor.js';

let scope = {};
let undo = null;
export function openTray(next) {
  scope = next;
  undo = null;
  $('trayFeedback').textContent = '';
  $('tooltip').hidden = true;
  renderTray();
  if (!$('taskTray').open) $('taskTray').showModal();
}
function renderTray() {
  const colleague = AGENTS[scope.agent];
  $('trayTitle').textContent = scope.title || `${colleague.name}'s tasks`;
  $('trayDescription').textContent =
    scope.description || 'Manage assignments right here in the office.';
  const list = tasks.filter(
    (t) =>
      (scope.agent === undefined || t.agent === scope.agent) &&
      (!scope.col || t.col === scope.col),
  );
  $('trayCount').textContent =
    `${list.length} task${list.length === 1 ? '' : 's'}`;
  $('trayTasks').innerHTML =
    list
      .map((t) => {
        const next =
          t.col === 'doing'
            ? ['done', '✓ Complete']
            : t.col === 'done'
              ? ['todo', '↶ Reopen']
              : ['doing', '▶ Start work'];
        return `<article class="tray-task"><button class="tray-edit" data-edit="${esc(t.id)}">${esc(t.title)}<span>Edit details ›</span></button><div class="tray-fields"><label>Status<select data-status="${esc(t.id)}">${COLS.map((c) => `<option value="${c[0]}" ${t.col === c[0] ? 'selected' : ''}>${c[1]}</option>`).join('')}</select></label><label>Assigned to<select data-assign="${esc(t.id)}"><option value="" ${t.agent === null ? 'selected' : ''}>Unassigned</option>${AGENTS.map((a) => `<option value="${a.id}" ${t.agent === a.id ? 'selected' : ''}>${a.name}</option>`).join('')}</select></label></div><button class="tray-advance" data-advance="${esc(t.id)}" data-col="${next[0]}">${next[1]}</button></article>`;
      })
      .join('') ||
    '<p class="tray-empty">All clear here. Add a task, or check another part of the office.</p>';
  $('trayUndo').hidden = !undo;
  $('trayTasks')
    .querySelectorAll('[data-edit]')
    .forEach(
      (b) =>
        (b.onclick = () => {
          $('taskTray').close();
          openTask(b.dataset.edit);
        }),
    );
  $('trayTasks')
    .querySelectorAll('[data-status]')
    .forEach(
      (s) => (s.onchange = () => updateTask(s.dataset.status, 'col', s.value)),
    );
  $('trayTasks')
    .querySelectorAll('[data-assign]')
    .forEach(
      (s) =>
        (s.onchange = () =>
          updateTask(
            s.dataset.assign,
            'agent',
            s.value === '' ? null : Number(s.value),
          )),
    );
  $('trayTasks')
    .querySelectorAll('[data-advance]')
    .forEach(
      (b) =>
        (b.onclick = () => updateTask(b.dataset.advance, 'col', b.dataset.col)),
    );
}
function updateTask(id, key, value) {
  const task = tasks.find((t) => t.id === id);
  if (!task || task[key] === value) return;
  undo = { id, key, before: task[key], after: value };
  task[key] = value;
  changed();
  $('trayFeedback').textContent =
    key === 'agent' ? 'Assignment updated.' : 'Task status updated.';
}
export function initTaskTray() {
  $('closeTray').onclick = () => $('taskTray').close();
  $('trayNew').onclick = () => {
    $('taskTray').close();
    openTask(null, scope.col || 'todo', scope.agent ?? null);
  };
  $('trayUndo').onclick = () => {
    const task = tasks.find((t) => t.id === undo?.id);
    if (task && task[undo.key] === undo.after) task[undo.key] = undo.before;
    undo = null;
    changed();
    $('trayFeedback').textContent = 'Change undone.';
  };
  document.addEventListener('taskschange', () => {
    if ($('taskTray').open) renderTray();
  });
  $('taskTray').addEventListener('click', (e) => {
    if (e.target !== $('taskTray')) return;
    const r = $('taskTray').getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      $('taskTray').close();
  });
}
