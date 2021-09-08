import TreeMap, { Comparable } from 'ts-treemap';

export type Point = {
  x: number;
  y: number;
};

export class PrefabYPoint implements Comparable<PrefabYPoint> {
  y: number;
  width: number;

  constructor(y: number, width: number) {
    this.width = width;
    this.y = y;
  }

  compare(object: PrefabYPoint): number {
    return this.y - object.y;
  }
}

export class PrefabXPoint implements Comparable<PrefabXPoint> {
  x: number;
  height: number;

  constructor(x: number, height: number) {
    this.height = height;
    this.x = x;
  }

  compare(object: PrefabXPoint): number {
    return this.x - object.x;
  }
}

export enum Layer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

/**
 * 这个是把通用的数据提取出来
 */
export class TileData {
  image: HTMLImageElement | null;
  index: number;
  color: string;
  effectKeys: number[];
  tags: number[];

  constructor(index: number, image: HTMLImageElement | null = null, color: string = '#5d9bbf2e', effectKeys: number[] = [], tags: number[] = []) {
    this.image = image;
    this.index = index;
    this.color = color;
    this.effectKeys = effectKeys;
    this.tags = tags;
  }
}

export class Tile {
  layer: Layer;
  point: Point;
  data: TileData;

  /**
   *
   * @param path
   * @param index
   * @param layer 这里直接存 Layer 就无需分图层存了
   * @param color
   * @param effectKeys
   * @param tags
   */
  constructor(point: Point, layer: Layer, data: TileData) {
    this.point = point;
    this.data = data;
    this.layer = layer;
  }
}

export class PrefabData {
  image: HTMLImageElement | null;
  index: number;
  width: number;
  height: number;

  constructor(index: number, width: number, height: number, image: HTMLImageElement | null = null) {
    this.index = index;
    this.width = width;
    this.height = height;
    this.image = image;
  }
}

export class Prefab {
  point: Point;
  data: PrefabData;

  constructor(point: Point, data: PrefabData) {
    this.point = point;
    this.data = data;
  }
}

export interface ICurrentTile {
  path: string;
  name: string;
  desc: string;
  index: number;
  image: HTMLImageElement | null;
}

export interface ICurrentPrefab {
  path: string;
  name: string;
  desc: string;
  index: number;
  width: number;
  height: number;
  image: HTMLImageElement | null;
}

export enum ItemType {
  TILE = 'TILE',
  PREFAB = 'PREFAB'
}

export enum ToolType {
  PEN = 'PEN',
  ERASER = 'ERASER',
  PIPETA = 'PIPETA',
  AREA_PEN = 'AREA_PEN',
  AREA_ERASER = 'AREA_ERASER'
}
