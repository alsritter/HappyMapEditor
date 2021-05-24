import { GetterTree } from 'vuex';
import { CanvasState } from './canvas.state';
import { Point } from './canvas.mutations';

export type CanvasGetters = {
  status(state: CanvasState): CanvasState;
  getSize(state: CanvasState): number;
  getPoint(state: CanvasState): Point;
};

const getters: GetterTree<CanvasState, CanvasState> & CanvasGetters = {
  status: (state) => state,
  getSize: (state) => state.canvasSize.size,
  getPoint: (state) => state.initPoint
};

export default getters;
