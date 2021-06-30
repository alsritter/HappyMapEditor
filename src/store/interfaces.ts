import { ActionContext, DispatchOptions } from 'vuex';
import { ActionTypes as KeyboardA1Types } from '@/store/modules/keyboard/keyboard.action-types';
import { MutationTypes as KeyboardM1Types } from '@/store/modules/keyboard/keyboard.mutation-types';
import { MutationTypes as CanvasM1Types } from '@/store/modules/canvas/canvas.mutation-types';
import { ActionTypes as CanvasA1Types } from '@/store/modules/canvas/canvas.action-types';
import { MutationTypes as RootMTypes } from '@/store/modules/root/root.mutation-types';
import { ActionTypes as RootATypes } from '@/store/modules/root/root.action-types';
import canvasState from '@/store/modules/canvas/canvas.state';
import keyState from '@/store/modules/keyboard/keyboard.state';

export interface IRootState {
  root: boolean;
  version: string;
}

export interface IMergedState extends IRootState {
  keyboardModule: KeyStateTypes;
  canvasModule: CanvasStateTypes;
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
export type Point = {
  x: number;
  y: number;
};

export type CanvasStateTypes = typeof canvasState;

export type CanvasGettersTypes = {
  status(state: CanvasStateTypes): CanvasStateTypes;
  getSize(state: CanvasStateTypes): number;
  getPoint(state: CanvasStateTypes): Point;
};

export type CanvasMutationsTypes<S = CanvasStateTypes> = {
  [CanvasM1Types.UPDATE_SIZE](state: S, nSize: number): void;
  [CanvasM1Types.UPDATE_POINT](state: S, point: Point): void;
};

type CanvasAugmentedActionContext = {
  commit<K extends keyof CanvasMutationsTypes>(key: K, payload: Parameters<CanvasMutationsTypes[K]>[1]): ReturnType<CanvasMutationsTypes[K]>;
} & Omit<ActionContext<CanvasStateTypes, IRootState>, 'commit'>;

export interface CanvasActionsTypes {
  [CanvasA1Types.UPDATE_POINT]({ commit }: CanvasAugmentedActionContext, point: Point): Promise<void>;
  [CanvasA1Types.UPDATE_SIZE]({ commit }: CanvasAugmentedActionContext, nSize: number): Promise<void>;
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
  [KeyboardM1Types.KEY_DOWN](state: S, key: string): void;
  [KeyboardM1Types.KEY_UP](state: S, key: string): void;
  [KeyboardM1Types.REFRESH](state: S): void;
};

type KeyAugmentedActionContext = {
  commit<K extends keyof KeyMutationsTypes>(key: K, payload: Parameters<KeyMutationsTypes[K]>[1]): ReturnType<KeyMutationsTypes[K]>;
} & Omit<ActionContext<KeyStateTypes, IRootState>, 'commit'>;

export interface KeyActionsTypes {
  [KeyboardA1Types.KEY_DOWN]({ commit }: KeyAugmentedActionContext, code: number): Promise<void>;
  [KeyboardA1Types.KEY_UP]({ commit }: KeyAugmentedActionContext, code: number): Promise<void>;
  [KeyboardA1Types.REFRESH]({ commit }: KeyAugmentedActionContext): Promise<void>;
}

export interface StoreActions extends RootActionsTypes, CanvasActionsTypes, KeyActionsTypes {}
export interface StoreGetters extends IRootGettersTypes, KeyGettersTypes, KeyGettersTypes {}
