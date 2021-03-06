import { IKeyboradState } from './keyboard.state';

/**
 * 取得全部的按键
 */
export function selectKeys(state: IKeyboradState) {
  return () => {
    return state.keys;
  };
}

/**
 * 返回当前已经按下的按键
 * @returns 返回当前已经按下的按键
 */
export function selectPressedKeys(state: IKeyboradState) {
  return () => {
    return (
      Object.entries(state.keys)
        // , 这里表示用不到前面那个参数，可以省略不写
        .filter(([, value]) => value)
        .map((item) => item[0])
    );
  };
}

/**
 * 是否撤回
 * @returns 是否撤回
 */
export function isRecall(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_CONTROL'] && state.keys['VALUE_Z'];
  };
}

/**
 * 是否按下 Alt
 * @returns 是否按下 Alt
 */
export function isAlt(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_ALT'];
  };
}

/**
 * 是否按下 Ctrl + S
 * @returns 是否按下 保存
 */
export function isSave(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_CONTROL'] && state.keys['VALUE_S'];
  };
}

export function isDown_B(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_B'];
  };
}

export function isDown_E(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_E'];
  };
}
export function isDown_F(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_F'];
  };
}
export function isDown_P(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_P'];
  };
}
export function isDown_U(state: IKeyboradState) {
  return () => {
    return state.keys['VALUE_U'];
  };
}
