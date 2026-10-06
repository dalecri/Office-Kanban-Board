import { px, text } from './drawing.js';
function drawCheckers(c, x, y, w, h, a, b, s = 16) {
  c.save();
  c.beginPath();
  c.rect(x, y, w, h);
  c.clip();
  for (let iy = 0; iy < h; iy += s)
    for (let ix = 0; ix < w; ix += s)
      px(c, (ix / s + iy / s) % 2 ? a : b, x + ix, y + iy, s, s);
  c.restore();
}
function plant(c, x, y) {
  px(c, '#171f29', x - 9, y + 3, 20, 11);
  px(c, '#9fa7b2', x - 7, y, 15, 10);
  px(c, '#606d7e', x - 6, y + 8, 13, 4);
  px(c, '#344b3b', x - 8, y - 12, 16, 13);
  px(c, '#668f64', x - 11, y - 10, 8, 7);
  px(c, '#8cac72', x - 4, y - 17, 7, 13);
  px(c, '#477e60', x + 2, y - 11, 9, 8);
  px(c, '#a5bb7d', x - 6, y - 8, 5, 4);
}
function chair(c, x, y, col = '#694752') {
  px(c, '#171c27', x - 10, y - 11, 22, 25);
  px(c, col, x - 8, y - 9, 18, 9);
  px(c, '#a08389', x - 7, y - 9, 15, 2);
  px(c, col, x - 7, y + 3, 16, 8);
  px(c, '#303341', x - 1, y + 13, 3, 8);
  px(c, '#303341', x - 8, y + 19, 17, 3);
}
function desk(c, x, y, w = 85, h = 35) {
  px(c, '#151b28', x - 3, y - 3, w + 6, h + 18);
  px(c, '#667f88', x, y + 4, w, h + 7);
  px(c, '#c7b996', x, y, w, h);
  px(c, '#e2d4b2', x, y, w, 3);
  px(c, '#99856c', x, y + h, w, 9);
  px(c, '#475766', x + 3, y + h + 9, 5, 8);
  px(c, '#475766', x + w - 8, y + h + 9, 5, 8);
  px(c, '#b2c9ce', x - 3, y - 5, w + 6, 3);
  px(c, '#7fa4b1', x - 3, y - 3, 3, h + 7);
  px(c, '#7fa4b1', x + w, y - 3, 3, h + 7);
}
function monitor(c, x, y) {
  px(c, '#252c3c', x, y, 27, 20);
  px(c, '#b0bfc6', x + 2, y + 2, 23, 15);
  px(c, '#39637a', x + 4, y + 4, 19, 10);
  px(c, '#82bfd0', x + 5, y + 5, 12, 2);
  px(c, '#578d9f', x + 5, y + 9, 7, 3);
  px(c, '#454a59', x + 11, y + 20, 5, 4);
  px(c, '#383e4d', x + 6, y + 23, 16, 2);
  px(c, '#8a929f', x - 1, y + 27, 30, 6);
  for (let i = 0; i < 7; i++) px(c, '#c0c9cb', x + 1 + i * 4, y + 28, 2, 1);
}
function papers(c, x, y) {
  px(c, '#817f84', x + 1, y + 2, 15, 17);
  px(c, '#f0ebd9', x, y, 14, 16);
  for (let i = 0; i < 3; i++) px(c, '#a2aabd', x + 3, y + 4 + i * 3, 8, 1);
}
function mug(c, x, y) {
  px(c, '#e6e5d9', x, y, 6, 8);
  px(c, '#e6e5d9', x + 6, y + 2, 3, 4);
  px(c, '#675345', x + 1, y, 4, 2);
}
function drawCouch(c, x, y, w = 60, p = ['#78a5a4', '#4c797f', '#a0c1b9']) {
  px(c, '#1c2731', x - 3, y - 3, w + 6, 33);
  px(c, p[1], x, y, w, 29);
  px(c, p[0], x + 3, y, w - 6, 10);
  for (let i = 0; i < 2; i++) {
    px(c, p[2], x + 7 + i * (w / 2 - 4), y + 12, w / 2 - 7, 12);
    px(c, p[0], x + 7 + i * (w / 2 - 4), y + 22, w / 2 - 7, 4);
  }
  px(c, p[0], x, y + 5, 6, 22);
  px(c, p[0], x + w - 6, y + 5, 6, 22);
  px(c, '#20232e', x + 5, y + 29, 5, 4);
  px(c, '#20232e', x + w - 10, y + 29, 5, 4);
}
function pizza(c, x, y) {
  px(c, '#826457', x, y, 22, 15);
  px(c, '#ece0b9', x, y - 2, 22, 14);
  px(c, '#bc7555', x + 5, y, 12, 9);
  px(c, '#e8b776', x + 7, y + 1, 8, 7);
  px(c, '#b95e53', x + 9, y + 3, 3, 3);
}
function wall(c, x, y, w, h) {
  px(c, '#151925', x, y + 3, w, h + 4);
  px(c, '#556b79', x, y, w, h);
  px(c, '#9cb2ba', x, y, w, 3);
  px(c, '#718b96', x, y + 3, w, 3);
}
function label(c, t, x, y) {
  text(c, t, x, y, '#b2b2be', 7);
}
export function scene(c, now) {
  px(c, '#090b13', 0, 0, 720, 532);
  drawCheckers(c, 8, 8, 232, 207, '#2c2e44', '#242638');
  drawCheckers(c, 240, 8, 474, 207, '#d4d8d0', '#c4c8c0');
  drawCheckers(c, 8, 215, 706, 175, '#2e2e36', '#262628');
  drawCheckers(c, 8, 390, 372, 142, '#d8d0c4', '#c6beb2');
  drawCheckers(c, 380, 390, 334, 142, '#2c2638', '#24202e');
  // Wall-mounted details, furniture, and their shallow pixel depth.
  px(c, '#3b4357', 21, 22, 66, 35);
  px(c, '#8797a6', 24, 24, 60, 29);
  px(c, '#e0ddd1', 27, 27, 54, 23);
  text(c, 'CERTIFIED', 54, 37, '#575a6b', 5, 'center');
  text(c, 'WORLD’S BEST BOSS', 54, 46, '#575a6b', 4, 'center');
  px(c, '#514c4a', 111, 25, 64, 29);
  px(c, '#b5a17d', 111, 25, 64, 4);
  for (let i = 0; i < 3; i++) {
    px(c, '#c29d48', 120 + i * 19, 34, 6, 10);
    px(c, '#e2c267', 118 + i * 19, 31, 10, 5);
    px(c, '#e2c267', 119 + i * 19, 44, 8, 3);
  }
  text(c, 'THE DUNDIES', 142, 61, '#9b91a8', 5, 'center');
  px(c, '#353543', 192, 28, 30, 77);
  px(c, '#a08e75', 195, 29, 24, 74);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 5; i++)
      px(
        c,
        ['#828c9f', '#aabaad', '#9c7479', '#c3b990', '#678d94'][i],
        198 + i * 4,
        33 + j * 23,
        3,
        16,
      );
    px(c, '#645849', 195, 50 + j * 23, 24, 3);
  }
  chair(c, 123, 85);
  desk(c, 77, 100, 94, 39);
  monitor(c, 95, 102);
  papers(c, 144, 107);
  mug(c, 129, 122);
  text(c, 'BOSS', 132, 128, '#5c4d42', 2);
  drawCouch(c, 25, 169, 58, ['#657887', '#425360', '#8e9ca4']);
  plant(c, 211, 181);
  px(c, '#a78d6d', 35, 93, 3, 48);
  px(c, '#a78d6d', 25, 101, 22, 3);
  px(c, '#555569', 26, 104, 8, 18);
  px(c, '#a78d6d', 28, 141, 18, 3);
  // Conference room.
  px(c, '#627784', 370, 23, 160, 47);
  px(c, '#f0eee4', 374, 26, 152, 36);
  px(c, '#a2b7b8', 389, 36, 43, 3);
  px(c, '#ced5cc', 389, 43, 91, 2);
  px(c, '#d1d6cb', 389, 49, 63, 2);
  text(c, 'TEAMWORK MAKES THE DREAM WORK', 449, 58, '#7e8b89', 4, 'center');
  px(c, '#697c86', 654, 29, 40, 69);
  px(c, '#f0eee6', 657, 32, 34, 62);
  for (let i = 0; i < 4; i++)
    px(c, ['#bb8177', '#86a4a0'][i % 2], 661, 44 + i * 11, 21 - (i % 2) * 5, 2);
  for (let i = 0; i < 5; i++) {
    chair(c, 329 + i * 53, 91, '#6e7880');
    chair(c, 329 + i * 53, 171, '#6e7880');
  }
  c.fillStyle = '#78634b';
  c.beginPath();
  c.ellipse(437, 137, 143, 28, 0, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = '#c4a870';
  c.beginPath();
  c.ellipse(437, 129, 143, 28, 0, 0, Math.PI * 2);
  c.fill();
  c.strokeStyle = '#e1c797';
  c.lineWidth = 2;
  c.stroke();
  pizza(c, 478, 123);
  papers(c, 371, 118);
  mug(c, 415, 130);
  px(c, '#535b64', 624, 139, 40, 5);
  px(c, '#49515a', 628, 145, 3, 28);
  px(c, '#49515a', 657, 145, 3, 28);
  px(c, '#323945', 626, 112, 37, 27);
  px(c, '#7e9da8', 630, 116, 29, 17);
  px(c, '#252d38', 626, 172, 9, 5);
  px(c, '#252d38', 654, 172, 9, 5);
  plant(c, 280, 44);
  // Bullpen.
  px(c, '#4d6976', 33, 229, 137, 29);
  px(c, '#9aafba', 36, 232, 131, 23);
  text(c, 'DUNDER MIFFLIN', 101, 243, '#243d51', 10, 'center');
  text(c, 'PAPER COMPANY', 101, 251, '#47616f', 5, 'center');
  c.fillStyle = '#6f6051';
  c.beginPath();
  c.arc(110, 315, 59, Math.PI, 0);
  c.lineTo(169, 327);
  c.lineTo(51, 327);
  c.fill();
  c.fillStyle = '#c4af89';
  c.beginPath();
  c.arc(110, 315, 59, 0, Math.PI, true);
  c.fill();
  px(c, '#ddc9a4', 51, 314, 118, 3);
  monitor(c, 92, 281);
  papers(c, 135, 291);
  mug(c, 75, 302);
  chair(c, 110, 340);
  plant(c, 30, 358);
  desk(c, 258, 273, 102, 40);
  monitor(c, 274, 276);
  papers(c, 333, 281);
  mug(c, 310, 298);
  desk(c, 406, 273, 102, 40);
  monitor(c, 447, 276);
  papers(c, 416, 280);
  mug(c, 484, 299);
  chair(c, 303, 338);
  chair(c, 454, 338);
  plant(c, 239, 286);
  plant(c, 527, 286);
  px(c, '#bda455', 377, 302, 17, 10);
  px(c, '#e7b850', 379, 296, 13, 13);
  px(c, '#87754e', 382, 300, 9, 4);
  px(c, '#f5d581', 380, 297, 10, 2);
  px(c, '#485567', 584, 278, 48, 41);
  px(c, '#b7c3c8', 584, 278, 48, 24);
  px(c, '#dce1da', 588, 267, 39, 14);
  px(c, '#526274', 592, 270, 30, 8);
  px(c, '#7c8994', 590, 307, 35, 8);
  px(c, '#ebe9dc', 596, 305, 23, 5 + Math.round(Math.sin(now / 450) * 3));
  px(c, Math.sin(now / 350) > 0 ? '#91d29e' : '#48705a', 624, 284, 4, 3);
  px(c, '#979dad', 671, 287, 21, 37);
  px(c, '#678f9e', 674, 264, 15, 23);
  px(c, '#b9d9d6', 677, 261, 9, 3);
  px(c, '#b3cccc', 676, 267, 3, 16);
  px(c, '#4d6272', 675, 299, 13, 12);
  px(c, '#ba7272', 677, 294, 3, 3);
  px(c, '#829bcb', 684, 294, 3, 3);
  // Break room.
  px(c, '#414a5b', 25, 407, 38, 58);
  px(c, '#778494', 28, 410, 32, 49);
  px(c, '#252f41', 30, 413, 21, 34);
  for (let j = 0; j < 3; j++)
    for (let i = 0; i < 3; i++)
      px(
        c,
        ['#c39e68', '#b17181', '#83a796'][i],
        33 + i * 6,
        417 + j * 9,
        4,
        6,
      );
  px(c, '#b7b9a9', 54, 419, 4, 8);
  px(c, '#252b3b', 33, 451, 19, 5);
  px(c, '#6b7078', 76, 418, 43, 28);
  px(c, '#bda886', 74, 416, 47, 6);
  px(c, '#393a42', 83, 400, 20, 16);
  px(c, '#c0b5a3', 86, 403, 14, 8);
  mug(c, 106, 408);
  px(c, '#76838c', 139, 403, 31, 57);
  px(c, '#d3d6d0', 141, 405, 27, 53);
  px(c, '#788592', 141, 426, 27, 2);
  px(c, '#75818b', 162, 413, 3, 8);
  px(c, '#75818b', 162, 432, 3, 11);
  px(c, '#283243', 192, 409, 34, 22);
  px(c, `hsl(${Math.floor(now / 65) % 360},25%,54%)`, 195, 412, 28, 16);
  text(c, 'DVD', 208, 421, '#dae5db', 5, 'center');
  drawCouch(c, 187, 460, 32, ['#aa8e7e', '#74605d', '#c3aa94']);
  for (const p of [
    [279, 449],
    [279, 509],
    [242, 479],
    [315, 479],
  ])
    chair(c, ...p, '#807879');
  c.fillStyle = '#8b745e';
  c.beginPath();
  c.ellipse(279, 483, 29, 20, 0, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = '#c3ac89';
  c.beginPath();
  c.arc(279, 476, 28, 0, Math.PI * 2);
  c.fill();
  pizza(c, 270, 469);
  plant(c, 25, 506);
  plant(c, 351, 420);
  // Annex.
  desk(c, 406, 427, 103, 35);
  monitor(c, 425, 428);
  papers(c, 482, 430);
  mug(c, 465, 446);
  chair(c, 452, 484);
  text(c, '✦  ✧  ✦', 455, 413, '#d4af72', 13, 'center');
  drawCouch(c, 578, 428, 90);
  px(c, '#51425f', 578, 476, 92, 30);
  px(c, '#796080', 582, 480, 84, 22);
  for (let i = 0; i < 6; i++) px(c, '#9b829e', 587 + i * 13, 491, 6, 2);
  text(c, 'ryan was here', 634, 408, '#655670', 7, 'center');
  plant(c, 693, 503);
  // Architectural frame and openings.
  wall(c, 2, 2, 716, 9);
  wall(c, 2, 2, 8, 530);
  wall(c, 710, 2, 8, 530);
  wall(c, 2, 524, 716, 8);
  wall(c, 8, 208, 157, 9);
  wall(c, 199, 208, 81, 9);
  wall(c, 316, 208, 398, 9);
  wall(c, 8, 385, 162, 9);
  wall(c, 207, 385, 323, 9);
  wall(c, 569, 385, 145, 9);
  wall(c, 376, 394, 8, 130);
  px(c, '#587682', 236, 11, 5, 197);
  for (let y = 16; y < 201; y += 31) {
    px(c, '#7196a455', 232, y, 9, 27);
    px(c, '#b4d4d36b', 233, y, 2, 25);
    px(c, '#99b1bb', 231, y + 27, 11, 3);
  }
  c.strokeStyle = '#939daa55';
  c.lineWidth = 1;
  for (const [x, y] of [
    [165, 216],
    [280, 216],
    [170, 394],
    [530, 394],
  ]) {
    c.beginPath();
    c.arc(x, y, 32, 0, -Math.PI / 2, true);
    c.stroke();
  }
  label(c, 'MICHAEL’S OFFICE', 19, 199);
  text(c, 'CONFERENCE ROOM', 690, 199, '#657479', 7, 'right');
  label(c, 'RECEPTION', 56, 371);
  label(c, 'SALES', 365, 371);
  text(c, 'BREAK ROOM', 21, 520, '#747478', 7);
  label(c, 'THE ANNEX', 399, 517);
}
