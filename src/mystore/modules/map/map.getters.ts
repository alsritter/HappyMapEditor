import { IMapState } from './map.state';
import { Point, Tile, TileData } from '@/mystore/types';
import { IState } from '@/mystore/state';

/**
 * 根据点取得 Tile
 */
export function getTileByPoint(state: IMapState) {
  return (point: Point) => {
    const xStore = state.mapTiles.get(point.y);
    if (xStore == undefined) {
      return null;
    }

    return xStore.get(point.x);
  };
}

/**
 * 取得一个范围的 Tile
 */
export function getTileRange(state: IMapState) {
  return (start: Point, end: Point) => {
    // 先取得 yKey 的范围
    const yarr = [...state.mapTiles.keys()];
    const yRange = yarr.length > 5 ? binarySearch(yarr, start.y, end.y) : yarr;
    const res = [];
    for (let i = 0; i < yRange.length; i++) {
      const xStore = state.mapTiles.get(yRange[i]);
      if (xStore == undefined) continue;
      const xarr = [...xStore.keys()];
      const xRange = xarr.length > 5 ? binarySearch(xarr, start.x, end.x) : xarr;
      for (let j = 0; j < xRange.length; j++) {
        res.push(xStore.get(xRange[j]));
      }
    }
    // console.log('最终结果', res);
    return res;
  };
}

/**
 * 构建一个 Tile
 */
export function buildTile(state: IState) {
  return (point: Point) => {
    return new Tile(point, state.currentLayer, new TileData(state.tile.path, state.tile.index));
  };
}

/**
 * 用于二分查找一个范围
 */
function binarySearch(array: number[], min: number, max: number) {
  if (max < min) {
    const temp = max;
    max = min;
    min = temp;
  }

  if (array[array.length - 1] < max && array[0] > min) {
    return array;
  }

  // console.log('原始：', array, min, max);
  const result: number[] = [];
  if (min >= array.length || min >= max) return result;

  let mid = 0;
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    mid = Math.floor((end - start) / 2 + start);
    // 说明在左边
    if (min < array[mid]) {
      end = mid - 1;
    }
    // 说明在右边
    else if (min > array[mid]) {
      start = mid + 1;
    } else {
      break;
    }
  }
  // 此时 mid 就是大于或等于 min 的值
  const minIndex = mid;
  let maxIndex = array.length;

  if (max <= array[array.length - 1]) {
    end = array.length - 1;
    start = 0;
    while (start <= end) {
      mid = Math.floor((end - start) / 2 + start);
      // 说明在左边
      if (max < array[mid]) {
        end = mid - 1;
      }
      // 说明在右边
      else if (max > array[mid]) {
        start = mid + 1;
      } else {
        break;
      }
    }
    // 此时 mid 就是小于 max 的最大值
    maxIndex = mid;
  }
  // const tarr = array.slice(minIndex, maxIndex);
  // console.log('截取后：', tarr, minIndex, maxIndex);
  return array.slice(minIndex, maxIndex);
}
