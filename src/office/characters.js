import { ui } from '../state.js';
import { px, text } from './drawing.js';
import { stateColor } from './agents.js';
export function drawVAgent(c, a, now, portrait = false) {
  const x = Math.round(a.x),
    y = Math.round(a.y),
    walk = a.state === 'walk' ? Math.sin(a.frame * 0.55) * 2 : 0,
    col = stateColor(a);
  c.fillStyle = '#090b1666';
  c.beginPath();
  c.ellipse(x, y + 2, 11, 4, 0, 0, Math.PI * 2);
  c.fill();
  if (ui.selected === a.id && !portrait) {
    c.strokeStyle = a.shirt;
    c.lineWidth = 1;
    c.beginPath();
    c.ellipse(x, y + 3, 16, 6, 0, 0, Math.PI * 2);
    c.stroke();
  }
  px(c, a.pants, x - 6, y - 8 + walk, 5, 9);
  px(c, a.pants, x + 1, y - 8 - walk, 5, 9);
  px(c, '#202333', x - 7, y - 1 + walk, 6, 3);
  px(c, '#202333', x + 1, y - 1 - walk, 7, 3);
  px(c, a.shirt, x - 7, y - 22, 15, 15);
  px(c, a.shirt, x - 11, y - 21 - walk, 4, 11);
  px(c, a.shirt, x + 8, y - 21 + walk, 4, 11);
  px(c, '#0002', x - 11, y - 21 - walk, 4, 11);
  px(c, '#0002', x + 8, y - 21 + walk, 4, 11);
  px(c, a.skin, x - 11, y - 11 - walk, 4, 4);
  px(c, a.skin, x + 8, y - 11 + walk, 4, 4);
  if (a.dir !== 'up') {
    px(c, '#f0e5da', x - 2, y - 21, 5, 3);
    if (!a.female) px(c, a.id === 1 ? '#6d5342' : '#4d5974', x, y - 18, 2, 9);
  }
  px(c, a.skin, x - 7, y - 35, 15, 14);
  px(c, a.skin, x - 5, y - 37, 11, 2);
  px(c, a.hair, x - 6, y - 38, 13, 4);
  px(c, a.hair, x - 8, y - 35, 4, 7);
  px(c, a.hair, x + 6, y - 35, 3, 7);
  if (a.dir === 'up') {
    px(c, a.hair, x - 7, y - 35, 15, a.female ? 20 : 9);
  } else {
    if (a.female) {
      px(c, a.hair, x - 9, y - 32, 3, 13);
      px(c, a.hair, x + 7, y - 32, 3, 13);
      if (a.dir === 'left' || a.dir === 'right')
        px(c, a.hair, x + (a.dir === 'right' ? -11 : 8), y - 30, 4, 17);
    }
    if (a.dir !== 'left') px(c, '#302c39', x + 4, y - 29, 1, 2);
    if (a.dir !== 'right') px(c, '#302c39', x - 3, y - 29, 1, 2);
    px(c, '#ba826e', x, y - 24, 3, 1);
    if (a.id === 1) {
      c.strokeStyle = '#685a48';
      c.lineWidth = 1;
      c.strokeRect(x - 5, y - 31, 5, 5);
      c.strokeRect(x + 2, y - 31, 5, 5);
    }
  }
  if (!portrait) {
    px(c, '#242434', x + 7, y - 40, 10, 10);
    px(c, col, x + 8, y - 39, 8, 8);
    c.font = 'bold 10px system-ui';
    const w = c.measureText(a.name).width + 10;
    px(c, '#171925e8', x - w / 2, y + 8, w, 14);
    text(c, a.name, x, y + 18, col, 10, 'center');
    if (a.bubble) {
      c.font = '10px system-ui';
      const bw = c.measureText(a.bubble).width + 14;
      px(c, '#83748f', x - bw / 2 - 1, y - 61, bw + 2, 18);
      px(c, '#242431', x - bw / 2, y - 60, bw, 16);
      px(c, '#242431', x - 2, y - 44, 5, 4);
      text(c, a.bubble, x, y - 49, '#eeebf6', 10, 'center');
    }
  }
}
