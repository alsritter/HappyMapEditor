import { ICurrentTile, ICurrentPrefab, ItemType, ToolType, DisplayLayers, PrefabToolType } from '@/mystore/types';

/**
 * 当前选中的 Tile
 */
export interface IItemState {
  tile: ICurrentTile;
  prefab: ICurrentPrefab;
  itemType: ItemType;
  currentTool: ToolType;
  currentPrefabTool: PrefabToolType;
  displayLayers: DisplayLayers;
}
