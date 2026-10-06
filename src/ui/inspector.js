import { $, esc } from './dom.js';
import { tasks, AGENTS, ui } from '../state.js';
import { COLS, PRIOR } from '../config.js';
import { stateName, stateColor } from '../office/agents.js';
import { drawVAgent } from '../office/characters.js';
export function initInspector() {
  const canvas = $('scene');
  function tip(a, cx, cy) {
    const mine = tasks.filter((t) => t.agent === a.id),
      active =
        mine.find((t) => t.col === 'doing') ||
        mine.find((t) => t.col === 'pending') ||
        mine[0],
      col = COLS.find((c) => c[0] === active?.col);
    $('tooltip').innerHTML =
      `<div class="tip-title"><strong>${a.name}</strong>${active ? `<span class="priority" style="color:${PRIOR[active.priority]}">${active.priority.toUpperCase()}</span>` : ''}</div>${a.state !== 'sit' ? `<span class="pill">${stateName(a)}</span>` : ''}${col ? `<span class="pill" style="color:${col[2]}">${col[1]}</span>` : ''}<div class="tip-task">${active ? esc(active.title) : 'No tasks assigned. Enjoying the office.'}</div>${mine
        .filter((t) => t !== active)
        .map(
          (t) =>
            `<div class="tip-other">• ${esc(t.title)} · ${COLS.find((c) => c[0] === t.col)[1]}</div>`,
        )
        .join('')}`;
    $('tooltip').hidden = false;
    $('tooltip').style.left =
      Math.min(innerWidth - 260, Math.max(8, cx + 14)) + 'px';
    $('tooltip').style.top =
      Math.max(
        8,
        Math.min(innerHeight - $('tooltip').offsetHeight - 10, cy + 14),
      ) + 'px';
  }
  function hit(e) {
    const r = canvas.getBoundingClientRect(),
      scale = Math.min(r.width / 720, r.height / 532),
      x = (e.clientX - r.left - (r.width - 720 * scale) / 2) / scale,
      y = (e.clientY - r.top - (r.height - 532 * scale) / 2) / scale;
    return AGENTS.find((a) => Math.hypot(a.x - x, a.y - 18 - y) < 22);
  }
  canvas.onpointermove = (e) => {
    if (e.pointerType === 'touch') return;
    const a = hit(e);
    if (a) tip(a, e.clientX, e.clientY);
    else $('tooltip').hidden = true;
  };
  canvas.onpointerleave = () => {
    $('tooltip').hidden = true;
  };
  canvas.onclick = (e) => {
    const a = hit(e);
    ui.selected = a?.id ?? null;
    if (a) tip(a, e.clientX, e.clientY);
    else $('tooltip').hidden = true;
  };
  AGENTS.forEach((a) => {
    const b = document.createElement('button');
    b.className = 'person';
    b.setAttribute('aria-label', `Inspect ${a.name}'s tasks`);
    b.innerHTML = `<canvas width="40" height="48"></canvas><span><strong>${a.name}</strong><small id="status${a.id}">Settling in</small></span>`;
    const c = b.querySelector('canvas').getContext('2d');
    drawVAgent(c, { ...a, x: 19, y: 42 }, 0, true);
    b.onclick = () => {
      ui.selected = ui.selected === a.id ? null : a.id;
      document
        .querySelectorAll('.person')
        .forEach((x) => x.classList.remove('selected'));
      if (ui.selected !== null) {
        b.classList.add('selected');
        const r = b.getBoundingClientRect();
        tip(a, r.left, r.top - 180);
      } else $('tooltip').hidden = true;
    };
    $('roster').append(b);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      $('tooltip').hidden = true;
      ui.selected = null;
    }
  });
}
