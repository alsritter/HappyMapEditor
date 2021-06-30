import canvasDraw from './canvasDraw';
import canvasPoint from './canvasPoint';

/**
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X
 * @param y 起始点 Y
 */
export type GridParamType = {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  size: number;
  x: number;
  y: number;
};

/**
 * 绘制内容
 *
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X 位置
 * @param y 起始点 Y 位置
 * @param changeX 待修改的坐标位置
 * @param changeY 待修改的坐标位置
 * @param data 要绘制的数据（这里临时使用颜色）
 */
export type DataParamType = {
  changeX: number;
  changeY: number;
  data: string;
} & GridParamType;

/**
 * 做个类型检查
 */
export function isDataParamType(object: GridParamType | DataParamType): object is DataParamType {
  return 'changeX' in object;
}

export default {
  canvasDraw,
  canvasPoint,
  isDataParamType
};
