import { GetterTree } from 'vuex';
import { KeyState } from './keyboard.state';

interface SimpleKeyValueObject {
  [key: string]: boolean;
}

export type KeyGetters = {
  //status(state: any): any;
  selectKeys(state: KeyState): SimpleKeyValueObject;
  // 取得全部按下的键名
  selectPressedKeys(state: KeyState): string[];
  // 是否撤回
  isRecall(state: KeyState): boolean;
  // 是否 Alt
  isAlt(state: KeyState): boolean;
};

/**
 * Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性
 */
const getters: GetterTree<KeyState, KeyState> & KeyGetters = {
  //status: (state) => state.status,
  /**
   * 取得全部的按键
   * @param state
   * @returns 取得全部的按键
   */
  selectKeys: (state) => state.keys,

  /**
   * 返回当前已经按下的按键
   * @param state
   * @returns 返回当前已经按下的按键
   */
  selectPressedKeys: (state) =>
    Object.entries(state.keys)
      // , 这里表示用不到前面那个参数，可以省略不写
      .filter(([, value]) => value)
      .map((item) => item[0]),

  /**
   * 是否撤回
   * @param state
   * @returns 是否撤回
   */
  isRecall: (state) => state.keys['VALUE_CONTROL'] && state.keys['VALUE_Z'],

  /**
   * 是否按下 Alt
   * @param state
   * @returns 是否按下 Alt
   */
  isAlt: (state) => state.keys['VALUE_ALT']
  // 这里的原理就是当调用了 isRightDown 方法时返回 'RIGHT_ARROW' 对应的 Boolean
  // isRightDown: (state: any) => state.keys['RIGHT_ARROW'],
  // isLeftDown: (state: any) => state.keys['LEFT_ARROW'],
  // isUpDown: (state: any) => state.keys['UP_ARROW'],
  // isDownDown: (state: any) => state.keys['DOWN_ARROW']
};

export default getters;
