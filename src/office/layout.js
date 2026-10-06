export const ROOM_BOUNDS = [
  { id: 'michael', x: 10, y: 11, w: 225, h: 197 },
  { id: 'conference', x: 242, y: 11, w: 466, h: 197 },
  { id: 'bullpen', x: 10, y: 217, w: 698, h: 168 },
  { id: 'break', x: 10, y: 395, w: 366, h: 129 },
  { id: 'annex', x: 385, y: 395, w: 323, h: 129 },
];
export const DOORS = {
  michael: [
    { x: 182, y: 193 },
    { x: 182, y: 231 },
  ],
  conference: [
    { x: 298, y: 193 },
    { x: 298, y: 231 },
  ],
  break: [
    { x: 189, y: 409 },
    { x: 189, y: 369 },
  ],
  annex: [
    { x: 550, y: 409 },
    { x: 550, y: 369 },
  ],
};
export const DESK_SEATS = [
  { x: 124, y: 88 },
  { x: 303, y: 336 },
  { x: 454, y: 336 },
  { x: 110, y: 340 },
  { x: 453, y: 484 },
];
export const LOC = {
  copier: [
    { x: 583, y: 337 },
    { x: 610, y: 340 },
    { x: 637, y: 337 },
  ],
};
export const objects = [];
function obstacle(x, y, w, h) {
  objects.push({ x, y, w, h });
}
// Grid-based pathfinding also keeps walking routes clear of furniture.
[
  [74, 97, 101, 60],
  [19, 163, 69, 40],
  [190, 24, 36, 83],
  [290, 105, 293, 50],
  [619, 106, 49, 70],
  [49, 262, 122, 65],
  [255, 268, 109, 61],
  [403, 268, 109, 61],
  [579, 262, 59, 62],
  [669, 261, 25, 65],
  [24, 402, 42, 64],
  [73, 397, 50, 54],
  [138, 399, 35, 65],
  [248, 449, 63, 52],
  [185, 455, 36, 39],
  [403, 421, 111, 52],
  [574, 423, 99, 39],
].forEach((r) => obstacle(...r));
