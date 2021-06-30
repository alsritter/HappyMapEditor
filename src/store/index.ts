import { createStore } from 'vuex';
import { KeyStoreModuleTypes } from '@/store/modules/keyboard/keyboard.types';
import { CanvasStoreModuleTypes } from '@/store/modules/canvas/canvas.types';
import { RootStoreModuleTypes } from '@/store/modules/root/root.types';
import { IRootState } from '@/store/interfaces';
// import map from '@/store/modules/map';
// import keyboard from '@/store/modules/keyboard';
// import canvas from '@/store/modules/canvas';

// export default createStore({
//   modules: {
//     keyboard,
//     canvas,
//     map
//   }
// });

import root from './modules/root';

export const store = createStore<IRootState>(root);

type StoreModules = {
  keyboardModule: KeyStoreModuleTypes;
  canvasModule: CanvasStoreModuleTypes;
  root: RootStoreModuleTypes;
};

export type Store = KeyStoreModuleTypes<Pick<StoreModules, 'keyboardModule'>> &
  CanvasStoreModuleTypes<Pick<StoreModules, 'canvasModule'>> &
  RootStoreModuleTypes<Pick<StoreModules, 'root'>>;
