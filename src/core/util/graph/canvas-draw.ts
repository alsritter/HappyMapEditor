import { TileData, Layer, Point, Tile } from '@/mystore/types';
import { CoordinateToPix } from './canvas-point';
import { DisplayLayers } from '@/mystore/types';

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
      ctx.fillText(-Math.ceil(i - cy) + '', initX, size * i - 0.5 + size / 2 + (initY % size), size);
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
 * @param mainCtx 画布
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
  mainCtx: CanvasRenderingContext2D,
  frontCtx: CanvasRenderingContext2D,
  middleCtx: CanvasRenderingContext2D,
  backgroundCtx: CanvasRenderingContext2D,
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
  // const pixX = changeX * size + initX;
  // const pixY = changeY * size + initY;
  const pix = CoordinateToPix(size, initX, initY, changeX, changeY);

  // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
  if (pix.x > width || pix.x + size < 0 || pix.y > height || pix.y + size < 0) return;
  // 先清空指定位置
  frontCtx.clearRect(pix.x, pix.y, size, size);
  middleCtx.clearRect(pix.x, pix.y, size, size);
  backgroundCtx.clearRect(pix.x, pix.y, size, size);

  // ctx.strokeStyle = data; // 这种是轮廓颜色
  mainCtx.fillStyle = data.color;
  // ctx.drawImage()
  if (data.image != null) {
    mainCtx.drawImage(data.image, pix.x, pix.y, size, size);
  }
  // 绘制色块
  mainCtx.fillRect(pix.x, pix.y, size, size);
}

/**
 *  绘制单个格子
 * @param mainCtx 画布
 * @param width 画布的宽度
 * @param height 画布的高度
 * @param size 单个格子大小
 * @param initX 初始x
 * @param initY 初始y
 * @param changeX 当前要变化的 X坐标轴坐标
 * @param changeY 当前要变化的 Y坐标轴坐标
 * @param data Tile
 */
export function drawSingleItemInSingleLayer(
  mainCtx: CanvasRenderingContext2D,
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
  const pix = CoordinateToPix(size, initX, initY, changeX, changeY);
  if (pix.x > width || pix.x + size < 0 || pix.y > height || pix.y + size < 0) return;
  mainCtx.clearRect(pix.x, pix.y, size, size);
  mainCtx.fillStyle = data.color;
  if (data.image != null) {
    mainCtx.drawImage(data.image, pix.x, pix.y, size, size);
  }
  // 绘制色块
  mainCtx.fillRect(pix.x, pix.y, size, size);
}

/**
 *  指定位置上绘制一个颜色
 *
 * @param mainCtx 画布
 * @param width 画布的宽度
 * @param height 画布的高度
 * @param size 单个格子大小
 * @param initPoint 初始点位置
 * @param point 当前要变化的坐标轴坐标
 * @param color 颜色
 */
export function drawSingleColorInSingleLayer(
  mainCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  initPoint: Point,
  point: Point,
  color: string
): void {
  if (color == undefined) return;
  const pix = CoordinateToPix(size, initPoint.x, initPoint.y, point.x, point.y);
  if (pix.x > width || pix.x + size < 0 || pix.y > height || pix.y + size < 0) return;
  mainCtx.clearRect(pix.x, pix.y, size, size);
  mainCtx.fillStyle = color;
  mainCtx.fillRect(pix.x, pix.y, size, size);
}

/**
 * 绘制一块区域
 */
export function drawAreaItem(
  mainCtx: CanvasRenderingContext2D,
  frontCtx: CanvasRenderingContext2D,
  middleCtx: CanvasRenderingContext2D,
  backgroundCtx: CanvasRenderingContext2D,
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
      drawSingleItem(mainCtx, frontCtx, middleCtx, backgroundCtx, width, height, size, initX, initY, i, j, data);
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
  display: DisplayLayers,
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
        if (!display.frontShow) break;
        drawSingleItem(frontCtx, frontCtx, middleCtx, backgroundCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
        break;
      case Layer.MIDDLE:
        if (!display.middleShow) break;
        drawSingleItem(middleCtx, frontCtx, middleCtx, backgroundCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
        break;
      case Layer.BACKGROUND:
        if (!display.backgroundShow) break;
        drawSingleItem(backgroundCtx, frontCtx, middleCtx, backgroundCtx, width, height, size, initX, initY, tile.point.x, tile.point.y, tile.data);
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
export function clearCanvasPoint(
  frontCtx: CanvasRenderingContext2D,
  middleCtx: CanvasRenderingContext2D,
  backgroundCtx: CanvasRenderingContext2D,
  initX: number,
  initY: number,
  point: Point,
  size: number
): void {
  const npoint = CoordinateToPix(size, initX, initY, point.x, point.y);
  frontCtx.clearRect(npoint.x, npoint.y, size, size);
  middleCtx.clearRect(npoint.x, npoint.y, size, size);
  backgroundCtx.clearRect(npoint.x, npoint.y, size, size);
}

/**
 * 清空一块区域
 */
export function clearAreaItem(
  frontCtx: CanvasRenderingContext2D,
  middleCtx: CanvasRenderingContext2D,
  backgroundCtx: CanvasRenderingContext2D,
  size: number,
  initX: number,
  initY: number,
  start: Point,
  end: Point
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
      clearCanvasPoint(frontCtx, middleCtx, backgroundCtx, initX, initY, { x: i, y: j }, size);
    }
  }
}

/**
 * 清空一块区域
 */
export function clearSingleLayerAreaItem(mainCtx: CanvasRenderingContext2D, size: number, initX: number, initY: number, start: Point, end: Point) {
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
      clearSingleLayerCanvasPoint(mainCtx, initX, initY, { x: i, y: j }, size);
    }
  }
}

/**
 * 清空整个某个格子
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 */
export function clearSingleLayerCanvasPoint(mainCtx: CanvasRenderingContext2D, initX: number, initY: number, point: Point, size: number): void {
  const npoint = CoordinateToPix(size, initX, initY, point.x, point.y);
  mainCtx.clearRect(npoint.x, npoint.y, size, size);
}

export default {
  drawGrid,
  clearAllCanvas,
  drawSingleItem,
  drawAllItem,
  clearCanvasPoint,
  drawAreaItem,
  clearAreaItem,
  clearSingleLayerAreaItem,
  clearSingleLayerCanvasPoint,
  drawSingleItemInSingleLayer,
  drawSingleColorInSingleLayer
};
