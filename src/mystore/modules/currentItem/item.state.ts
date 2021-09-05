import { ICurrentTile, ICurrentPrefab, ItemType } from '@/mystore/types';

/**
 * 当前选中的 Tile
 */
export interface IItemState {
  tile: ICurrentTile;
  prefab: ICurrentPrefab;
  itemType: ItemType;
}
