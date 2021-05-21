import keyCodes from '../../core/util/KeyCodes';
import { mutationsTypes } from './keyboard.mutations';

/**
 * 取得按下的键名
 * @param obj 全部键的列表
 * @param value 键的 code
 * @returns
 */
const getKeyByValue = (obj: any, value: number) => Object.keys(obj).find((key) => obj[key] === value);

enum actionTypes {
  KEY_DOWN = 'KEY_DOWN',
  KEY_UP = 'KEY_UP'
}

const actions = {
  [actionTypes.KEY_DOWN]: async ({ commit }: any, code: number): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    // 这里调用的第一个参数是 mutations 里的方法名称，第二个参数才是传入的值
    commit(mutationsTypes.KEY_DOWN, key);
  },
  [actionTypes.KEY_UP]: async ({ commit }: any, code: number): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    commit(mutationsTypes.KEY_UP, key);
  }
};

export default actions;
