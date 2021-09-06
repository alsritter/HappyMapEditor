import { processArray, timedProcessArray, jumpTimedProcessArray } from './todoqueue';
import { Debounced } from './debounced';
import { Throttle } from './throttle';

export interface Task {
  data: {
    frontCtx: CanvasRenderingContext2D;
    middleCtx: CanvasRenderingContext2D;
    backgroundCtx: CanvasRenderingContext2D;
    size: number;
    initX: number;
    initY: number;
    width: number;
    height: number;
  };
  priority: number;
}

export { processArray, timedProcessArray, jumpTimedProcessArray, Debounced, Throttle };
