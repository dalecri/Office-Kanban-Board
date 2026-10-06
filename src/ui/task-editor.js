import { $, toast } from './dom.js';
import { tasks, setTasks, AGENTS } from '../state.js';
import { COLS, PRIOR } from '../config.js';
import { setMobileView, isMobile } from './mobile.js';
import { changed } from '../tasks.js';
let editing = null,
  draft = {};
function choices(id, values, key) {
  $(id).innerHTML = '';
  values.forEach(([value, label, color]) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = label;
    b.className = value === draft[key] ? 'active' : '';
    b.setAttribute('aria-pressed', String(value === draft[key]));
    if (color) b.style.boxShadow = `inset 0 -2px ${color}`;
    b.onclick = () => {
      draft[key] = value;
      drawChoices();
    };
    $(id).append(b);
  });
}
function drawChoices() {
  choices('columnChoices', COLS, 'col');
  choices(
    'priorityChoices',
    ['low', 'medium', 'high'].map((x) => [
      x,
      x[0].toUpperCase() + x.slice(1),
      PRIOR[x],
    ]),
    'priority',
  );
  choices(
    'agentChoices',
    [[null, 'Unassigned'], ...AGENTS.map((a) => [a.id, a.name, a.shirt])],
    'agent',
  );
}
export function openTask(id = null, col = 'todo') {
  editing = id;
  draft = {
    ...(tasks.find((t) => t.id === id) || {
      title: '',
      note: '',
      col,
      priority: 'medium',
      agent: null,
    }),
  };
  $('modalTitle').textContent = id ? 'Edit task' : 'New task';
  $('taskTitle').setCustomValidity('');
  $('taskTitle').value = draft.title;
  $('note').value = draft.note;
  $('delete').hidden = !id;
  $('saveTask').textContent = id ? 'Save changes' : 'Create task';
  drawChoices();
  $('tooltip').hidden = true;
  $('modal').showModal();
  if (!isMobile() || !id) $('taskTitle').focus();
}

export function initTaskEditor() {
  $('new').onclick = () => openTask();
  $('cancel').onclick = () => $('modal').close();
  $('modal').onclick = (e) => {
    if (e.target === $('modal')) {
      const r = $('modal').getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        $('modal').close();
    }
  };
  $('form').onsubmit = (e) => {
    e.preventDefault();
    const title = $('taskTitle').value.trim();
    if (!title) {
      $('taskTitle').setCustomValidity('Add a task title.');
      $('taskTitle').reportValidity();
      return;
    }
    const t = {
      ...draft,
      title,
      note: $('note').value,
      id: editing || crypto.randomUUID(),
    };
    if (editing) setTasks(tasks.map((x) => (x.id === editing ? t : x)));
    else tasks.push(t);
    if (isMobile()) {
      $('board').dataset.activeColumn = t.col;
      setMobileView('tasks');
    }
    changed();
    $('modal').close();
  };
  $('taskTitle').oninput = () => $('taskTitle').setCustomValidity('');
  $('delete').onclick = () => {
    setTasks(tasks.filter((t) => t.id !== editing));
    changed();
    $('modal').close();
    toast('Task deleted');
  };
  function toggleBoard() {
    if (isMobile()) {
      setMobileView(
        document.body.dataset.mobileView === 'office' ? 'tasks' : 'office',
      );
      return;
    }
    const closed = $('drawer').classList.toggle('closed');
    $('toggle').setAttribute('aria-expanded', !closed);
  }
  $('toggle').onclick = toggleBoard;
  $('closeBoard').onclick = toggleBoard;
}
