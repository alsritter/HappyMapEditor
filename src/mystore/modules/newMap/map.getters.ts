import { IMapState } from './map.state';
import { Point } from '@/mystore/types';

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
    const yRange = binarySearch([...state.mapTiles.keys()], start.y, end.y);
    const res = [];
    for (let i = 0; i < yRange.length; i++) {
      const xStore = state.mapTiles.get(yRange[i]);
      if (xStore == undefined) continue;
      const xRange = binarySearch([...xStore.keys()], start.x, end.x);
      for (let j = 0; j < xRange.length; j++) {
        res.push(xStore.get(xRange[j]));
      }
    }

    return res;
  };
}

/**
 * 用于二分查找一个范围
 */
function binarySearch(array: number[], min: number, max: number) {
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

  return array.slice(minIndex, maxIndex);
}
