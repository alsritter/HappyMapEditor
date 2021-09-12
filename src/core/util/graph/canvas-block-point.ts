import { Point, Block } from '@/mystore/types';
import { CoordinateToPix } from './canvas-point';
import Constants from '@/core/util/Constants';

/**
 * 将坐标转成 Block 块的终点坐标
 * 注意：负数是从 -1 开始的，所以是 -1、-2、-3、-4
 *
 * @param x
 * @param y
 */
export const coordinateToBlockEndCoordinate = (x: number, y: number): Point => {
  // 计算乘数：这里举例：-1 / 4 = 0，-4 / size = 1 但是要让其的值比真实值加一
  const fx = x < 0;
  const fy = y < 0;
  const tx = ~~Math.abs((fx ? x + 1 : x) / Constants.BLOCK_SIZE) + 1;
  const ty = ~~Math.abs((fy ? y + 1 : y) / Constants.BLOCK_SIZE) + 1;
  const rx = tx * Constants.BLOCK_SIZE * (fx ? -1 : 1) - (fx ? 0 : 1); // 正数 0、1、2、3 所以要减一
  const ry = ty * Constants.BLOCK_SIZE * (fy ? -1 : 1) - (fy ? 0 : 1);
  const tmp = {
    x: rx,
    y: ry
  };
  return tmp;
};

/**
 * 将普通坐标转成 Block 块的内部坐标
 *
 * @param x
 * @param y
 */
export const coordinateToBlockCoordinate = (x: number, y: number): Point => {
  const fx = x < 0;
  const fy = y < 0;
  // 注意：为负数时需要加一
  const rx = (fx ? x + 1 : x) % Constants.BLOCK_SIZE;
  const ry = (fy ? y + 1 : y) % Constants.BLOCK_SIZE;

  const tmp = {
    x: Math.abs(rx),
    y: Math.abs(ry)
  };
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
export const blockCoordinateToCoordinate = (bx: number, by: number, x: number, y: number): Point => {
  const fx = bx > 0;
  const fy = by > 0;
  const dx = fx ? Constants.BLOCK_SIZE - 1 : 1 - Constants.BLOCK_SIZE;
  const dy = fy ? Constants.BLOCK_SIZE - 1 : 1 - Constants.BLOCK_SIZE;
  const sx = bx - dx;
  const sy = by - dy;

  const tmp = {
    x: sx + (sx < 0 ? -x : x),
    y: sy + (sy < 0 ? -y : y)
  };

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
export const coordinateIsOffScreenByPix = (width: number, height: number, point: Point): boolean => {
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
  const pointAR = coordinateIsOffScreenByPix(width, height, pointA);
  const pointBR = coordinateIsOffScreenByPix(width, height, pointB);
  const pointCR = coordinateIsOffScreenByPix(width, height, pointC);
  const pointDR = coordinateIsOffScreenByPix(width, height, pointD);
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
  coordinateToBlockEndCoordinate,
  coordinateToBlockCoordinate,
  blockCoordinateToCoordinate,
  coordinateIsOffScreenByElement,
  coordinateIsOffScreen,
  coordinateIsOffScreenByPix,
  blockIsOffScreen,
  blockIsOffScreenByElement
};
