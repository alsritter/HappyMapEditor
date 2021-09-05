import { IState } from './state';
import { canvasUpdateSize, canvasUpdatePoint, canvasInit_X, canvasInit_Y, canvasModifyDragState } from '@/mystore/modules/canvas/canvas.actions';
import { keyboardKeyDown, keyboardKeyUp, keyboardRefresh } from '@/mystore/modules/keyboard/keyboard.actions';
import { mapModifyPoint } from '@/mystore/modules/map/map.actions';
import { currentTileModify } from '@/mystore/modules/currentItem/item.actions';

/**
 * 创建Action
 * @param state
 */
export function createAction(state: IState) {
  return {
    canvasInit_X: canvasInit_X(state),
    canvasInit_Y: canvasInit_Y(state),
    canvasModifyDragState: canvasModifyDragState(state),
    canvasUpdateSize: canvasUpdateSize(state),
    canvasUpdatePoint: canvasUpdatePoint(state),
    //
    keyboardKeyDown: keyboardKeyDown(state),
    keyboardKeyUp: keyboardKeyUp(state),
    keyboardRefresh: keyboardRefresh(state),
    //
    mapModifyPoint: mapModifyPoint(state),
    //
    currentTileModify: currentTileModify(state)
  };
}
