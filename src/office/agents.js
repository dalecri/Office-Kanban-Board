import { tasks } from '../state.js';
import { $ } from '../ui/dom.js';
import { DESK_SEATS, LOC } from './layout.js';
import { routeTo } from './routing.js';
export function getTarget(a) {
  const mine = tasks.filter((t) => t.agent === a.id);
  if (mine.some((t) => t.col === 'doing'))
    return { ...DESK_SEATS[a.id], ps: 'sit', timer: 1800 };
  if (mine.some((t) => t.col === 'pending'))
    return { x: 329 + a.id * 53, y: 88, ps: 'wait', timer: 1800 };
  if (mine.length && mine.every((t) => t.col === 'done')) {
    if (mine.some((t) => !a.submittedTasks.has(t.id)))
      return { x: 183, y: 159, ps: 'submit', timer: 140 };
    return {
      x: 230 + (a.id % 2) * 96,
      y: 505 - a.id * 2,
      ps: 'done',
      timer: 1800,
    };
  }
  const lounge = [
    { x: 189, y: 505 },
    { x: 329, y: 482 },
    { x: 108, y: 482 },
    { x: 551, y: 473 },
    { x: 652, y: 342 },
    { x: 570, y: 347 },
  ];
  return {
    ...lounge[Math.floor(Math.random() * lounge.length)],
    ps: 'idle',
    timer: 1800 + Math.random() * 900,
  };
}
export const confetti = [];
export function arrive(a) {
  a.state = a.pendingState;
  a.dir = a.state === 'sit' && a.id !== 0 ? 'up' : 'down';
  a.stateTimer = a.targetTimer || 140;
  if (a.state === 'submit') {
    for (const t of tasks.filter((t) => t.agent === a.id && t.col === 'done'))
      a.submittedTasks.add(t.id);
    a.bubble = '📄';
    a.bubbleTimer = 150;
    for (let i = 0; i < 38; i++)
      confetti.push({
        x: a.x,
        y: a.y - 18,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 4 - 1,
        rot: Math.random() * 6,
        vrot: (Math.random() - 0.5) * 0.15,
        w: 2 + Math.random() * 3,
        h: 2 + Math.random() * 3,
        col: ['#d5afe7', '#9dccb5', '#e5be79', '#88b7dc'][i % 4],
        life: 0,
        maxLife: 100 + Math.random() * 60,
      });
    $('activity').textContent = `${a.name} handed in their work. Nice.`;
  } else if (a.state === 'done') {
    a.bubble = ['Pizza time!', 'Another Dundie?', 'Well deserved.'][a.id % 3];
    a.bubbleTimer = 150;
  }
}
export function target(a, t) {
  a.pendingState = t.ps;
  a.targetTimer = t.timer;
  a.tx = t.x;
  a.ty = t.y;
  if (t.ps !== 'sit') a.pamSitMs = 0;
  a.waypoints = routeTo(a.x, a.y, t.x, t.y);
  if (a.waypoints.length) a.state = 'walk';
  else if (Math.hypot(a.x - t.x, a.y - t.y) < 8) arrive(a);
  else {
    a.state = 'idle';
    a.stateTimer = 120;
  }
}
export function update(a, dt, rawDt) {
  a.frame += dt;
  if (a.bubbleTimer > 0) a.bubbleTimer -= dt;
  else a.bubble = '';
  if (a.rethink) {
    a.stateTimer -= dt;
    if (a.stateTimer <= 0) {
      a.rethink = false;
      target(a, getTarget(a));
    }
  }
  if (a.state === 'walk') {
    let budget = dt * 0.8;
    while (budget > 0 && a.waypoints.length) {
      const p = a.waypoints[0],
        dx = p.x - a.x,
        dy = p.y - a.y,
        d = Math.hypot(dx, dy);
      a.dir =
        Math.abs(dx) > Math.abs(dy)
          ? dx > 0
            ? 'right'
            : 'left'
          : dy > 0
            ? 'down'
            : 'up';
      if (d <= budget) {
        a.x = p.x;
        a.y = p.y;
        budget -= d;
        a.waypoints.shift();
      } else {
        a.x += (dx / d) * budget;
        a.y += (dy / d) * budget;
        budget = 0;
      }
    }
    if (!a.waypoints.length) arrive(a);
  } else {
    a.stateTimer -= dt;
    if (a.id === 3 && a.state === 'sit') {
      a.pamSitMs += rawDt;
      if (a.pamSitMs >= 60000) {
        target(a, {
          ...LOC.copier[Math.floor(Math.random() * 3)],
          ps: 'idle',
          timer: 240,
        });
        a.bubble = 'Copies, then coffee.';
        a.bubbleTimer = 180;
        return;
      }
    }
    if (a.stateTimer <= 0) target(a, getTarget(a));
  }
}
export function stateColor(a) {
  const mine = tasks.filter((t) => t.agent === a.id);
  return mine.some((t) => t.col === 'doing')
    ? '#91addc'
    : mine.some((t) => t.col === 'pending')
      ? '#d7b578'
      : mine.length && mine.every((t) => t.col === 'done')
        ? '#8db69e'
        : '#a7a0bf';
}
export function stateName(a) {
  return a.state === 'walk'
    ? 'On the move'
    : a.state === 'sit'
      ? 'Working'
      : a.state === 'wait'
        ? 'In a meeting'
        : a.state === 'submit'
          ? 'Handing in work'
          : a.state === 'done'
            ? 'Celebrating'
            : 'Taking a break';
}
