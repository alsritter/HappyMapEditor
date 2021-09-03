import keyCodes from '@/core/util/KeyCodes';
import { IKeyboradState } from './keyboard.state';

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

export function keyboardKeyDown(state: IKeyboradState) {
  return (code: string) => {
    const key = getKeyByValue(keyCodes, code);
    state.keys[key] = true;
  };
}

export function keyboardKeyUp(state: IKeyboradState) {
  return (code: string) => {
    const key = getKeyByValue(keyCodes, code);
    state.keys[key] = false;
  };
}

export function keyboardRefresh(state: IKeyboradState) {
  return () => {
    Object.keys(state.keys).forEach((key) => {
      state.keys[key] = false;
    });
  };
}
