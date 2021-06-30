import { CanvasStateTypes, CanvasMutationsTypes, CanvasGettersTypes, CanvasActionsTypes } from '@/store/interfaces';
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';

export type CanvasStoreModuleTypes<S = CanvasStateTypes> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof CanvasMutationsTypes, P extends Parameters<CanvasMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<CanvasMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof CanvasGettersTypes]: ReturnType<CanvasGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof CanvasActionsTypes>(
    key: K,
    payload?: Parameters<CanvasActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<CanvasActionsTypes[K]>;
};
