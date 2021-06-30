import { ActionTypes as canvasTypes } from '@/store/modules/canvas/canvas.action-types';
import { ActionTypes as keyTypes } from '@/store/modules/keyboard/keyboard.action-types';
import { ActionTypes as rootATypes } from './modules/root/root.action-types';

export const AllActionTypes = {
  ...canvasTypes,
  ...keyTypes,
  ...rootATypes
};
