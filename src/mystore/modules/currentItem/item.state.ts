export interface ICurrentTile {
  path: string;
  name: string;
  desc: string;
  index: number;
}

/**
 * 当前选中的 Tile
 */
export interface IItemState {
  tile: ICurrentTile;
}
