import { MutationTree } from 'vuex';
import { CanvasState } from './canvas.state';

export enum CanvasMutationsTypes {
  UPDATE_SIZE = 'UPDATE_SIZE',
  UPDATE_POINT = 'UPDATE_POINT'
}

export type Point = {
  x: number;
  y: number;
};

export type CanvasMutations<S = CanvasState> = {
  [CanvasMutationsTypes.UPDATE_SIZE](state: S, nSize: number): void;
  [CanvasMutationsTypes.UPDATE_POINT](state: S, point: Point): void;
};

const mutations: MutationTree<CanvasState> & CanvasMutations = {
  [CanvasMutationsTypes.UPDATE_SIZE]: (state, nSize) => {
    const mutState = state;
    mutState.canvasSize.size = nSize;
  },
  [CanvasMutationsTypes.UPDATE_POINT]: (state, points) => {
    const mutState = state;
    mutState.initPoint = points;
  }
};

export default mutations;
