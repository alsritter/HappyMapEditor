import { IState } from './state';
import {
  canvasUpdateSize,
  canvasUpdatePoint,
  canvasInit_X,
  canvasInit_Y,
  canvasModifyDragState,
  canvasCurrentLayer,
  canvasShowGrid,
  canvasShowAxis
} from '@/mystore/modules/canvas/canvas.actions';
import { keyboardKeyDown, keyboardKeyUp, keyboardRefresh } from '@/mystore/modules/keyboard/keyboard.actions';
import { mapAddTile, mapDeleteTile, mapAddAreaTile, mapDeleteAreaTile } from '@/mystore/modules/map/map.actions';
import { currentTileModify, currentPrefabModify, currentTool } from '@/mystore/modules/currentItem/item.actions';

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
    canvasCurrentLayer: canvasCurrentLayer(state),
    canvasShowGrid: canvasShowGrid(state),
    canvasShowAxis: canvasShowAxis(state),
    //
    keyboardKeyDown: keyboardKeyDown(state),
    keyboardKeyUp: keyboardKeyUp(state),
    keyboardRefresh: keyboardRefresh(state),
    //
    mapAddTile: mapAddTile(state),
    mapDeleteTile: mapDeleteTile(state),
    mapAddAreaTile: mapAddAreaTile(state),
    mapDeleteAreaTile: mapDeleteAreaTile(state),
    //
    currentTileModify: currentTileModify(state),
    currentPrefabModify: currentPrefabModify(state),
    currentTool: currentTool(state)
  };
}
