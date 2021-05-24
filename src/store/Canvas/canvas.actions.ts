import { ActionTree, ActionContext } from 'vuex';
import { CanvasState } from './canvas.state';
import { CanvasMutations, CanvasMutationsTypes, Point } from './canvas.mutations';

type CanvasAugmentedActionContext = {
  commit<K extends keyof CanvasMutations>(key: K, payload: Parameters<CanvasMutations[K]>[1]): ReturnType<CanvasMutations[K]>;
} & Omit<ActionContext<CanvasState, CanvasState>, 'commit'>;

export interface CanvasActions {
  [CanvasMutationsTypes.UPDATE_POINT]({ commit }: CanvasAugmentedActionContext, point: Point): Promise<void>;
  [CanvasMutationsTypes.UPDATE_SIZE]({ commit }: CanvasAugmentedActionContext, nSize: number): Promise<void>;
}

const actions: ActionTree<CanvasState, CanvasState> & CanvasActions = {
  [CanvasMutationsTypes.UPDATE_SIZE]: async ({ commit }, nSize: number): Promise<void> => {
    commit(CanvasMutationsTypes.UPDATE_SIZE, nSize);
  },
  [CanvasMutationsTypes.UPDATE_POINT]: async ({ commit }, point: Point): Promise<void> => {
    commit(CanvasMutationsTypes.UPDATE_POINT, point);
  }
};

export default actions;
