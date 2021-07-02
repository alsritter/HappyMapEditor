import { MapGettersTypes, MapStateTypes, IRootState } from '@/store/interfaces';
import { coordinateToBlockCoordinate } from '@/core/util/graph/canvasPoint';
import Constants from '@/core/util/Constants';
import { DisplayLayer } from './map.types';
import { GetterTree } from 'vuex';

const getters: GetterTree<MapStateTypes, IRootState> & MapGettersTypes = {
  getBlockByCoordinate: (state: MapStateTypes) => (x: number, y: number, layer: DisplayLayer) => {
    const dictionary = state.blocks[layer];
    const size = Constants.BLOCK_SIZE;
    const tmpx = x - (x % size);
    const tmpy = y - (y % size);
    // console.log(tmpx + '-' + tmpy);

    // // 这里返回测试数据
    // return {
    //   x: tmpx,
    //   y: tmpy,
    //   size: 2,
    //   data: [[]]
    // };
    return dictionary.getValue(tmpx + '-' + tmpy);
  },

  getAllBlock: (state: MapStateTypes) => (layer: DisplayLayer) => {
    return state.blocks[layer].values();
  },

  getItems: (state: MapStateTypes) => {
    return state.items;
  },

  getTileOrPrefabByCoordinate: (state: MapStateTypes) => (x: number, y: number, layer: DisplayLayer) => {
    const dictionary = state.blocks[layer];
    const size = Constants.BLOCK_SIZE;
    const rx = x % size;
    const ry = y % size;
    const point = coordinateToBlockCoordinate(size, x, y);
    const block = dictionary.getValue(point.x + '-' + point.y);
    if (block == undefined || block == null) return undefined;

    const map = block.data;
    if (!Array.isArray(map) || map.length < ry || map[ry].length < rx || map[ry][rx] == -1) return undefined;

    return state.items.getValue(map[ry][rx]);

    // return {
    //   displayModel: layer,
    //   // 通过 id 去另一个存储图片的 State 查找图片
    //   tileSpriteId: 0,
    //   color: '#ffc107',
    //   effectKeys: [],
    //   tags: []
    // };
  }
};

export default getters;
