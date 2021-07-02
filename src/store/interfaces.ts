import { ActionContext, DispatchOptions } from 'vuex';
import { Dictionary } from 'typescript-collections';

import { MutationTypes as RootMTypes } from '@/store/modules/root/root.mutation-types';
import { MutationTypes as KeyboardM1Types } from '@/store/modules/keyboard/keyboard.mutation-types';
import { MutationTypes as CanvasM1Types } from '@/store/modules/canvas/canvas.mutation-types';
import { MutationTypes as MapM1Types } from '@/store/modules/map/map.mutation-types';

import { ActionTypes as RootATypes } from '@/store/modules/root/root.action-types';
import { ActionTypes as KeyboardA1Types } from '@/store/modules/keyboard/keyboard.action-types';
import { ActionTypes as CanvasA1Types } from '@/store/modules/canvas/canvas.action-types';
import { ActionTypes as MapA1Types } from '@/store/modules/map/map.action-types';

import { Point } from '@/store/modules/canvas/canvas.types';
import { DisplayLayer, Tile, Prefab, Block } from '@/store/modules/map/map.types';

import canvasState from '@/store/modules/canvas/canvas.state';
import keyState from '@/store/modules/keyboard/keyboard.state';
import mapState from '@/store/modules/map/map.state';

// 每次添加一个 Module 需要修改的文件：
// store/interfaces、root/index、store/action-types、store/mutation-types、store/index
/*********************** Global configuration ***********************/

export interface StoreActions extends RootActionsTypes, CanvasActionsTypes, KeyActionsTypes, MapActionsTypes {}
export interface StoreGetters extends IRootGettersTypes, KeyGettersTypes, KeyGettersTypes, MapGettersTypes {}

export interface IRootState {
  root: boolean;
  version: string;
}

export interface IMergedState extends IRootState {
  keyboardModule: KeyStateTypes;
  canvasModule: CanvasStateTypes;
  mapModule: MapStateTypes;
}

export interface IRootGettersTypes {
  getVersion(state: IRootState): string;
}

export type RootMutationsTypes<S = IRootState> = {
  [RootMTypes.UPDATE_VERSION](state: S, payload: string): void;
};

/**
 * probably this can be moved inside individual module
 * as counterTypes.ts and then can be imported here
 */
type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutationsTypes>(key: K, payload: Parameters<RootMutationsTypes[K]>[1]): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, 'commit'> & {
    dispatch<K extends keyof StoreActions>(key: K, payload?: Parameters<StoreActions[K]>[1], options?: DispatchOptions): ReturnType<StoreActions[K]>;
  };

export interface RootActionsTypes {
  [RootATypes.UPDATE_VERSION]({ commit }: AugmentedActionContextRoot, payload: string): void;
  [RootATypes.COUNTER_CHECK]({ dispatch }: AugmentedActionContextRoot, payload: boolean): void;
}

/*********************** Canvas MODULE TYPES  ***********************/

export type CanvasStateTypes = typeof canvasState;

export type CanvasGettersTypes = {
  status(state: CanvasStateTypes): CanvasStateTypes;
  getSize(state: CanvasStateTypes): number;
  getPoint(state: CanvasStateTypes): Point;
};

export type CanvasMutationsTypes<S = CanvasStateTypes> = {
  [CanvasM1Types.CANVAS_UPDATE_SIZE](state: S, nSize: number): void;
  [CanvasM1Types.CANVAS_UPDATE_POINT](state: S, point: Point): void;
};

type CanvasAugmentedActionContext = {
  commit<K extends keyof CanvasMutationsTypes>(key: K, payload: Parameters<CanvasMutationsTypes[K]>[1]): ReturnType<CanvasMutationsTypes[K]>;
} & Omit<ActionContext<CanvasStateTypes, IRootState>, 'commit'>;

export interface CanvasActionsTypes {
  [CanvasA1Types.CANVAS_UPDATE_POINT]({ commit }: CanvasAugmentedActionContext, point: Point): Promise<void>;
  [CanvasA1Types.CANVAS_UPDATE_SIZE]({ commit }: CanvasAugmentedActionContext, nSize: number): Promise<void>;
}

/*********************** Keyboard MODULE TYPES  ***********************/
interface SimpleKeyValueObject {
  [key: string]: boolean;
}

export type KeyStateTypes = typeof keyState;

export type KeyGettersTypes = {
  //status(state: any): any;
  selectKeys(state: KeyStateTypes): SimpleKeyValueObject;
  // 取得全部按下的键名
  selectPressedKeys(state: KeyStateTypes): string[];
  // 是否撤回
  isRecall(state: KeyStateTypes): boolean;
  // 是否 Alt
  isAlt(state: KeyStateTypes): boolean;
};

/**
 * 需要指定一下这个 mutations 的接口
 */
export type KeyMutationsTypes<S = KeyStateTypes> = {
  [KeyboardM1Types.KEYBOARD_KEY_DOWN](state: S, key: string): void;
  [KeyboardM1Types.KEYBOARD_KEY_UP](state: S, key: string): void;
  [KeyboardM1Types.KEYBOARD_REFRESH](state: S): void;
};

type KeyAugmentedActionContext = {
  commit<K extends keyof KeyMutationsTypes>(key: K, payload: Parameters<KeyMutationsTypes[K]>[1]): ReturnType<KeyMutationsTypes[K]>;
} & Omit<ActionContext<KeyStateTypes, IRootState>, 'commit'>;

export interface KeyActionsTypes {
  [KeyboardA1Types.KEYBOARD_KEY_DOWN]({ commit }: KeyAugmentedActionContext, code: string): Promise<void>;
  [KeyboardA1Types.KEYBOARD_KEY_UP]({ commit }: KeyAugmentedActionContext, code: string): Promise<void>;
  [KeyboardA1Types.KEYBOARD_REFRESH]({ commit }: KeyAugmentedActionContext): Promise<void>;
}

/*********************** MapData MODULE TYPES  ***********************/
export type MapStateTypes = typeof mapState;

export type MapGettersTypes = {
  /**
   * 根据坐标位置取得对应的 Block
   * 这种闭包的写法使用方式：https://github.com/vuejs/vuex/issues/456
   * 使用例 store.getters['map/getBlock'](1, 2)
   *
   * @param x 当前位置
   * @param y 当前位置
   * @param layer 要取的图层
   */
  getBlockByCoordinate(state: MapStateTypes): (x: number, y: number, layer: DisplayLayer) => Block | undefined;

  /**
   * 获取全部块
   * @param layer 要取的图层
   */
  getAllBlock(state: MapStateTypes): (layer: DisplayLayer) => Block[];

  /**
   * 根据当前坐标取得当前位置上的 Tile 或者预制件
   *
   * @param x 当前位置
   * @param y 当前位置
   * @param layer 要取的图层
   */
  getTileOrPrefabByCoordinate(state: MapStateTypes): (x: number, y: number, layer: DisplayLayer) => Tile | Prefab | undefined;

  /**
   * 取得道具列表
   */
  getItems(state: MapStateTypes): Dictionary<number, Tile | Prefab>;
};

export type MapMutationsTypes<S = MapStateTypes> = {
  /**
   * 在画布上画点
   * @param x 插入的位置
   * @param y 插入的位置
   * @param data 插入的数据
   * @param layer 要修改的层
   */
  [MapM1Types.MAP_CHANGE_POINT](
    state: S,
    payload: {
      x: number;
      y: number;
      data: Tile | Prefab;
    }
  ): void;
};

type MapAugmentedActionContext = {
  commit<K extends keyof MapMutationsTypes>(key: K, payload: Parameters<MapMutationsTypes[K]>[1]): ReturnType<MapMutationsTypes[K]>;
} & Omit<ActionContext<MapStateTypes, IRootState>, 'commit'>;

export interface MapActionsTypes {
  [MapA1Types.MAP_CHANGE_POINT](
    { commit }: MapAugmentedActionContext,
    payload: {
      x: number;
      y: number;
      data: Tile | Prefab;
    }
  ): Promise<void>;
}
