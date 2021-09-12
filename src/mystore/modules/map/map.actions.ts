import { IMapState } from './map.state';
import { Point, Tile, TileData, PrefabData, Prefab, Block } from '@/mystore/types';
import { IState } from '@/mystore/state';
import { getPrefabRange, getBlockByPoint } from './map.getters';
import TreeMap from 'ts-treemap';
import { canvasBlockPoint } from '@/core/util/graph';
import Constants from '@/core/util/Constants';

/**
 * 添加 Tile
 * @returns tile
 */
export function mapAddTile(state: IState) {
  return (point: Point) => {
    // 先检查是否存在这个 Tile
    const cacheData = state.tileInstancesCache.get(state.tile.index);
    if (!state.mapTiles.has(point.y)) {
      state.mapTiles.set(point.y, new TreeMap<number, Tile>((a: number, b: number) => a - b));
    }
    const xStore = state.mapTiles.get(point.y);
    let tile;
    if (cacheData == undefined) {
      const tileData = new TileData(state.tile.index, state.tile.image);
      // 先插入缓存
      state.tileInstancesCache.set(state.tile.index, tileData);
      tile = new Tile(point, state.currentLayer, tileData);
      xStore?.set(point.x, tile);
    } else {
      tile = new Tile(point, state.currentLayer, cacheData);
      xStore?.set(point.x, tile);
    }
    return tile;
  };
}

/**
 * 添加一块区域
 * @returns TileData
 */
export function mapAddAreaTile(state: IState) {
  return (start: Point, end: Point) => {
    let tile;
    let maxPosX: number;
    let minPosX: number;
    let maxPosY: number;
    let minPosY: number;

    if (start.x > end.x) {
      maxPosX = start.x;
      minPosX = end.x;
    } else {
      maxPosX = end.x;
      minPosX = start.x;
    }

    if (start.y > end.y) {
      maxPosY = start.y;
      minPosY = end.y;
    } else {
      maxPosY = end.y;
      minPosY = start.y;
    }

    // 将当前选中的格子存储起来
    for (let i = minPosX; i <= maxPosX; i++) {
      for (let j = minPosY; j <= maxPosY; j++) {
        tile = mapAddTile(state)({ x: i, y: j });
      }
    }

    return tile?.data;
  };
}

/**
 * 删除指定位置的 Tile
 */
export function mapDeleteTile(state: IMapState) {
  return (point: Point) => {
    if (!state.mapTiles.has(point.y)) {
      return;
    }
    const xStore = state.mapTiles.get(point.y);
    if (xStore?.size == 0) {
      state.mapTiles.delete(point.y);
      return;
    }
    xStore?.delete(point.x);
  };
}

/**
 * 删除这块区域
 */
export function mapDeleteAreaTile(state: IState) {
  return (start: Point, end: Point) => {
    let maxPosX: number;
    let minPosX: number;
    let maxPosY: number;
    let minPosY: number;

    if (start.x > end.x) {
      maxPosX = start.x;
      minPosX = end.x;
    } else {
      maxPosX = end.x;
      minPosX = start.x;
    }

    if (start.y > end.y) {
      maxPosY = start.y;
      minPosY = end.y;
    } else {
      maxPosY = end.y;
      minPosY = start.y;
    }
    for (let i = minPosX; i <= maxPosX; i++) {
      for (let j = minPosY; j <= maxPosY; j++) {
        mapDeleteTile(state)({ x: i, y: j });
      }
    }
  };
}

/**
 * 需要丢入三个 Map 中
 * 1、mapBlocks
 * 2、blockInPrefabCount 存储 Block 内 Prefab 的索引（因为可能有多个所以是个数组）
 * 3、prefabInstances 真实存 Prefab 的位置
 */
export function mapAddPrefab(state: IState) {
  return (point: Point) => {
    const width = state.prefab.width;
    const height = state.prefab.height;

    const range = getPrefabRange(state)({ x: point.x, y: point.y }, { x: point.x + width, y: point.y + height });

    console.log(range);

    if (range != undefined && range.length > 0) return;

    console.log('开始');

    // 生成随机 key（需要避免生成重复的）
    let prefabKey = Math.ceil(Math.random() * 10000);
    while (state.prefabInstances.has(prefabKey)) {
      prefabKey = Math.ceil(Math.random() * 10000);
    }

    let prefab;

    // 插入到 prefabInstances 中
    const cacheData = state.prefabInstancesCache.get(state.prefab.index);
    if (cacheData == undefined) {
      const prefabData = new PrefabData(state.prefab.index, state.prefab.width, state.prefab.height, state.prefab.image);
      // 先插入缓存
      state.prefabInstancesCache.set(state.prefab.index, prefabData);
      prefab = new Prefab(point, prefabData);
      state.prefabInstances.set(prefabKey, prefab);
    } else {
      prefab = new Prefab(point, cacheData);
      state.prefabInstances.set(prefabKey, prefab);
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const subPoint = { x: point.x + i, y: point.y + j };
        let block = getBlockByPoint(state)(subPoint);
        const blockPoint = canvasBlockPoint.coordinateToBlockEndCoordinate(subPoint.x, subPoint.y);

        // 如果不存在 block 则需要创建
        if (!block) {
          // 创建一个初始为 -1 的数组
          const blockData = [];
          for (let z = 0; z < Constants.BLOCK_SIZE; z++) {
            const tmpArr = [];
            for (let t = 0; t < Constants.BLOCK_SIZE; t++) {
              tmpArr.push(-1);
            }
            blockData.push(tmpArr);
          }
          const nBlock = new Block(blockPoint.x, blockPoint.y, blockData);

          let xStore = state.mapBlocks.get(blockPoint.y);
          if (!xStore) {
            state.mapBlocks.set(blockPoint.y, new TreeMap<number, Block>((a: number, b: number) => a - b));
            xStore = state.mapBlocks.get(blockPoint.y);
          }

          xStore?.set(blockPoint.x, nBlock);
          block = nBlock;
        }
        // 插入到指定位置(内部坐标)
        const inPoint = canvasBlockPoint.coordinateToBlockCoordinate(subPoint.x, subPoint.y);
        block.data[inPoint.x][inPoint.y] = prefabKey;

        // 再把它丢进 blockInPrefabCount
        addKeyToBlockInPrefabCount(state, prefabKey, blockPoint);
      }
    }

    return prefab;
  };
}

/**
 * 把数据插入 blockInPrefabCount
 *
 * @param state
 * @param key prefab 的 key
 * @param blockPoint
 */
function addKeyToBlockInPrefabCount(state: IMapState, key: number, blockPoint: Point) {
  let xStore = state.blockInPrefabCount.get(blockPoint.y);
  if (!xStore) {
    state.blockInPrefabCount.set(blockPoint.y, new TreeMap<number, Set<number>>((a: number, b: number) => a - b));
    xStore = state.blockInPrefabCount.get(blockPoint.y);
  }
  let array = xStore!.get(blockPoint.x);
  if (array == undefined) {
    array = new Set<number>();
  }
  array.add(key);
  xStore!.set(blockPoint.x, array);
}

/**
 * 删除指定位置的 Prefab
 */
export function mapDeletePrefab(state: IMapState) {
  return (point: Point) => {
    // const pre = getPrefabByPoint(state)(point);
    // if (!pre) return;
    // // 存在则替换 point 为标准的 point
    // point = pre.point;
    // const ypoint = new PrefabYPoint(point.y, 0);
    // if (!state.mapPrefabs.has(ypoint)) {
    //   return;
    // }
    // const xStore = state.mapPrefabs.get(ypoint);
    // if (xStore?.size == 0) {
    //   state.mapPrefabs.delete(ypoint);
    //   return;
    // }
    // const xpoint = new PrefabXPoint(point.x, 0);
    // xStore?.delete(xpoint);
  };
}
