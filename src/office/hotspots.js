// Coordinates use the same 720 × 532 space as the scene and routing.
export const HOTSPOTS = [
  {
    x: 77,
    y: 100,
    w: 94,
    h: 48,
    title: 'Michael’s inbox',
    col: 'done',
    description: 'Completed work, ready for a well-earned celebration.',
  },
  {
    x: 294,
    y: 103,
    w: 286,
    h: 55,
    title: 'Conference table',
    col: 'pending',
    description: 'Tasks waiting on a decision, approval, or another person.',
  },
  {
    x: 51,
    y: 263,
    w: 118,
    h: 64,
    title: 'Reception desk',
    agent: 3,
    col: 'doing',
    description: 'Pam’s work in progress.',
  },
  {
    x: 258,
    y: 273,
    w: 102,
    h: 49,
    title: 'Dwight’s desk',
    agent: 1,
    col: 'doing',
    description: 'Dwight’s work in progress.',
  },
  {
    x: 406,
    y: 273,
    w: 102,
    h: 49,
    title: 'Jim’s desk',
    agent: 2,
    col: 'doing',
    description: 'Jim’s work in progress.',
  },
  {
    x: 406,
    y: 427,
    w: 103,
    h: 44,
    title: 'Kelly’s desk',
    agent: 4,
    col: 'doing',
    description: 'Kelly’s work in progress.',
  },
];
export function scenePoint(canvas, e) {
  const r = canvas.getBoundingClientRect(),
    scale = Math.min(r.width / 720, r.height / 532);
  return {
    x: (e.clientX - r.left - (r.width - 720 * scale) / 2) / scale,
    y: (e.clientY - r.top - (r.height - 532 * scale) / 2) / scale,
  };
}
export function hotspotAt({ x, y }) {
  return HOTSPOTS.find(
    (h) => x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h,
  );
}
