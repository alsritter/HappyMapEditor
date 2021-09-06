import { TileData, Layer, Point, Tile } from '@/mystore/types';
import { CoordinateToPix } from './canvas-point';

/**
 * 这里专门用来绘制网格
 *
 * @param item 绘制网格的参数
 */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  initX: number,
  initY: number,
  showGrid: boolean,
  showAxis: boolean
): void {
  // 要绘制网格必定要刷新画布
  clearAllCanvas(ctx, width, height);

  // 计算数量
  const _cols = width / size;
  const _rows = height / size;
  ctx.setLineDash([1, 2]); //绘制虚线
  ctx.strokeStyle = '#2a2a2a';
  ctx.fillStyle = '#2a2a2a';
  ctx.lineWidth = 1; //设置线条宽度
  const cx = (initX / width) * _cols;
  const cy = (initY / height) * _rows;
  // 绘制线条
  for (let i = 0; i < _cols; i++) {
    ctx.beginPath();
    if (showGrid) {
      ctx.moveTo(size * i + (initX % size), 0);
      ctx.lineTo(size * i + (initX % size), height);
      ctx.stroke();
    }

    if (showAxis) {
      // 绘制文字
      ctx.font = `${size * 0.6}px serif`;
      ctx.fillText(Math.ceil(i - cx) + '', size * i - 0.5 + (initX % size), initY + size / 2, size); // 要让文字居中
    }
  }

  // 同理y轴
  for (let i = 0; i < _rows; i++) {
    ctx.beginPath();
    if (showGrid) {
      ctx.moveTo(0, size * i + (initY % size));
      ctx.lineTo(width, size * i + (initY % size));
      ctx.stroke();
    }

    if (showAxis) {
      // 绘制文字
      ctx.font = `${size * 0.6}px serif`;
      ctx.fillText(Math.ceil(i - cy) + '', initX, size * i - 0.5 + size / 2 + (initY % size), size);
    }
  }

  if (showAxis) {
    ctx.beginPath();
    ctx.setLineDash([]); // 恢复实线
    ctx.lineWidth = 2; //设置线条宽度
    ctx.strokeStyle = '#161a1d'; //设置线条颜色
    ctx.moveTo(0, initY);
    ctx.lineTo(width, initY);
    ctx.moveTo(initX, 0);
    ctx.lineTo(initX, height);
    ctx.stroke();
  }
}

/**
 *  绘制单个格子
 * @param ctx 画布
 * @param width 画布的宽度
 * @param height 画布的高度
 * @param size 单个格子大小
 * @param initX 初始x
 * @param initY 初始y
 * @param changeX 当前要变化的 X坐标轴坐标
 * @param changeY 当前要变化的 Y坐标轴坐标
 * @param data Tile
 */
export function drawSingleItem(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  initX: number,
  initY: number,
  changeX: number,
  changeY: number,
  data: TileData
): void {
  if (data == undefined) return;

  // 计算当前要修改的具体位置(有正负)
  const pixX = changeX * size + initX;
  const pixY = changeY * size + initY;

  // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
  if (pixX > width || pixX + size < 0 || pixY > height || pixY + size < 0) return;
  // 先清空指定位置
  ctx.clearRect(pixX, pixY, size, size);
  // ctx.strokeStyle = data; // 这种是轮廓颜色
  ctx.fillStyle = data.color;
  // 绘制色块
  ctx.fillRect(pixX, pixY, size, size);
}

/**
 * 绘制一块区域
 */
export function drawAreaItem(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  initX: number,
  initY: number,
  start: Point,
  end: Point,
  data: TileData
) {
  let maxPosX: number;
  let minPosX: number;
  let maxPosY: number;
  let minPosY: number;

  if (start.x > end.x) {
    maxPosX = start.x;
    minPosX = end.x;
  } else {
    maxPosX = end.x;
    minPosX = start.x;
  }

  if (start.y > end.y) {
    maxPosY = start.y;
    minPosY = end.y;
  } else {
    maxPosY = end.y;
    minPosY = start.y;
  }

  // 将当前选中的格子存储起来
  for (let i = minPosX; i <= maxPosX; i++) {
    for (let j = minPosY; j <= maxPosY; j++) {
      drawSingleItem(ctx, width, height, size, initX, initY, i, j, data);
    }
  }
}

/**
 * 绘制整个画布
 */
export function drawAllItem(
  frontCtx: CanvasRenderingContext2D,
  middleCtx: CanvasRenderingContext2D,
  backgroundCtx: CanvasRenderingContext2D,
  size: number,
  initX: number,
  initY: number,
  width: number,
  height: number,
  tiles: Tile[]
): void {
  clearAllCanvas(frontCtx, width, height);
  clearAllCanvas(middleCtx, width, height);
  clearAllCanvas(backgroundCtx, width, height);
  for (const tile of tiles) {
    switch (tile.layer) {
      case Layer.FRONT:
        drawSingleItem(frontCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
        break;
      case Layer.MIDDLE:
        drawSingleItem(middleCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
        break;
      case Layer.BACKGROUND:
        drawSingleItem(backgroundCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
        break;
    }
  }
}

/**
 * 清空整个画布
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 */
export function clearAllCanvas(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  ctx.clearRect(0, 0, width, height);
}

/**
 * 清空整个某个格子
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 */
export function clearCanvasPoint(ctx: CanvasRenderingContext2D, initX: number, initY: number, point: Point, size: number): void {
  const npoint = CoordinateToPix(size, initX, initY, point.x, point.y);
  ctx.clearRect(npoint.x, npoint.y, size, size);
}

export default {
  drawGrid,
  clearAllCanvas,
  drawSingleItem,
  drawAllItem,
  clearCanvasPoint,
  drawAreaItem
};
