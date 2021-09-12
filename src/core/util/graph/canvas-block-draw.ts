import { PrefabData } from '@/mystore/types';
import { CoordinateToPix } from './canvas-point';
import Constants from '@/core/util/Constants';

/**
 * 绘制 Block 盒子（边框）
 * @param ctx 画布元素
 * @param size 单元格宽度
 * @param sx 像素起始点
 * @param sy 像素起始点
 * @param x Block 的坐标
 * @param y Block 的坐标
 */
export const drawBlockBox = (ctx: CanvasRenderingContext2D, size: number, sx: number, sy: number, x: number, y: number): void => {
  const boxW = size * Constants.BLOCK_SIZE;
  const bsize = Constants.BLOCK_SIZE;
  // 因为负数是从 -1 开始的，所以需要移动一位
  const fx = x > 0;
  const fy = y > 0;
  const dx = fx ? bsize - 1 : -bsize;
  const dy = fy ? bsize - 1 : -bsize;

  const bsx = x - dx;
  const bsy = y - dy;

  const boxPoint = CoordinateToPix(size, sx, sy, bsx, bsy);

  const xBoxW = boxW * (x > 0 ? 1 : -1);
  const yBoxW = boxW * (y > 0 ? 1 : -1);

  ctx.beginPath();
  ctx.moveTo(boxPoint.x, boxPoint.y);
  ctx.lineTo(boxPoint.x + xBoxW, boxPoint.y);

  ctx.moveTo(boxPoint.x, boxPoint.y);
  ctx.lineTo(boxPoint.x, boxPoint.y + yBoxW);

  ctx.moveTo(boxPoint.x + xBoxW, boxPoint.y + yBoxW);
  ctx.lineTo(boxPoint.x, boxPoint.y + yBoxW);

  ctx.moveTo(boxPoint.x + xBoxW, boxPoint.y + yBoxW);
  ctx.lineTo(boxPoint.x + xBoxW, boxPoint.y);
  ctx.stroke();
};

export function drawSinglePrefab(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  size: number,
  initX: number,
  initY: number,
  changeX: number,
  changeY: number,
  data: PrefabData
) {
  if (data == undefined) return;

  const pixX = changeX * size + initX;
  const pixY = changeY * size + initY;

  // 如果要修改的格子在画布外面则不需要绘制，注意它的起始坐标在左上角，所以要比对四个角完全不在画布里面才不需要绘制
  if (pixX > width || pixX + size < 0 || pixY > height || pixY + size < 0) return;
  // 先清空指定位置
  ctx.clearRect(pixX, pixY, data.width * size, data.height * size);
  // ctx.strokeStyle = data; // 这种是轮廓颜色
  ctx.fillStyle = '#8c40405c';
  // ctx.drawImage()
  if (data.image != null) {
    ctx.drawImage(data.image, pixX, pixY, data.width * size, data.height * size);
  }
  // 绘制色块
  ctx.fillRect(pixX, pixY, data.width * size, data.height * size);
}

export default {
  drawBlockBox,
  drawSinglePrefab
};