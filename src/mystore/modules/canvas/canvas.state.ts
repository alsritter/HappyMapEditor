import { Point, Layer } from '@/mystore/types';

export interface ICanvasState {
  /**
   * 画布大小
   */
  canvasSize: number;
  /**
   * 起始点
   */
  initPoint: Point;

  /**
   * 是否正在拖动
   */
  dragging: boolean;

  /**
   * 选中的图层
   */
  currentLayer: Layer;

  /**
   * 显示网格
   */
  showGrid: boolean;

  /**
   * 显示轴线
   */
  showAxis: boolean;
}

export default ICanvasState;
