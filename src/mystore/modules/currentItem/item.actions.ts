import { IItemState } from './item.state';
import bus from '@/core/util/bus';
import { ItemType, ICurrentTile, ICurrentPrefab, ToolType, DisplayLayers, PrefabToolType } from '@/mystore/types';

export function currentTileModify(state: IItemState) {
  return (tile: ICurrentTile) => {
    state.tile = tile;
    state.itemType = ItemType.TILE;
    bus.emit('init');
  };
}

export function currentPrefabModify(state: IItemState) {
  return (prefab: ICurrentPrefab) => {
    state.prefab = prefab;
    state.itemType = ItemType.PREFAB;
    bus.emit('init');
  };
}

export function currentTool(state: IItemState) {
  return (tool: ToolType) => {
    state.currentTool = tool;
    bus.emit('init');
  };
}

export function currentPrefabTool(state: IItemState) {
  return (tool: PrefabToolType) => {
    state.currentPrefabTool = tool;
    bus.emit('init');
  };
}

export function currentDisplayLayer(state: IItemState) {
  return (layer: DisplayLayers) => {
    state.displayLayers = layer;
    bus.emit('refreshCanvas');
  };
}
