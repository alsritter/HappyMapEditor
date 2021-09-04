import { watch, toRaw, readonly } from 'vue';
import { IState } from './state';

export function createPersistStorage<T>(state: any, key = 'default'): T {
  const STORAGE_KEY = '--APP-STORAGE--';

  // init value 其中 Object.entries() 方法返回一个给定对象自身可枚举属性的键值对数组
  Object.entries(getItem(key)).forEach(([key, value]) => {
    state[key] = value;
  });

  function setItem(state: any) {
    const stateRow = getItem();
    stateRow[key] = state;
    const stateStr = JSON.stringify(stateRow);
    localStorage.setItem(STORAGE_KEY, stateStr);
  }

  function getItem(key?: string) {
    const stateStr = localStorage.getItem(STORAGE_KEY) || '{}';
    const stateRow = JSON.parse(stateStr) || {};

    return key ? stateRow[key] || {} : stateRow;
  }

  watch(state, () => {
    const stateRow = toRaw(state);
    setItem(stateRow);
  });

  return readonly(state);
}
