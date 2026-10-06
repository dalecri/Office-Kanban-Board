import { initMobile } from './ui/mobile.js';
import { $ } from './ui/dom.js';
import { ui } from './state.js';
import { init } from './storage.js';
import { renderBoard } from './ui/board.js';
import { initTaskEditor } from './ui/task-editor.js';
import { initInspector } from './ui/inspector.js';
import { startSimulation } from './office/simulation.js';

async function main() {
  await init();
  renderBoard();
  initMobile();
  initTaskEditor();
  initInspector();
  document.addEventListener('taskschange', renderBoard);
  $('pause').onclick = () => {
    ui.paused = !ui.paused;
    $('pause').textContent = ui.paused ? '▶ Resume' : 'Ⅱ Pause';
    $('liveText').textContent = ui.paused
      ? 'Office is paused'
      : 'Office is live';
  };
  startSimulation();
}
main().catch((error) => {
  console.error(error);
  $('saved').textContent = 'Could not start the app. Please reload.';
});
