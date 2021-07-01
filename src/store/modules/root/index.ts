import { Module, ModuleTree } from 'vuex';
import { IRootState } from '@/store/interfaces';
import { getters } from './root.getters';
import { actions } from './root.actions';
import { mutations } from './root.mutations';
import { state } from './root.state';
import keyboardModule from '@/store/modules/keyboard';
import canvasModule from '@/store/modules/canvas';
import mapModule from '@/store/modules/map';

// Modules
const modules: ModuleTree<IRootState> = {
  keyboardModule,
  canvasModule,
  mapModule
};

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;
