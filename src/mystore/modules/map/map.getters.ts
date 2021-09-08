import { IMapState } from './map.state';
import { Point, PrefabYPoint, PrefabXPoint } from '@/mystore/types';
import { binarySearch, binarySearchByPrefabY, binarySearchByPrefabX } from '@/core/util/arithmetic';

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
 * 根据点取得 Prefab
 */
export function getPrefabByPoint(state: IMapState) {
  return (point: Point) => {
    const yRange = binarySearchByPrefabY([...state.mapPrefabs.keys()], point.y - 5, point.y + 5);
    // 找到具体的的 value
    let xStore = undefined;
    for (const value of yRange) {
      if (value.y <= point.y && value.y + value.width > point.y) {
        xStore = state.mapPrefabs.get(value);
        break;
      }
    }

    if (xStore == undefined) return undefined;
    const xRange = binarySearchByPrefabX([...xStore.keys()], point.x - 5, point.x + 5);
    for (const value of xRange) {
      if (value.x <= point.x && value.x + value.height > point.x) {
        return xStore.get(value);
      }
    }

    return undefined;
  };
}

export function getAllPrefab(state: IMapState) {
  return () => {
    // 先取得 yKey 的范围
    const yRange = [...state.mapPrefabs.keys()];
    const res = [];
    for (let i = 0; i < yRange.length; i++) {
      const xStore = state.mapPrefabs.get(yRange[i]);
      if (xStore == undefined) continue;
      const xRange = [...xStore.keys()];
      for (let j = 0; j < xRange.length; j++) {
        res.push(xStore.get(xRange[j]));
      }
    }
    return res;
  };
}
