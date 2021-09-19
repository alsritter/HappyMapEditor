import { IEffectState } from './effect.state';

export function effectModify(state: IEffectState) {
  return (key: string, eff: string[]) => {
    state.effects.set(key, eff);
  };
}
