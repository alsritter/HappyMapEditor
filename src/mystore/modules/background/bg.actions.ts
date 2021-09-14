import { Background } from '@/mystore/types';
import { IBackgroundState } from './bg.state';

export function backgroundModify(state: IBackgroundState) {
  return (bgId: string, bgUrl: string, color: string) => {
    state.currentBackground.url = bgUrl;
    state.currentBackground.bgId = bgId;
    state.currentBackground.color = color;
  };
}
