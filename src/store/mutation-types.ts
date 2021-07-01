import { MutationTypes as canvasTypes } from '@/store/modules/canvas/canvas.mutation-types';
import { MutationTypes as keyTypes } from '@/store/modules/keyboard/keyboard.mutation-types';
import { MutationTypes as mapTypes } from '@/store/modules/map/map.mutation-types';

export const AllMutationTypes = { ...canvasTypes, ...keyTypes, ...mapTypes };
