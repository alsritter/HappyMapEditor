import { MapGettersTypes, MapStateTypes, IRootState } from '@/store/interfaces';
import Constants from '@/core/util/Constants';
import { DisplayLayer } from './map.types';
import { GetterTree } from 'vuex';

const getters: GetterTree<MapStateTypes, IRootState> & MapGettersTypes = {
  getBlockByCoordinate: (state: MapStateTypes) => (x: number, y: number, layer: DisplayLayer) => {
    const dictionary = state.blocks[layer];
    const size = Constants.BLOCK_SIZE;
    console.log(x, y);
    console.log(state);
    // return state.blocks['BACKGROUND'][0];
    // 这里返回测试数据
    console.log('sss');
    return {
      x: 10,
      y: 21,
      size: 2,
      data: [[]]
    };
  },

  getAllBlock: (state: MapStateTypes) => (layer: DisplayLayer) => {
    return state.blocks[layer];
  },

  getTileOrPrefabByCoordinate: (state: MapStateTypes) => (x: number, y: number, layer: DisplayLayer) => {
    const dictionary = state.blocks[layer];
    return {
      displayModel: layer,
      // 通过 id 去另一个存储图片的 State 查找图片
      tileSpriteId: 0,
      color: '#ffc107',
      effectKeys: [],
      tags: []
    };
  }
};

export default getters;
