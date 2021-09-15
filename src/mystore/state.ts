import { reactive } from 'vue';
import Constants from '@/core/util/Constants';
import { Layer, ItemType, TileData, ToolType, PrefabData, Prefab, DisplayLayers, PrefabToolType, Background } from '@/mystore/types';
// modules
import { ICanvasState } from '@/mystore/modules/canvas/canvas.state';
import { IKeyboradState, prepareKeys } from '@/mystore/modules/keyboard/keyboard.state';
import { IMapState, initTileMap, initBlockMap, initPrefabCountMap } from '@/mystore/modules/map/map.state';
import { IItemState } from '@/mystore/modules/currentItem/item.state';
import { ICollectState } from './modules/collect/collect.state';
import { IBackgroundState } from './modules/background/bg.state';

/**
 * 用于传递各个模块的状态接口
 */
export interface IState extends ICanvasState, IKeyboradState, IMapState, IItemState, ICollectState, IBackgroundState {}

export const State: IState = {
  canvasSize: Constants.DEFAULT_SIZE,
  initPoint: {
    x: Constants.CANVAS_WIDTH / 2,
    y: Constants.CANVAS_HEIGHT / 2
  },
  dragging: false,
  showGrid: true,
  showAxis: true,
  //
  keys: prepareKeys(),
  //
  mapTiles: initTileMap(),
  blockInPrefabCount: initPrefabCountMap(),
  mapBlocks: initBlockMap(),
  prefabInstancesCache: new Map<string, PrefabData>(),
  prefabInstances: new Map<number, Prefab>(),
  currentTileInstancesCache: new Map<string, TileData>(),
  //
  tile: {
    isCollect: false,
    path: '',
    name: '',
    desc: '',
    key: '',
    spriteId: '',
    image: null
  },
  prefab: {
    path: '',
    name: '',
    desc: '',
    width: 0,
    height: 0,
    prefabId: '',
    image: null
  },
  itemType: ItemType.TILE,
  currentLayer: Layer.MIDDLE,
  currentTool: ToolType.PEN,
  displayLayers: new DisplayLayers(),
  currentPrefabTool: PrefabToolType.DRAW,
  //
  tileInstancesCache: new Map<string, TileData>(),
  //
  currentBackground: new Background('', '')
};

export function createState() {
  return reactive(State);
}
