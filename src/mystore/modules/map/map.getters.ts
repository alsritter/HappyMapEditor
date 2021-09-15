import { IMapState } from './map.state';
import { Point, PrefabData, TileData } from '@/mystore/types';
import { binarySearch } from '@/core/util/arithmetic';
import { canvasBlockPoint } from '@/core/util/graph';
import { IState } from '@/mystore/state';
import Constants from '@/core/util/Constants';

/**
 * 取得当前的 TileData
 */
export function getCurrentTileData(state: IState) {
  return () => {
    // const data = state.tileInstancesCache.get(state.tile.index);
    // if (!data) return new TileData(state.tile.index, state.tile.image);
    // // 先插入缓存
    // state.tileInstancesCache.set(state.tile.index, data);
    if (!state.tile.image) return;

    // 注意这里使用的是 currentTileInstancesCache 这个专门用来缓存临时 TileData 的 Map
    let tileData;
    if (!state.tile.isCollect) {
      // 生成随机 key（需要避免生成重复的）
      let tk = Math.ceil(Math.random() * 10000);
      while (state.currentTileInstancesCache.has(tk + '')) {
        tk = Math.ceil(Math.random() * 10000);
      }
      const tileKey = tk + '';
      tileData = new TileData(tileKey, state.currentLayer, state.tile.spriteId, state.tile.path, state.tile.image);
      //
      // state.tile.isCollect = true;
      state.tile.key = tileKey;
      state.currentTileInstancesCache.set(tileKey, tileData);
    } else {
      if (!state.tile.key) {
        let tk = Math.ceil(Math.random() * 10000);
        while (state.currentTileInstancesCache.has(tk + '')) {
          tk = Math.ceil(Math.random() * 10000);
        }
        const tileKey = tk + '';
        state.tile.key = tileKey;
      }

      // 检查是否存在这个 Tile
      tileData = state.currentTileInstancesCache.get(state.tile.key);
      if (!tileData) {
        tileData = new TileData(state.tile.key, state.currentLayer, state.tile.spriteId, state.tile.path, state.tile.image);
        state.currentTileInstancesCache.set(state.tile.key, tileData);
      }
    }

    return tileData;
  };
}

/**
 * 根据点取得 Tile
 */
export function getTileByPoint(state: IMapState) {
  return (point: Point) => {
    const xStore = state.mapTiles.get(point.y);
    if (xStore == undefined) {
      return undefined;
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
    return res;
  };
}

/**
 * 根据坐标位置取得对应的 Block
 */
export function getBlockByPoint(state: IState) {
  return (point: Point) => {
    const blockPoint = canvasBlockPoint.coordinateToBlockEndCoordinate(point.x, point.y);
    const xStore = state.mapBlocks.get(blockPoint.y);
    if (xStore == undefined) {
      return null;
    }
    return xStore.get(blockPoint.x);
  };
}

/**
 * 取得一个范围的 Block
 */
export function getBlockRange(state: IMapState) {
  return (start: Point, end: Point) => {
    // 先取得 yKey 的范围
    const yarr = [...state.mapBlocks.keys()];
    // 注意这里取得的 y 是 Block 的终点坐标，所以计算它时需要减去 Block Size
    const yRange = yarr.length > 5 ? binarySearch(yarr, start.y, end.y) : yarr;
    const res = [];
    for (let i = 0; i < yRange.length; i++) {
      const xStore = state.mapBlocks.get(yRange[i]);
      if (xStore == undefined) continue;
      const xarr = [...xStore.keys()];
      const xRange = xarr.length > 5 ? binarySearch(xarr, start.x, end.x) : xarr;
      for (let j = 0; j < xRange.length; j++) {
        res.push(xStore.get(xRange[j]));
      }
    }
    return res;
  };
}

/**
 * 取得当前的 prefabData
 */
export function getCurrentPrefabData(state: IState) {
  return () => {
    const data = state.prefabInstancesCache.get(state.prefab.prefabId);
    if (!data) return new PrefabData(state.prefab.prefabId, state.prefab.width, state.prefab.height, state.prefab.image);
    state.prefabInstancesCache.set(state.prefab.prefabId, data);
    return data;
  };
}

/**
 * 根据点取得 Prefab
 */
export function getPrefabByPoint(state: IState) {
  return (point: Point) => {
    const blockPoint = canvasBlockPoint.coordinateToBlockEndCoordinate(point.x, point.y);
    const xStore = state.mapBlocks.get(blockPoint.y);
    if (xStore == undefined) return undefined;
    const block = xStore.get(blockPoint.x);
    if (block == undefined) return undefined;
    const inPoint = canvasBlockPoint.coordinateToBlockCoordinate(point.x, point.y);
    const index = block.data[inPoint.x][inPoint.y];
    if (index === -1) return undefined;
    return state.prefabInstances.get(index);
  };
}

/**
 * 取得一个范围的 Prefab
 */
export function getPrefabRange(state: IMapState) {
  return (start: Point, end: Point) => {
    if (state.blockInPrefabCount.size == 0) return;
    const low = { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) };
    // y 轴反向了，所以需要加一个 Block 的大小
    const high = { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) + Constants.BLOCK_SIZE };

    const nStart = canvasBlockPoint.coordinateToBlockEndCoordinate(low.x, low.y);
    const nEnd = canvasBlockPoint.coordinateToBlockEndCoordinate(high.x, high.y);
    const yarr = [...state.blockInPrefabCount.keys()];
    let yRange;

    // 如果相等则无需二分查找了
    if (nStart.y == nEnd.y) {
      if (state.blockInPrefabCount.has(nStart.y)) {
        yRange = [nStart.y];
      } else {
        return undefined;
      }
    } else {
      // FIXME: 修复这里精确度的问题
      // 增大一个 Block 的范围
      yRange = binarySearch(yarr, nStart.y, nEnd.y);
    }

    const res = [];

    // 注意这里可能一个 Prefab 存在多个 Block 中，所以创建一个零时 Set 数组避免重复添加
    const tset = new Set<number>();

    // console.log(yRange.length, yarr, nStart.y - Constants.BLOCK_SIZE, nEnd.y + Constants.BLOCK_SIZE);

    for (let i = 0; i < yRange.length; i++) {
      const xStore = state.blockInPrefabCount.get(yRange[i]);
      if (xStore == undefined) continue;
      const xarr = [...xStore.keys()];
      let xRange;
      if (nStart.x == nEnd.x) {
        if (xStore.has(nStart.x)) {
          xRange = [nStart.x];
        } else {
          return undefined;
        }
      } else {
        xRange = binarySearch(xarr, nStart.x, nEnd.x);
      }

      // 直接把 Block 内的 Prefab 直接存入 res 里面
      for (let j = 0; j < xRange.length; j++) {
        const arr = xStore.get(xRange[j]);
        if (arr) {
          for (const key of arr) {
            if (tset.has(key)) continue;
            tset.add(key);
            const prefab = state.prefabInstances.get(key);
            if (!prefab) continue;
            if (
              // 因为 prefab 的坐标实际是 { x: 0, y: height } 所以这里要减去 height
              checkRect(
                { x: prefab.point.x, y: prefab.point.y - prefab.data.height, width: prefab.data.width, height: prefab.data.height },
                { x: low.x, y: low.y, width: high.x - low.x, height: high.y - low.y }
              )
            ) {
              res.push(prefab);
            }
          }
        }
      }
    }
    return res;
  };
}

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * 检查当前矩形与矩形是否相交
 */
function checkRect(a: Rect, b: Rect) {
  const a_min_x = a.x;
  const a_min_y = a.y;
  const a_max_x = a.x + a.width;
  const a_max_y = a.y + a.height;

  const b_min_x = b.x;
  const b_min_y = b.y;
  const b_max_x = b.x + b.width;
  const b_max_y = b.y + b.height;

  return a_min_x <= b_max_x && a_max_x >= b_min_x && a_min_y <= b_max_y && a_max_y >= b_min_y;
}
