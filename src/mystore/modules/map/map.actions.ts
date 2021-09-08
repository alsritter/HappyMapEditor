import { IMapState } from './map.state';
import { Point, Tile, TileData, PrefabData, Prefab, PrefabYPoint, PrefabXPoint } from '@/mystore/types';
import { IState } from '@/mystore/state';
import { getPrefabByPoint } from './map.getters';
import TreeMap from 'ts-treemap';

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

export function mapAddPrefab(state: IState) {
  return (point: Point) => {
    if (getPrefabByPoint(state)(point)) return;

    // 要检查被创建物品周边是否有道具
    for (let i = 1; i < state.prefab.width; i++) {
      for (let j = 1; j < state.prefab.height; j++) {
        if (getPrefabByPoint(state)({ x: point.x + i, y: point.y + j })) return;
      }
    }

    console.log('创建');

    const cacheData = state.prefabInstancesCache.get(state.prefab.index);
    const ypoint = new PrefabYPoint(point.y, state.prefab.width);
    if (!state.mapPrefabs.has(ypoint)) {
      state.mapPrefabs.set(ypoint, new TreeMap<PrefabXPoint, Prefab>((a, b) => a.x - b.x));
    }
    const xStore = state.mapPrefabs.get(ypoint);
    let prefab;
    const xpoint = new PrefabXPoint(point.x, state.prefab.height);
    if (cacheData == undefined) {
      const prefabData = new PrefabData(state.prefab.index, state.prefab.width, state.prefab.height, state.prefab.image);
      // 先插入缓存
      state.prefabInstancesCache.set(state.prefab.index, prefabData);
      prefab = new Prefab(point, prefabData);
      xStore?.set(xpoint, prefab);
    } else {
      prefab = new Prefab(point, cacheData);
      xStore?.set(xpoint, prefab);
    }
    return prefab;
  };
}

/**
 * 删除指定位置的 Prefab
 */
export function mapDeletePrefab(state: IMapState) {
  return (point: Point) => {
    const pre = getPrefabByPoint(state)(point);
    if (!pre) return;
    // 存在则替换 point 为标准的 point
    point = pre.point;

    const ypoint = new PrefabYPoint(point.y, 0);
    if (!state.mapPrefabs.has(ypoint)) {
      return;
    }
    const xStore = state.mapPrefabs.get(ypoint);
    if (xStore?.size == 0) {
      state.mapPrefabs.delete(ypoint);
      return;
    }

    const xpoint = new PrefabXPoint(point.x, 0);
    xStore?.delete(xpoint);
  };
}
