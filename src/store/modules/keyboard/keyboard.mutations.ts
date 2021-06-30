import { MutationTree } from 'vuex';
import { MutationTypes } from './keyboard.mutation-types';
import { KeyStateTypes, KeyMutationsTypes } from '@/store/interfaces';

const mutations: MutationTree<KeyStateTypes> & KeyMutationsTypes = {
  /**
   * 指定某个键被按下
   * @param state 这个就是 State 对象，这里取得 State 对象里面的 keys（用来记录某个按键是否被按下，在 keyboard.state.ts 中定义的）
   * @param key 按下的键
   */
  [MutationTypes.KEYBOARD_KEY_DOWN]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = true;
  },
  [MutationTypes.KEYBOARD_KEY_UP]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = false;
  },
  /**
   * 刷新全部按键
   * @param state
   */
  [MutationTypes.KEYBOARD_REFRESH]: (state) => {
    const mutState = state;
    Object.keys(mutState.keys).forEach((key) => {
      mutState.keys[key] = false;
    });
  }
};

export default mutations;
