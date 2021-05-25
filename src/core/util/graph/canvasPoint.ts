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
 * @returns Point
 */
export const windowToCanvas = (canvas: HTMLCanvasElement, x: number, y: number): Point => {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left - (bbox.width - canvas.width) / 2,
    y: y - bbox.top - (bbox.height - canvas.height) / 2
  };
};

export default {
  windowToCanvas
};
