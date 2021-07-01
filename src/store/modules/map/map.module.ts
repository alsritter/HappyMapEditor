import { MapStateTypes, MapMutationsTypes, MapGettersTypes, MapActionsTypes } from '@/store/interfaces';
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';

export type MapStoreModuleTypes<S = MapStateTypes> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof MapMutationsTypes, P extends Parameters<MapMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<MapMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof MapGettersTypes]: ReturnType<MapGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof MapActionsTypes>(key: K, payload?: Parameters<MapActionsTypes[K]>[1], options?: DispatchOptions): ReturnType<MapActionsTypes[K]>;
};
