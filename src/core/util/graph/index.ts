import canvasDraw from './canvasDraw';
import canvasPoint from './canvasPoint';

export interface GridParamType {
  // 画布元素
  ctx: CanvasRenderingContext2D;
  // 画布的高度
  width: number;
  // 画布的宽度
  height: number;
  // 每个格子的大小
  size: number;
  // 起始点 X
  x: number;
  // 起始点 Y
  y: number;
}

export default {
  canvasDraw,
  canvasPoint
};
