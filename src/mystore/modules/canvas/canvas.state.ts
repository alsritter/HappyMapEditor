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
}

export default CanvasState;
