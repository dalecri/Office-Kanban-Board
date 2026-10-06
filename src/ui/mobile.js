import { $ } from './dom.js';
import { COLS } from '../config.js';
import { tasks } from '../state.js';

export const isMobile = () => window.matchMedia('(max-width: 720px)').matches;

export function setMobileView(view) {
  document.body.dataset.mobileView = view;
  $('officeView').setAttribute('aria-pressed', String(view === 'office'));
  $('tasksView').setAttribute('aria-pressed', String(view === 'tasks'));
  $('tooltip').hidden = true;
}

export function initMobile() {
  $('officeView').onclick = () => setMobileView('office');
  $('tasksView').onclick = () => setMobileView('tasks');
  const tabs = COLS.map(([id, label, color]) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.setProperty('--accent', color);
    button.onclick = () => {
      $('board').dataset.activeColumn = id;
      refresh();
    };
    $('columnTabs').append(button);
    return { button, id, label };
  });
  function refresh() {
    $('mobileTaskCount').textContent = tasks.length;
    for (const { button, id, label } of tabs) {
      button.textContent = `${label} ${tasks.filter((t) => t.col === id).length}`;
      button.setAttribute(
        'aria-pressed',
        String($('board').dataset.activeColumn === id),
      );
    }
  }
  document.addEventListener('taskschange', refresh);
  $('zoom').onclick = () => {
    const wrap = document.querySelector('.scene-wrap');
    const zoomed = wrap.classList.toggle('zoomed');
    $('zoom').setAttribute('aria-pressed', String(zoomed));
    $('zoom').textContent = zoomed ? '− Fit office' : '＋ Zoom';
    if (zoomed)
      requestAnimationFrame(() => {
        wrap.scrollLeft = (wrap.scrollWidth - wrap.clientWidth) / 2;
      });
  };
  refresh();
}
