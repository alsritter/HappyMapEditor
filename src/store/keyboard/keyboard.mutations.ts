import { MutationTree } from 'vuex';
import { KeyState } from './keyboard.state';

/**
 * 按键状态类型，这个用来更新 state 的状态
 */
export enum KeyMutationsTypes {
  KEY_DOWN = 'KEY_DOWN',
  KEY_UP = 'KEY_UP',
  REFRESH = 'REFRESH'
}

/**
 * 需要指定一下这个 mutations 的接口
 */
export type KeyMutations<S = KeyState> = {
  [KeyMutationsTypes.KEY_DOWN](state: S, key: string): void;
  [KeyMutationsTypes.KEY_UP](state: S, key: string): void;
  [KeyMutationsTypes.REFRESH](state: S): void;
};

const mutations: MutationTree<KeyState> & KeyMutations = {
  /**
   * 指定某个键被按下
   * @param state 这个就是 State 对象，这里取得 State 对象里面的 keys（用来记录某个按键是否被按下，在 keyboard.state.ts 中定义的）
   * @param key 按下的键
   */
  [KeyMutationsTypes.KEY_DOWN]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = true;
  },
  [KeyMutationsTypes.KEY_UP]: (state, key) => {
    const mutState = state;
    mutState.keys[key] = false;
  },
  /**
   * 刷新全部按键
   * @param state
   */
  [KeyMutationsTypes.REFRESH]: (state) => {
    const mutState = state;
    Object.keys(mutState.keys).forEach((key) => {
      mutState.keys[key] = false;
    });
  }
};

export default mutations;