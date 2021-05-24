import { createStore } from 'vuex';
import keyboard from './keyboard';
import canvas from './canvas';

export default createStore({
  modules: {
    keyboard,
    canvas
  }
});
