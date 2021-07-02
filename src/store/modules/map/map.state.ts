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

// // https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
// // const tmpData = Array.from(Array(4), () => new Array(4));
// const tmpData = Array.from(Array(4), () => {
//   const arr = new Array(4);
//   arr.fill(-1);
//   return arr;
// });

// console.log(tmpData);

// tmpData[0][3] = 0;
// blocks[DisplayLayer.FRONT].setValue('0-0', {
//   x: 6,
//   y: 7,
//   size: 2,
//   data: tmpData
// });

// items.setValue(0, {
//   id: 0,
//   displayModel: DisplayLayer.FRONT,
//   // 通过 id 去另一个存储图片的 State 查找图片
//   tileSpriteId: 0,
//   color: '#ffc107',
//   effectKeys: [],
//   tags: []
// });

export const initialState = {
  blocks,
  items
};

export default initialState;
