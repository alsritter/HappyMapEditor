import { createStore } from 'vuex';
import { KeyStoreModuleTypes } from '@/store/modules/keyboard/keyboard.module';
import { CanvasStoreModuleTypes } from '@/store/modules/canvas/canvas.module';
import { RootStoreModuleTypes } from '@/store/modules/root/root.module';
import { MapStoreModuleTypes } from '@/store/modules/map/map.module';
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
  mapModule: MapStoreModuleTypes;
  root: RootStoreModuleTypes;
};

export type Store = KeyStoreModuleTypes<Pick<StoreModules, 'keyboardModule'>> &
  CanvasStoreModuleTypes<Pick<StoreModules, 'canvasModule'>> &
  MapStoreModuleTypes<Pick<StoreModules, 'mapModule'>> &
  RootStoreModuleTypes<Pick<StoreModules, 'root'>>;
