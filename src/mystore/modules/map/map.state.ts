import { Dictionary } from 'typescript-collections';
import { Block, Layer, Tile, Prefab, IBlocks } from '@/mystore/types';

export interface IMapState {
  blocks: IBlocks;
  /**
   * 砖块预制件都直接存在这里，分配一个 id 去这个字典里面查找物品
   */
  items: Dictionary<number, Tile | Prefab>;
}

export function initItem() {
  return new Dictionary<number, Tile | Prefab>();
}

export function initBlocks() {
  return {
    [Layer.FRONT]: new Dictionary<string, Block>(),
    [Layer.MIDDLE]: new Dictionary<string, Block>(),
    [Layer.BACKGROUND]: new Dictionary<string, Block>()
  };
}
