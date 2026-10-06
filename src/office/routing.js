import { ROOM_BOUNDS, DOORS, objects } from './layout.js';
export function roomAt(x, y) {
  return (
    ROOM_BOUNDS.find(
      (r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h,
    )?.id || 'bullpen'
  );
}
export function blocked(x, y) {
  if (x < 18 || x > 701 || y < 22 || y > 517) return true;
  if (Math.abs(y - 213) < 9 && !((x > 172 && x < 193) || (x > 288 && x < 309)))
    return true;
  if (Math.abs(y - 390) < 9 && !((x > 178 && x < 200) || (x > 539 && x < 561)))
    return true;
  if (Math.abs(x - 238) < 10 && y < 212) return true;
  if (Math.abs(x - 380) < 10 && y > 391) return true;
  return objects.some(
    (o) => x > o.x - 5 && x < o.x + o.w + 5 && y > o.y - 4 && y < o.y + o.h + 4,
  );
}
function pathSegment(s, t) {
  const step = 4,
    W = 180,
    H = 133,
    key = (x, y) => y * W + x;
  let sx = Math.round(s.x / step),
    sy = Math.round(s.y / step),
    ex = Math.round(t.x / step),
    ey = Math.round(t.y / step);
  const start = key(sx, sy),
    goal = key(ex, ey),
    q = [start],
    prev = new Int32Array(W * H).fill(-1);
  prev[start] = start;
  let found = false;
  for (let k = 0; k < q.length; k++) {
    const n = q[k],
      x = n % W,
      y = Math.floor(n / W);
    if (n === goal) {
      found = true;
      break;
    }
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx,
        ny = y + dy,
        nn = key(nx, ny);
      if (nx < 0 || nx >= W || ny < 0 || ny >= H || prev[nn] !== -1) continue;
      if (nn !== goal && blocked(nx * step, ny * step)) continue;
      prev[nn] = n;
      q.push(nn);
    }
  }
  if (!found) return [];
  let arr = [],
    cur = goal;
  while (cur !== start) {
    arr.push({ x: (cur % W) * step, y: Math.floor(cur / W) * step });
    cur = prev[cur];
  }
  arr.reverse();
  const simple = [];
  for (let i = 0; i < arr.length; i++) {
    if (
      !i ||
      i === arr.length - 1 ||
      arr[i].x - arr[i - 1].x !== arr[i + 1].x - arr[i].x ||
      arr[i].y - arr[i - 1].y !== arr[i + 1].y - arr[i].y
    )
      simple.push(arr[i]);
  }
  simple.push(t);
  return simple;
}
export function routeTo(fx, fy, tx, ty) {
  const fr = roomAt(fx, fy),
    tr = roomAt(tx, ty);
  let stops = [];
  if (fr !== tr) {
    if (DOORS[fr]) stops.push(...DOORS[fr]);
    if (DOORS[tr]) stops.push(...[...DOORS[tr]].reverse());
  }
  stops.push({ x: tx, y: ty });
  let out = [],
    last = { x: fx, y: fy };
  for (const stop of stops) {
    const p = pathSegment(last, stop);
    if (!p.length && Math.hypot(last.x - stop.x, last.y - stop.y) > 5)
      return [];
    out.push(...p);
    last = stop;
  }
  return out;
}
