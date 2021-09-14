import { IBackgroundState } from './bg.state';

export function getBgUrl(state: IBackgroundState) {
  return () => {
    return state.currentBackground.url;
  };
}
