import { KeyStateTypes, KeyMutationsTypes, KeyGettersTypes, KeyActionsTypes } from '@/store/interfaces';
import { Store as VuexStore, CommitOptions, DispatchOptions } from 'vuex';

export type KeyStoreModuleTypes<S = KeyStateTypes> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
  commit<K extends keyof KeyMutationsTypes, P extends Parameters<KeyMutationsTypes[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<KeyMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof KeyGettersTypes]: ReturnType<KeyGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof KeyActionsTypes>(key: K, payload?: Parameters<KeyActionsTypes[K]>[1], options?: DispatchOptions): ReturnType<KeyActionsTypes[K]>;
};
