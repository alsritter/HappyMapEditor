import { IMapState } from './map.state';
import { Point, Tile, TileData, PrefabData, Prefab, Block } from '@/mystore/types';
import { IState } from '@/mystore/state';
import { getPrefabRange, getPrefabByPoint, getBlockByPoint } from './map.getters';
import TreeMap from 'ts-treemap';
import { canvasBlockPoint } from '@/core/util/graph';
import Constants from '@/core/util/Constants';

/**
 * 添加 Tile
 * @returns tile
 */
export function mapAddTile(state: IState) {
  return (point: Point) => {
    if (!state.tile.image) return;

    let tileData;
    if (!state.tile.isCollect) {
      // 生成随机 key（需要避免生成重复的）
      let tk = Math.ceil(Math.random() * 10000);
      while (state.tileInstancesCache.has(tk + '')) {
        tk = Math.ceil(Math.random() * 10000);
      }
      const tileKey = tk + '';

      tileData = new TileData(tileKey, state.currentLayer, state.tile.spriteId, state.tile.path, state.tile.image);
      //
      state.tile.isCollect = true;
      state.tile.key = tileKey;
      state.tileInstancesCache.set(tileKey, tileData);
    } else {
      if (!state.tile.key) {
        let tk = Math.ceil(Math.random() * 10000);
        while (state.tileInstancesCache.has(tk + '')) {
          tk = Math.ceil(Math.random() * 10000);
        }
        const tileKey = tk + '';
        state.tile.key = tileKey;
      }

      // 检查是否存在这个 Tile
      tileData = state.tileInstancesCache.get(state.tile.key);
      if (!tileData) {
        tileData = new TileData(state.tile.key, state.currentLayer, state.tile.spriteId, state.tile.path, state.tile.image);
        state.tileInstancesCache.set(state.tile.key, tileData);
      }
    }

    if (!state.mapTiles.has(point.y)) {
      state.mapTiles.set(point.y, new TreeMap<number, Tile>((a: number, b: number) => a - b));
    }

    const xStore = state.mapTiles.get(point.y);
    const tile = new Tile(point, state.currentLayer, tileData);
    xStore?.set(point.x, tile);
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
    // 注意因为 prefab 的起点是左上角，所以这里要减去 height
    if (checkRect(state, { x: point.x, y: point.y - height }, { x: point.x + width, y: point.y })) return undefined;

    // 生成随机 key（需要避免生成重复的）
    let prefabKey = Math.ceil(Math.random() * 10000);
    while (state.prefabInstances.has(prefabKey)) {
      prefabKey = Math.ceil(Math.random() * 10000);
    }

    let prefab;

    // 插入到 prefabInstances 中
    const cacheData = state.prefabInstancesCache.get(state.prefab.prefabId);
    if (cacheData == undefined) {
      const prefabData = new PrefabData(state.prefab.prefabId, state.prefab.width, state.prefab.height, state.prefab.image);
      // 先插入缓存
      state.prefabInstancesCache.set(state.prefab.prefabId, prefabData);
      prefab = new Prefab(point, prefabData);
      state.prefabInstances.set(prefabKey, prefab);
    } else {
      prefab = new Prefab(point, cacheData);
      state.prefabInstances.set(prefabKey, prefab);
    }

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const subPoint = { x: point.x + i, y: point.y - j };
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
 * 检查 Rect 里面是否存在另一个 Prefab
 *
 * @param start
 * @param end
 * @return 是否存在 prefab
 */
function checkRect(state: IState, start: Point, end: Point) {
  start = { x: Math.min(start.x, end.x), y: Math.min(start.y, end.y) };
  end = { x: Math.max(start.x, end.x), y: Math.max(start.y, end.y) };
  // TODO: 改进 getPrefabRange 后，直接调用 getPrefabRange 来检查
  for (let i = start.x; i < end.x; i++) {
    for (let j = end.y; j > start.y; j--) {
      if (getPrefabByPoint(state)({ x: i, y: j })) return true;
    }
  }
  return false;
}

/**
 * 删除指定位置的 Prefab
 */
export function mapDeletePrefab(state: IState) {
  return (point: Point) => {
    const blockPoint = canvasBlockPoint.coordinateToBlockEndCoordinate(point.x, point.y);
    const xStore = state.mapBlocks.get(blockPoint.y);
    if (xStore == undefined) return undefined;
    const block = xStore.get(blockPoint.x);
    if (block == undefined) return undefined;
    const inPoint = canvasBlockPoint.coordinateToBlockCoordinate(point.x, point.y);
    // 定位 key
    const key = block.data[inPoint.x][inPoint.y];
    if (key === -1) return undefined;
    const prefab = state.prefabInstances.get(key);
    if (prefab) {
      const point = prefab.point;
      const width = prefab.data.width;
      const height = prefab.data.height;
      // 用于缓存当前是否检查过这个 Block
      const cacheMap = new Set<string>();

      for (let i = point.x; i < point.x + width; i++) {
        for (let j = point.y; j < point.y + height; j++) {
          const blockPoint = canvasBlockPoint.coordinateToBlockEndCoordinate(i, j);
          if (cacheMap.has(pointToString(blockPoint))) continue;

          cacheMap.add(pointToString(blockPoint));

          // 清除 blockInPrefabCount 里面的 Prefab
          const xStoreCount = state.blockInPrefabCount.get(blockPoint.y);
          const carr = xStoreCount?.get(blockPoint.x);
          if (carr) {
            carr.delete(key);
            if (carr.size === 0) {
              xStoreCount?.delete(blockPoint.x);
            }
          }

          if (xStoreCount?.size === 0) {
            state.blockInPrefabCount.delete(blockPoint.y);
          }

          const xStore = state.mapBlocks.get(blockPoint.y);
          if (xStore == undefined) continue;
          const block = xStore.get(blockPoint.x);
          if (block == undefined) continue;

          // 先制空 Block
          // 再清空 Block 里面的 key
          for (let r = 0; r < block.data.length; r++) {
            for (let t = 0; t < block.data[0].length; t++) {
              if (block.data[r][t] === key) {
                block.data[r][t] = -1;
              }
            }
          }

          // 检查这个 Block 是否为空
          let isEmpty = true;
          for (let r = 0; r < block.data.length; r++) {
            for (let t = 0; t < block.data[0].length; t++) {
              if (block.data[r][t] !== -1) {
                isEmpty = false;
                break;
              }
            }
            if (!isEmpty) break;
          }

          // 为空的话直接删除这个 Block
          if (isEmpty) {
            xStore.delete(blockPoint.x);
          }

          // 检查 xStore 是否为空
          if (xStore.size === 0) {
            state.mapBlocks.delete(blockPoint.y);
          }
        }
      }
    }

    // 最后删除 Prefab
    state.prefabInstances.delete(key);

    return prefab;
  };
}

/**
 * 清空全部 TileData
 */
export function clearAllTileData(state: IState) {
  return () => {
    state.tileInstancesCache.clear();
    state.currentTileInstancesCache.clear();
  };
}

/**
 * 替换 TileData
 */
export function replaceTileData(state: IState) {
  return (tile: TileData) => {
    state.tileInstancesCache.set(tile.key, tile);
    state.currentTileInstancesCache.set(tile.key, tile);
  };
}

/**
 * 清空全部 Tile
 */
export function clearAllTile(state: IMapState) {
  return () => {
    state.mapTiles.clear();
  };
}

/**
 * 替换 Tile
 */
export function replaceTile(state: IMapState) {
  return (tile: Tile) => {
    if (!state.mapTiles.has(tile.point.y)) {
      state.mapTiles.set(tile.point.y, new TreeMap<number, Tile>((a: number, b: number) => a - b));
    }

    const xStore = state.mapTiles.get(tile.point.y);
    xStore?.set(tile.point.x, tile);
  };
}

/**
 * 清空预制件
 */
export function clearPrefabs(state: IMapState) {
  return () => {
    state.prefabInstancesCache.clear();
    state.mapBlocks.clear();
    state.blockInPrefabCount.clear();
    state.prefabInstances.clear();
  };
}

/**
 * 替换 Prefab
 */
export function replacePrefab(state: IState) {
  return (prefab: Prefab) => {
    const key = Math.ceil(Math.random() * 10000);

    const width = prefab.data.width;
    const height = prefab.data.height;
    state.prefabInstancesCache.set(prefab.data.prefabId, prefab.data);
    state.prefabInstances.set(key, prefab);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const subPoint = { x: prefab.point.x + i, y: prefab.point.y - j };
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
        block.data[inPoint.x][inPoint.y] = key;
        // 再把它丢进 blockInPrefabCount
        addKeyToBlockInPrefabCount(state, key, blockPoint);
      }
    }
  };
}

function pointToString(point: Point) {
  return `${point.x}-${point.y}`;
}
