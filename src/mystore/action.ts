import { IState } from './state';
import { canvasUpdateSize, canvasUpdatePoint } from '@/mystore/modules/canvas/canvas.actions';
import { keyboardKeyDown, keyboardKeyUp, keyboardRefresh } from '@/mystore/modules/keyboard/keyboard.actions';
import { mapModifyPoint } from '@/mystore/modules/map/map.actions';

/**
 * 创建Action
 * @param state
 */
export function createAction(state: IState) {
  return {
    canvasUpdateSize: canvasUpdateSize(state),
    canvasUpdatePoint: canvasUpdatePoint(state),
    //
    keyboardKeyDown: keyboardKeyDown(state),
    keyboardKeyUp: keyboardKeyUp(state),
    keyboardRefresh: keyboardRefresh(state),
    //
    mapModifyPoint: mapModifyPoint(state)
  };
}
