import state from './map.state';
import actions from './map.actions';
import mutations from './map.mutations';
import getters from './map.getters';
import { Module } from 'vuex';
import { MapStateTypes, IRootState } from '@/store/interfaces';

const canvas: Module<MapStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default canvas;
