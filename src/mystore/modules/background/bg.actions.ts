import { IBackgroundState } from './bg.state';

export function backgroundModify(state: IBackgroundState) {
  return (bgId: string, bgUrl: string, bgName: string) => {
    state.bgUrl = bgUrl;
    state.bgId = bgId;
    state.bgName = bgName;
  };
}

export function backgroundClear(state: IBackgroundState) {
  return () => {
    state.bgUrl = '';
    state.bgId = '';
    state.bgName = '';
  };
}
