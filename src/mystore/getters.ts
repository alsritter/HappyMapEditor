import { IState } from './state';
import { selectKeys, selectPressedKeys, isRecall, isAlt } from '@/mystore/modules/keyboard/keyboard.getters';
import { getBlockByCoordinate, getAllBlock, getItems, getTileOrPrefabByCoordinate } from '@/mystore/modules/map/map.getters';

export function createGetter(state: IState) {
  return {
    selectKeys: selectKeys(state),
    selectPressedKeys: selectPressedKeys(state),
    isRecall: isRecall(state),
    isAlt: isAlt(state),
    //
    getBlockByCoordinate: getBlockByCoordinate(state),
    getAllBlock: getAllBlock(state),
    getItems: getItems(state),
    getTileOrPrefabByCoordinate: getTileOrPrefabByCoordinate(state)
  };
}
