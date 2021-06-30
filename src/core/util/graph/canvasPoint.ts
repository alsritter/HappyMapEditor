/**
 * 这里用于处理平面坐标相关的问题
 */

interface Point {
  x: number;
  y: number;
}

/**
 * 此方法用于鼠标所在点的坐标切换到画布上的坐标
 * @param canvas
 * @param x
 * @param y
 * @returns 在当前画布的像素位置
 */
export const windowToCanvas = (canvas: HTMLCanvasElement, x: number, y: number): Point => {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left - (bbox.width - canvas.width) / 2,
    y: y - bbox.top - (bbox.height - canvas.height) / 2
  };
};

/**
 * 将 Canvas 像素位置转换成坐标轴坐标
 * @param canvas
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param x 要转换的 x
 * @param y 要转换的 y
 * @returns 转换后的坐标轴
 */
export const pixToCoordinate = (canvas: HTMLCanvasElement, size: number, sx: number, sy: number, x: number, y: number): Point => {
  const tmp = windowToCanvas(canvas, x, y);

  const relativeX = tmp.x - sx;
  const relativeY = tmp.y - sy;

  console.log(tmp.x, tmp.y);
  console.log(sx, sy);
  console.log(relativeX, relativeY);

  return {
    x: Math.floor(relativeX / size),
    y: Math.floor(relativeY / size)
  };
};

export default {
  windowToCanvas,
  pixToCoordinate
};
