import state from './map.state';
import actions from './map.actions';
import mutations from './map.mutations';
import getters from './map.getters';

/// 这个监听按键应该放在 APP.vue 那里
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
