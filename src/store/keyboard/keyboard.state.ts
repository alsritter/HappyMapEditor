import keyCodes from '../../core/util/KeyCodes';

/**
 * 先初始化全部按键，默认都没有按下（false）
 * 
 * keys 方法返回对象的可枚举字符串属性和方法的名称。
 * 这里是把同名变量灌进去，并赋值为 false
 * @returns 
 */
const prepareKeys = () => {
  const keys: any = {};
  Object.keys(keyCodes).forEach(key => {
    keys[key] = false;
  });

  return keys;
};

export const initialState = {
  keys: prepareKeys()
};

export default initialState;
