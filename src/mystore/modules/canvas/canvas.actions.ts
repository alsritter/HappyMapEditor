import { Point, ICanvasState } from './canvas.state';

export function canvasUpdateSize(state: ICanvasState) {
  return (nSize: number) => {
    state.canvasSize = nSize;
  };
}

export function canvasUpdatePoint(state: ICanvasState) {
  return (point: Point) => {
    state.initPoint = point;
  };
}
