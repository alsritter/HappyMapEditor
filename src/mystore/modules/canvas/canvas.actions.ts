import { ICanvasState } from './canvas.state';
import { Point, Layer } from '@/mystore/types';

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

export function canvasInit_X(state: ICanvasState) {
  return (x: number) => {
    state.initPoint.x = x;
  };
}

export function canvasInit_Y(state: ICanvasState) {
  return (y: number) => {
    state.initPoint.y = y;
  };
}

export function canvasModifyDragState(state: ICanvasState) {
  return (isDrag: boolean) => {
    state.dragging = isDrag;
  };
}

export function canvasCurrentLayer(state: ICanvasState) {
  return (layer: Layer) => {
    state.currentLayer = layer;
  };
}
