import state from './keyboard.state';
import actions from './keyboard.actions';
import mutations from './keyboard.mutations';
import getters from './keyboard.getters';

/// 这个监听按键应该放在 APP.vue 那里
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
