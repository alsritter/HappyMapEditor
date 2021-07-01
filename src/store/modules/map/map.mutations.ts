import { MutationTree } from 'vuex';
import { MutationTypes } from './map.mutation-types';
import { MapStateTypes, MapMutationsTypes } from '@/store/interfaces';

const mutations: MutationTree<MapStateTypes> & MapMutationsTypes = {
  [MutationTypes.MAP_CHANGE_POINT]: (state, payload) => {
    const mutState = state;
    // mutState.
    console.log(payload);
  }
};

export default mutations;
