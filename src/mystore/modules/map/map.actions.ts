import { IMapState } from './map.state';
import { Point, Tile, TileData } from '@/mystore/types';
import { IState } from '@/mystore/state';
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
      xStore?.set(point.x, new Tile(point, state.currentLayer, cacheData));
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
