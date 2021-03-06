import { IState } from './state';
import {
  selectKeys,
  selectPressedKeys,
  isRecall,
  isAlt,
  isDown_B,
  isDown_E,
  isDown_F,
  isDown_P,
  isDown_U,
  isSave
} from '@/mystore/modules/keyboard/keyboard.getters';
import { getTileByPoint, getTileRange, getPrefabByPoint, getPrefabRange, getCurrentPrefabData, getCurrentTileData } from '@/mystore/modules/map/map.getters';
import { currentLayerIsDisplayed } from '@/mystore/modules/currentItem/item.getters';
import { getAllCollectTile, getCollectTileByKey } from '@/mystore/modules/collect/collect.getters';

export function createGetter(state: IState) {
  return {
    selectKeys: selectKeys(state),
    selectPressedKeys: selectPressedKeys(state),
    isRecall: isRecall(state),
    isAlt: isAlt(state),
    isDown_B: isDown_B(state),
    isDown_E: isDown_E(state),
    isDown_F: isDown_F(state),
    isDown_P: isDown_P(state),
    isDown_U: isDown_U(state),
    isSave: isSave(state),
    //
    getTileRange: getTileRange(state),
    getTileByPoint: getTileByPoint(state),
    getPrefabByPoint: getPrefabByPoint(state),
    getPrefabRange: getPrefabRange(state),
    getCurrentPrefabData: getCurrentPrefabData(state),
    getCurrentTileData: getCurrentTileData(state),
    //
    currentLayerIsDisplayed: currentLayerIsDisplayed(state),
    //
    getAllCollectTile: getAllCollectTile(state),
    getCollectTileByKey: getCollectTileByKey(state)
  };
}
