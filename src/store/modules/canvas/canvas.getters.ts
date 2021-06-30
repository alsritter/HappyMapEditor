import { GetterTree } from 'vuex';
import { CanvasStateTypes, IRootState, CanvasGettersTypes } from '@/store/interfaces';

const getters: GetterTree<CanvasStateTypes, IRootState> & CanvasGettersTypes = {
  status: (state) => state,
  getSize: (state) => state.canvasSize.size,
  getPoint: (state) => state.initPoint
};

export default getters;
