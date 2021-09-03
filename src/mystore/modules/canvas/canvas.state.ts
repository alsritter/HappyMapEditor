export type Point = {
  x: number;
  y: number;
};

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
}

export default CanvasState;
