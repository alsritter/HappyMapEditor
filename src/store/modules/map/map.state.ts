import { Dictionary } from 'typescript-collections';
import { DisplayLayer, Block, Tile, Prefab } from './map.types';

// 这里存储块应该使用字典，根据 'x-y' 这个位置组合 key  取出块，所以需要对取的坐标规格化

const blocks = {
  [DisplayLayer.FRONT]: new Dictionary<string, Block>(),
  [DisplayLayer.MIDDLE]: new Dictionary<string, Block>(),
  [DisplayLayer.BACKGROUND]: new Dictionary<string, Block>()
};

/**
 * 砖块预制件都直接存在这里，分配一个 id 去这个字典里面查找物品
 */
const items = new Dictionary<number, Tile | Prefab>();

export const initialState = {
  blocks,
  items
};

export default initialState;
