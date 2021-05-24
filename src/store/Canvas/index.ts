import state from './canvas.state';
import getters from './canvas.getters';
import actions from './canvas.actions';
import mutations from './canvas.mutations';

/// 这个监听按键应该放在 APP.vue 那里
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
