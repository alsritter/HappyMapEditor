import { ActionTree } from 'vuex';
import { ActionTypes } from './root.action-types';
import { MutationTypes } from './root.mutation-types';
import { RootActionsTypes, IRootState } from '@/store/interfaces';

export const actions: ActionTree<IRootState, IRootState> & RootActionsTypes = {
  [ActionTypes.UPDATE_VERSION]({ commit }, payload: string) {
    commit(MutationTypes.UPDATE_VERSION, payload);
  },
  [ActionTypes.COUNTER_CHECK]({ dispatch }, payload: boolean) {
    dispatch(ActionTypes.SET_ROOT_DISPATCH, payload);
  }
};
