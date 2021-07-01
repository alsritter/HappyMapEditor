import state from './map.state';
import actions from './map.actions';
import mutations from './map.mutations';
import getters from './map.getters';
import { Module } from 'vuex';
import { MapStateTypes, IRootState } from '@/store/interfaces';

// /// 这个监听按键应该放在 APP.vue 那里
// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations
// };
const canvas: Module<MapStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default canvas;
