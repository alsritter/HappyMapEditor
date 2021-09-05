import { reactive } from 'vue';
import Constants from '@/core/util/Constants';
import { Layer, ItemType } from '@/mystore/types';
// modules
import { ICanvasState } from '@/mystore/modules/canvas/canvas.state';
import { IKeyboradState, prepareKeys } from '@/mystore/modules/keyboard/keyboard.state';
import { IMapState, initBlocks, initItem } from '@/mystore/modules/map/map.state';
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
  //
  keys: prepareKeys(),
  //
  blocks: initBlocks(),
  items: initItem(),
  //
  tile: {
    path: '',
    name: '',
    desc: '',
    index: 0
  },
  prefab: {
    path: '',
    name: '',
    desc: '',
    width: 0,
    height: 0,
    index: 0
  },
  itemType: ItemType.TILE,
  currentLayer: Layer.FRONT
};

export function createState() {
  return reactive(State);
}
