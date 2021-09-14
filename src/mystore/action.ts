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
import { mapAddTile, mapDeleteTile, mapAddAreaTile, mapDeleteAreaTile, mapAddPrefab, mapDeletePrefab } from '@/mystore/modules/map/map.actions';
import { currentTileModify, currentPrefabModify, currentTool, currentDisplayLayer, currentPrefabTool } from '@/mystore/modules/currentItem/item.actions';
import { backgroundModify } from '@/mystore/modules/background/bg.actions';
import { collectTileColor, collectTileEffect, collectTileTags } from '@/mystore/modules/collect/collect.actions';

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
    mapAddPrefab: mapAddPrefab(state),
    mapDeletePrefab: mapDeletePrefab(state),
    //
    currentTileModify: currentTileModify(state),
    currentPrefabModify: currentPrefabModify(state),
    currentTool: currentTool(state),
    currentDisplayLayer: currentDisplayLayer(state),
    currentPrefabTool: currentPrefabTool(state),
    //
    backgroundModify: backgroundModify(state),
    //
    collectTileColor: collectTileColor(state),
    collectTileEffect: collectTileEffect(state),
    collectTileTags: collectTileTags(state)
  };
}
