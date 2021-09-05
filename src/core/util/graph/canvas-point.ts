/**
 * 这里用于处理平面坐标相关的问题
 */

import { Block } from '@/mystore/modules/map/map.state';
import Constants from '@/core/util/Constants';

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
  return {
    x: Math.floor(relativeX / size),
    y: Math.floor(relativeY / size)
  };
};

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
export const CoordinateToPix = (size: number, sx: number, sy: number, x: number, y: number): Point => {
  return {
    x: x * size + sx,
    y: y * size + sy
  };
};

/**
 * 将坐标转成 Block 块的终点坐标
 * 注意：负数是从 -1 开始的，所以是 -1、-2、-3、-4
 *
 * @param size 一个 Block 块的宽高
 * @param x
 * @param y
 */
export const coordinateToBlockEndCoordinate = (size: number, x: number, y: number): Point => {
  // 计算乘数：这里举例：-1 / 4 = 0，-4 / size = 1 但是要让其的值比真实值加一
  const fx = x < 0;
  const fy = y < 0;
  const tx = ~~Math.abs((fx ? x + 1 : x) / size) + 1;
  const ty = ~~Math.abs((fy ? y + 1 : y) / size) + 1;
  const rx = tx * size * (fx ? -1 : 1) - (fx ? 0 : 1); // 正数 0、1、2、3 所以要减一
  const ry = ty * size * (fy ? -1 : 1) - (fy ? 0 : 1);

  const tmp = {
    x: rx,
    y: ry
  };

  return tmp;
};

/**
 * 将坐标转成 Block 块的内部坐标
 *
 * @param size 一个 Block 块的宽高
 * @param x
 * @param y
 */
export const coordinateToBlockCoordinate = (size: number, x: number, y: number): Point => {
  const fx = x < 0;
  const fy = y < 0;
  // 注意：为负数时需要加一
  const rx = (fx ? x + 1 : x) % size;
  const ry = (fy ? y + 1 : y) % size;

  const tmp = {
    x: Math.abs(rx),
    y: Math.abs(ry)
  };

  // console.log(tmp);

  return tmp;
};

/**
 * 将 Block 内部坐标转换成普通坐标
 *
 * @param size 一个 Block 块的宽高
 * @param bx 当前块的终点坐标
 * @param by 当前块的终点坐标
 * @param x 内部坐标
 * @param y 内部坐标
 */
export const blockCoordinateToCoordinate = (size: number, bx: number, by: number, x: number, y: number): Point => {
  // console.log({
  //   size,
  //   bx,
  //   by,
  //   x,
  //   y
  // });

  // const rx = bx % size;
  // const ry = by % size;

  // const dx = rx == 0 ? 0 : 1;
  // const dy = ry == 0 ? 0 : 1;

  // 先将终点坐标转成 Block 起始点坐标
  // const sx = bx + (bx > 0 ? -(size - 1) : size - 1);
  // const sy = by + (by > 0 ? -(size - 1) : size - 1);
  const fx = bx > 0;
  const fy = by > 0;
  const dx = fx ? size - 1 : 1 - size;
  const dy = fy ? size - 1 : 1 - size;
  // console.log({
  //   dx,
  //   dy
  // });

  const sx = bx - dx;
  const sy = by - dy;

  // console.log({
  //   sx,
  //   sy
  // });

  const tmp = {
    x: sx + (sx < 0 ? -x : x),
    y: sy + (sy < 0 ? -y : y)
  };

  // console.log(tmp);

  return tmp;
};

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
export const coordinateIsOffScreenByElement = (canvas: HTMLCanvasElement, size: number, sx: number, sy: number, x: number, y: number): boolean => {
  const bbox = canvas.getBoundingClientRect();
  return coordinateIsOffScreen(bbox.width, bbox.height, size, sx, sy, x, y);
};

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
export const coordinateIsOffScreen = (width: number, height: number, size: number, sx: number, sy: number, x: number, y: number): boolean => {
  const point = CoordinateToPix(size, sx, sy, x, y);
  // console.log(point, x, y);

  if (point.x > width || point.x < 0) return true;
  if (point.y > height || point.y < 0) return true;
  return false;
};

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
export const coordinateIsOffScreenByPix = (width: number, height: number, size: number, sx: number, sy: number, point: Point): boolean => {
  // console.log(point);
  if (point.x > width || point.x < 0) return true;
  if (point.y > height || point.y < 0) return true;
  return false;
};

/**
 * 判断某个 Block 是否完全在屏幕外面
 *
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param block 要判断的 Block
 * @returns 是否在边界外
 */
export const blockIsOffScreen = (width: number, height: number, size: number, sx: number, sy: number, block: Block): boolean => {
  const boxW = size * Constants.BLOCK_SIZE;
  const bsize = Constants.BLOCK_SIZE;
  const fx = block.x > 0;
  const fy = block.y > 0;
  const dx = fx ? bsize - 1 : -bsize;
  const dy = fy ? bsize - 1 : -bsize;
  const bsx = block.x - dx;
  const bsy = block.y - dy;

  const boxPoint = CoordinateToPix(size, sx, sy, bsx, bsy);
  const xBoxW = boxW * (block.x > 0 ? 1 : -1);
  const yBoxW = boxW * (block.y > 0 ? 1 : -1);

  const pointA = {
    x: boxPoint.x,
    y: boxPoint.y
  };

  const pointB = {
    x: boxPoint.x + xBoxW,
    y: boxPoint.y
  };

  const pointC = {
    x: boxPoint.x,
    y: boxPoint.y + yBoxW
  };
  const pointD = {
    x: boxPoint.x + xBoxW,
    y: boxPoint.y + yBoxW
  };

  // 再判断
  const pointAR = coordinateIsOffScreenByPix(width, height, size, sx, sy, pointA);
  const pointBR = coordinateIsOffScreenByPix(width, height, size, sx, sy, pointB);
  const pointCR = coordinateIsOffScreenByPix(width, height, size, sx, sy, pointC);
  const pointDR = coordinateIsOffScreenByPix(width, height, size, sx, sy, pointD);
  // console.log(pointAR, pointBR, pointCR, pointDR, '结果：', pointAR && pointBR && pointCR && pointDR, block.x, block.y);

  // 四个角全部溢出才算溢出
  if (pointAR && pointBR && pointCR && pointDR) return true;
  return false;
};

/**
 * 判断某个 Block 是否完全在屏幕外面
 *
 * @param canvas
 * @param size 单元格的大小
 * @param sx 起始点的位置
 * @param sy 起始点的位置
 * @param block 要判断的 Block
 * @returns 是否在边界外
 */
export const blockIsOffScreenByElement = (canvas: HTMLCanvasElement, size: number, sx: number, sy: number, block: Block): boolean => {
  const bbox = canvas.getBoundingClientRect();
  return blockIsOffScreen(bbox.width, bbox.height, size, sx, sy, block);
};

export default {
  windowToCanvas,
  pixToCoordinate,
  coordinateToBlockEndCoordinate,
  coordinateToBlockCoordinate,
  blockCoordinateToCoordinate,
  CoordinateToPix
};
