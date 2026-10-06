import { $ } from '../ui/dom.js';
import { AGENTS, ui } from '../state.js';
import { update, confetti, stateName, stateColor } from './agents.js';
import { px } from './drawing.js';
import { scene } from './scene.js';
import { drawVAgent } from './characters.js';
export function startSimulation() {
  const canvas = $('scene'),
    ctx = canvas.getContext('2d');
  ctx.scale(2, 2);
  ctx.imageSmoothingEnabled = false;
  let last = 0,
    tick = 0,
    reported = false;
  function loop(now) {
    requestAnimationFrame(loop);
    try {
      const rawDt = last ? Math.min(now - last, 100) : 16.67;
      last = now;
      const dt = rawDt / (1000 / 60);
      if (!ui.paused) {
        tick += rawDt;
        for (const a of AGENTS) {
          try {
            update(a, dt, rawDt);
          } catch (e) {
            if (!reported) {
              console.error(e);
              reported = true;
            }
          }
        }
        for (let i = confetti.length - 1; i >= 0; i--) {
          const p = confetti[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vy += 0.06 * dt;
          p.rot += p.vrot * dt;
          p.life += dt;
          if (p.life > p.maxLife) confetti.splice(i, 1);
        }
      }
      ctx.clearRect(0, 0, 720, 532);
      scene(ctx, tick);
      [...AGENTS]
        .sort((a, b) => a.y - b.y)
        .forEach((a) => drawVAgent(ctx, a, tick));
      for (const p of confetti) {
        ctx.save();
        ctx.globalAlpha = 1 - p.life / p.maxLife;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        px(ctx, p.col, 0, 0, p.w, p.h);
        ctx.restore();
      }
      if (Math.floor(now / 400) !== Math.floor((now - rawDt) / 400))
        for (const a of AGENTS) {
          const s = $('status' + a.id);
          s.textContent = '● ' + stateName(a);
          s.style.color = stateColor(a);
        }
    } catch (e) {
      if (!reported) {
        console.error(e);
        reported = true;
      }
    }
  }
  requestAnimationFrame(loop);
}
