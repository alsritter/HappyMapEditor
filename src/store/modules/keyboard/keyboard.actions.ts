import keyCodes from '@/core/util/KeyCodes';
import { ActionTree } from 'vuex';
import { ActionTypes } from './keyboard.action-types';
import { MutationTypes } from './keyboard.mutation-types';
import { KeyStateTypes, IRootState, KeyActionsTypes } from '@/store/interfaces';

/**
 * 创建一个简单的索引接口，避免报错
 */
interface SimpleKeyValueObject {
  [key: string]: number | string;
}

/**
 * 取得按下的键名
 * @param obj 全部键的列表
 * @param value 键的 code
 * @returns
 */
const getKeyByValue = (obj: SimpleKeyValueObject, value: string) => Object.keys(obj).find((key: string) => obj[key] === value) as string;

const actions: ActionTree<KeyStateTypes, IRootState> & KeyActionsTypes = {
  [ActionTypes.KEYBOARD_KEY_DOWN]: async ({ commit }, code: string): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    // console.log(`按下了 ${code} 对应的 ${key}`);
    // 这里调用的第一个参数是 mutations 里的方法名称，第二个参数才是传入的值
    commit(MutationTypes.KEYBOARD_KEY_DOWN, key);
  },
  [ActionTypes.KEYBOARD_KEY_UP]: async ({ commit }, code: string): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    commit(MutationTypes.KEYBOARD_KEY_UP, key);
  },
  [ActionTypes.KEYBOARD_REFRESH]: async ({ commit }): Promise<void> => {
    commit(MutationTypes.KEYBOARD_REFRESH, undefined);
  }
};

export default actions;
