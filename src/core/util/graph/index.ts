import canvasDraw from './canvasDraw';
import canvasPoint from './canvasPoint';
import { Dictionary } from 'typescript-collections';
import { Tile, Prefab, Block } from '@/store/modules/map/map.types';

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
 * 绘制单个格子
 *
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X 位置
 * @param y 起始点 Y 位置
 * @param changeX 待绘制的坐标位置
 * @param changeY 待绘制的坐标位置
 * @param data 要绘制的数据
 */
export type SingleItemParamType = {
  changeX: number;
  changeY: number;
  data: Tile | Prefab | undefined;
} & GridParamType;

/**
 * 绘制整个面板
 *
 * @param ctx 画布元素
 * @param width 画布的高度
 * @param height 画布的宽度
 * @param size 每个格子的大小
 * @param x 起始点 X 位置
 * @param y 起始点 Y 位置
 * @param data 要绘制的数据
 * @param items 要绘制的 Items 列表
 */
export type AllItemParamType = {
  data: Block[];
  items: Dictionary<number, Tile | Prefab>;
} & GridParamType;

/**
 * 做个类型检查
 */
export function isSingleParamType(object: AllItemParamType | SingleItemParamType | GridParamType): object is SingleItemParamType {
  return 'changeX' in object;
}

export function isAllParamType(object: AllItemParamType | SingleItemParamType | GridParamType): object is AllItemParamType {
  return 'items' in object;
}

export default {
  canvasDraw,
  canvasPoint,
  isSingleParamType,
  isAllParamType
};
