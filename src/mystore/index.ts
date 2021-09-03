import { reactive, readonly } from 'vue';
import { createAction } from './action';
import { createState, IState } from './state';
import { createPersistStorage } from './persist-storage';
import { createGetter } from './getters';

const state = createState();
// 强转下类型
const action = createAction(state as IState);
const getters = createGetter(state as IState);

export const useStore = () => {
  const store = {
    state: createPersistStorage<IState>(state),
    action: readonly(action),
    getters: readonly(getters)
  };
  return store;
};
