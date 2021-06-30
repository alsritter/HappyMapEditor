import { MutationTree } from 'vuex';
import { MutationTypes } from './canvas.mutation-types';
import { CanvasStateTypes, CanvasMutationsTypes } from '@/store/interfaces';

const mutations: MutationTree<CanvasStateTypes> & CanvasMutationsTypes = {
  [MutationTypes.UPDATE_SIZE]: (state, nSize) => {
    const mutState = state;
    mutState.canvasSize.size = nSize;
  },
  [MutationTypes.UPDATE_POINT]: (state, points) => {
    const mutState = state;
    mutState.initPoint = points;
  }
};

export default mutations;
