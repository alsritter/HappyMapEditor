import { IMapState, Tile } from './map.state';
import { Point } from '@/mystore/types';
import { SortedMap } from 'sweet-collections';

/**
 * 添加 Tile
 */
export function mapAddTile(state: IMapState) {
  return (tile: Tile, point: Point) => {
    if (!state.mapTiles.has(point.y)) {
      state.mapTiles.set(point.y, new SortedMap<number, Tile>((a: number, b: number) => a - b));
    }
    const xStore = state.mapTiles.get(point.y);
    xStore?.set(point.x, tile);
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
