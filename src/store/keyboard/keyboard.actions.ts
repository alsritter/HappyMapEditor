import keyCodes from '../../core/util/KeyCodes';
import { KeyMutations, KeyMutationsTypes } from './keyboard.mutations';
import { ActionTree, ActionContext } from 'vuex';
import { KeyState } from './keyboard.state';

type KeyAugmentedActionContext = {
  commit<K extends keyof KeyMutations>(key: K, payload: Parameters<KeyMutations[K]>[1]): ReturnType<KeyMutations[K]>;
} & Omit<ActionContext<KeyState, KeyState>, 'commit'>;

export interface KeyActions {
  [KeyMutationsTypes.KEY_DOWN]({ commit }: KeyAugmentedActionContext, code: number): Promise<void>;
  [KeyMutationsTypes.KEY_UP]({ commit }: KeyAugmentedActionContext, code: number): Promise<void>;
  [KeyMutationsTypes.REFRESH]({ commit }: KeyAugmentedActionContext): Promise<void>;
}

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
const getKeyByValue = (obj: SimpleKeyValueObject, value: number) => Object.keys(obj).find((key: string) => obj[key] === value) as string;

const actions: ActionTree<KeyState, KeyState> & KeyActions = {
  [KeyMutationsTypes.KEY_DOWN]: async ({ commit }, code: number): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    // console.log(`按下了 ${code} 对应的 ${key}`);
    // 这里调用的第一个参数是 mutations 里的方法名称，第二个参数才是传入的值
    commit(KeyMutationsTypes.KEY_DOWN, key);
  },
  [KeyMutationsTypes.KEY_UP]: async ({ commit }, code: number): Promise<void> => {
    const key = getKeyByValue(keyCodes, code);
    commit(KeyMutationsTypes.KEY_UP, key);
  },
  [KeyMutationsTypes.REFRESH]: async ({ commit }): Promise<void> => {
    commit(KeyMutationsTypes.REFRESH, undefined);
  }
};

export default actions;