import { IItemState } from './item.state';
import { ItemType, ICurrentTile, ICurrentPrefab } from '@/mystore/types';

export function currentTileModify(state: IItemState) {
  return (tile: ICurrentTile) => {
    state.tile = tile;
    // 修改模式
    state.itemType = ItemType.TILE;
  };
}

export function currentPrefabModify(state: IItemState) {
  return (prefab: ICurrentPrefab) => {
    state.prefab = prefab;

    state.itemType = ItemType.PREFAB;
  };
}
