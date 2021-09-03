import { coordinateToBlockCoordinate } from '@/core/util/graph/canvas-point';
import Constants from '@/core/util/Constants';
import { DisplayLayer, IMapState } from './map.state';

/**
 * 根据坐标位置取得对应的 Block
 *
 * @param x 当前位置
 * @param y 当前位置
 * @param layer 要取的图层
 */
export function getBlockByCoordinate(state: IMapState) {
  return (x: number, y: number, layer: DisplayLayer) => {
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
  };
}

/**
 * 获取全部块
 * @param layer 要取的图层
 */
export function getAllBlock(state: IMapState) {
  return (layer: DisplayLayer) => {
    return state.blocks[layer].values();
  };
}

/**
 * 取得道具列表
 */
export function getItems(state: IMapState) {
  return () => {
    return state.items;
  };
}

/**
 * 根据当前坐标取得当前位置上的 Tile 或者预制件
 *
 * @param x 当前位置
 * @param y 当前位置
 * @param layer 要取的图层
 */
export function getTileOrPrefabByCoordinate(state: IMapState) {
  return (x: number, y: number, layer: DisplayLayer) => {
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
  };
}
