/**
 * 这里用于处理平面坐标相关的问题
 */
import { Point } from '@/mystore/types';

/**
 * 此方法用于鼠标所在点的坐标切换到画布上的坐标
 * @param canvas
 * @param x
 * @param y
 * @returns 在当前画布的像素位置
 */
export function windowToCanvas(canvas: HTMLCanvasElement, x: number, y: number): Point {
  const bbox = canvas.getBoundingClientRect();
  return {
    x: x - bbox.left - (bbox.width - canvas.width) / 2,
    y: y - bbox.top - (bbox.height - canvas.height) / 2
  };
}

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
export function pixToCoordinate(canvas: HTMLCanvasElement, size: number, sx: number, sy: number, x: number, y: number): Point {
  const tmp = windowToCanvas(canvas, x, y);
  const relativeX = tmp.x - sx;
  const relativeY = tmp.y - sy;
  return {
    x: Math.floor(relativeX / size),
    y: Math.floor(relativeY / size)
  };
}

/**
 * 画布上的像素坐标（0,0 -> width, height）转成坐标轴坐标
 *
 * @param canvas
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param x 要转换的 x
 * @param y 要转换的 y
 * @returns 转换后的坐标轴
 */
export function canvasPixToCoordinate(size: number, sx: number, sy: number, x: number, y: number): Point {
  const relativeX = x - sx;
  const relativeY = y - sy;
  return {
    x: Math.floor(relativeX / size),
    y: Math.floor(relativeY / size)
  };
}

/**
 * 将坐标轴坐标转换成 Canvas 像素位置
 *
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param x 要转换的 x
 * @param y 要转换的 y
 * @returns 转换后的坐标轴
 */
export function CoordinateToPix(size: number, sx: number, sy: number, x: number, y: number): Point {
  return {
    x: x * size + sx,
    y: y * size + sy
  };
}

/**
 * 判断某个坐标是否在屏幕外面
 *
 * @param canvas
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param x 要判断的 x 坐标
 * @param y 要判断的 y 坐标
 * @returns 是否在边界外
 */
export function coordinateIsOffScreenByElement(canvas: HTMLCanvasElement, size: number, sx: number, sy: number, x: number, y: number): boolean {
  const bbox = canvas.getBoundingClientRect();
  return coordinateIsOffScreen(bbox.width, bbox.height, size, sx, sy, x, y);
}

/**
 * 判断某个坐标是否在屏幕外面
 *
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param x 要判断的 x 坐标
 * @param y 要判断的 y 坐标
 * @returns 是否在边界外
 */
export function coordinateIsOffScreen(width: number, height: number, size: number, sx: number, sy: number, x: number, y: number): boolean {
  const point = CoordinateToPix(size, sx, sy, x, y);
  // console.log(point, x, y);

  if (point.x > width || point.x < 0) return true;
  if (point.y > height || point.y < 0) return true;
  return false;
}

/**
 * 判断某个坐标是否在屏幕外面
 *
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param point 要判断的 “像素” 位置
 * @returns 是否在边界外
 */
export function coordinateIsOffScreenByPix(width: number, height: number, point: Point): boolean {
  // console.log(point);
  if (point.x > width || point.x < 0) return true;
  if (point.y > height || point.y < 0) return true;
  return false;
}

export default {
  windowToCanvas,
  pixToCoordinate,
  canvasPixToCoordinate,
  CoordinateToPix
};
