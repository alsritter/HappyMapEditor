import state from './canvas.state';
import getters from './canvas.getters';
import actions from './canvas.actions';
import mutations from './canvas.mutations';
import { Module } from 'vuex';
import { CanvasStateTypes, IRootState } from '@/store/interfaces';

// export default {
//   namespaced: true,
//   state,
//   getters,
//   actions,
//   mutations
// };

const canvas: Module<CanvasStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default canvas;
