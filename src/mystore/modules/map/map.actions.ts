import { IMapState } from './map.state';
import { Tile, Prefab } from '@/mystore/types';
import Constants from '@/core/util/Constants';
import { coordinateToBlockEndCoordinate, coordinateToBlockCoordinate } from '@/core/util/graph/canvas-point';

export function mapModifyPoint(state: IMapState) {
  return (payload: { x: number; y: number; data: Tile | Prefab }) => {
    // 类型检查，这个参数只有 Tile 才有
    if ('tileSpriteId' in payload.data) {
      const tile = payload.data;
      const dictionary = state.blocks[tile.displayModel];
      const x = payload.x;
      const y = payload.y;
      const size = Constants.BLOCK_SIZE;

      const endPoint = coordinateToBlockEndCoordinate(size, x, y);

      // console.log('x-y', x, y);
      // console.log('rx-ry', rx, ry);
      // console.log(endPoint.x + '-' + endPoint.y);

      let block = dictionary.getValue(endPoint.x + '-' + endPoint.y);

      // 如果不存在则需要创建一个
      if (typeof block === 'undefined') {
        const tmpData = Array.from(Array(size), () => {
          const arr = new Array(size);
          arr.fill(-1);
          return arr;
        });

        const tmpBlock = {
          x: endPoint.x,
          y: endPoint.y,
          size: size,
          data: tmpData
        };

        dictionary.setValue(endPoint.x + '-' + endPoint.y, tmpBlock);

        block = tmpBlock;
      }

      state.items.setValue(tile.id, tile);
      const map = block.data;
      const inPoint = coordinateToBlockCoordinate(size, x, y);
      map[inPoint.y][inPoint.x] = tile.id;
    }
  };
}
