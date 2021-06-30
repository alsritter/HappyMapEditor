import { ActionTree } from 'vuex';
import { ActionTypes } from './canvas.action-types';
import { MutationTypes } from './canvas.mutation-types';
import { CanvasActionsTypes, CanvasStateTypes, IRootState, Point } from '@/store/interfaces';

const actions: ActionTree<CanvasStateTypes, IRootState> & CanvasActionsTypes = {
  [ActionTypes.UPDATE_SIZE]: async ({ commit }, nSize: number): Promise<void> => {
    commit(MutationTypes.UPDATE_SIZE, nSize);
  },
  [ActionTypes.UPDATE_POINT]: async ({ commit }, point: Point): Promise<void> => {
    commit(MutationTypes.UPDATE_POINT, point);
  }
};

export default actions;
