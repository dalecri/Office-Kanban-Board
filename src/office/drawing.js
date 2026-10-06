export const px = (c, col, x, y, w, h) => {
  c.fillStyle = col;
  c.fillRect(Math.round(x), Math.round(y), w, h);
};
export function text(c, t, x, y, col = '#d3d0dd', size = 7, align = 'left') {
  c.font = `bold ${size}px system-ui`;
  c.textAlign = align;
  c.fillStyle = col;
  c.fillText(t, x, y);
  c.textAlign = 'left';
}
