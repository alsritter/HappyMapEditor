import { ActionTree } from 'vuex';
import { ActionTypes } from './canvas.action-types';
import { MutationTypes } from './canvas.mutation-types';
import { CanvasActionsTypes, CanvasStateTypes, IRootState } from '@/store/interfaces';
import { Point } from './canvas.types';

const actions: ActionTree<CanvasStateTypes, IRootState> & CanvasActionsTypes = {
  [ActionTypes.CANVAS_UPDATE_SIZE]: async ({ commit }, nSize: number): Promise<void> => {
    commit(MutationTypes.CANVAS_UPDATE_SIZE, nSize);
  },
  [ActionTypes.CANVAS_UPDATE_POINT]: async ({ commit }, point: Point): Promise<void> => {
    commit(MutationTypes.CANVAS_UPDATE_POINT, point);
  }
};

export default actions;
