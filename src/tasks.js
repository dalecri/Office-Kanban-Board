import { tasks, AGENTS } from './state.js';
import { persist } from './storage.js';
export function changed() {
  persist();
  for (const a of AGENTS) {
    a.stateTimer = 5 + Math.random() * 10;
    a.rethink = true;
    for (const id of a.submittedTasks)
      if (
        !tasks.some((t) => t.id === id && t.agent === a.id && t.col === 'done')
      )
        a.submittedTasks.delete(id);
  }
  document.dispatchEvent(new Event('taskschange'));
}
