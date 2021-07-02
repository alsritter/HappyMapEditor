import { ActionTree } from 'vuex';
import { ActionTypes } from './map.action-types';
import { MutationTypes } from './map.mutation-types';
import { MapActionsTypes, MapStateTypes, IRootState } from '@/store/interfaces';

const actions: ActionTree<MapStateTypes, IRootState> & MapActionsTypes = {
  [ActionTypes.MAP_CHANGE_POINT]: async ({ commit }, payload): Promise<void> => {
    commit(MutationTypes.MAP_CHANGE_POINT, payload);
  }
};

export default actions;
