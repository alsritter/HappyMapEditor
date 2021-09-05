import { IItemState } from './item.state';

export function currentTileModify(state: IItemState) {
  return (index: number, path: string, name: string, desc: string) => {
    state.tile.path = path;
    state.tile.name = name;
    state.tile.desc = desc;
    state.tile.index = index;
  };
}
