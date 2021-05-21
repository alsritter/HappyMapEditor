import state from './keyboard.state';
import actions from './keyboard.actions';
import mutations from './keyboard.mutations';
import getters from './keyboard.getters';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
