import { reactive } from 'vue';
import Constants from '@/core/util/Constants';
import { Layer, ItemType, TileData, ToolType, PrefabData, Prefab, DisplayLayers, PrefabToolType } from '@/mystore/types';
// modules
import { ICanvasState } from '@/mystore/modules/canvas/canvas.state';
import { IKeyboradState, prepareKeys } from '@/mystore/modules/keyboard/keyboard.state';
import { IMapState, initTileMap, initBlockMap, initPrefabCountMap } from '@/mystore/modules/map/map.state';
import { IItemState } from '@/mystore/modules/currentItem/item.state';

/**
 * 用于传递各个模块的状态接口
 */
export interface IState extends ICanvasState, IKeyboradState, IMapState, IItemState {}

export const State: IState = {
  canvasSize: Constants.DEFAULT_SIZE,
  initPoint: {
    x: 0,
    y: 0
  },
  dragging: false,
  showGrid: true,
  showAxis: true,
  //
  keys: prepareKeys(),
  //
  mapTiles: initTileMap(),
  tileInstancesCache: new Map<number, TileData>(),
  blockInPrefabCount: initPrefabCountMap(),
  mapBlocks: initBlockMap(),
  prefabInstancesCache: new Map<number, PrefabData>(),
  prefabInstances: new Map<number, Prefab>(),
  //
  tile: {
    path: '',
    name: '',
    desc: '',
    index: 0,
    image: null
  },
  prefab: {
    path: '',
    name: '',
    desc: '',
    width: 0,
    height: 0,
    index: 0,
    image: null
  },
  itemType: ItemType.TILE,
  currentLayer: Layer.FRONT,
  currentTool: ToolType.PEN,
  displayLayers: new DisplayLayers(),
  currentPrefabTool: PrefabToolType.DRAW
};

export function createState() {
  return reactive(State);
}
