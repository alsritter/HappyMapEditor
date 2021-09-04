import { defineComponent, ref, onMounted, watch, Ref } from 'vue';
import bus from '@/core/util/bus';
import Constants from '@/core/util/Constants';
import { canvasDraw, isAllParamType, isGridParamType, GridRuntimeType } from '@/core/util/graph';
import { jumpTimedProcessArray, Task } from '@/core/util/process';
import { CanvasEventShape } from '@/core/util/manipulate';
import { useStore } from '@/mystore';

enum DisplayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default defineComponent({
  setup() {
    const store = useStore();
    // 引用页面的画布
    const GRID_CANVAS = ref(null) as Ref<HTMLCanvasElement | null>;
    const canvasBox = {
      [DisplayLayer.FRONT]: ref(null) as Ref<HTMLCanvasElement | null>,
      [DisplayLayer.MIDDLE]: ref(null) as Ref<HTMLCanvasElement | null>,
      [DisplayLayer.BACKGROUND]: ref(null) as Ref<HTMLCanvasElement | null>
    };

    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    // The starting position of the current coordinate
    const canvasEvent = new CanvasEventShape();

    onMounted(() => {
      const GRID_canvas = GRID_CANVAS.value as unknown as HTMLCanvasElement;
      const FRONT_canvas = canvasBox.FRONT.value as unknown as HTMLCanvasElement;
      const MIDDLE_canvas = canvasBox.MIDDLE.value as unknown as HTMLCanvasElement;
      const BACKGROUND_canvas = canvasBox.BACKGROUND.value as unknown as HTMLCanvasElement;

      const GRID_ctx = GRID_canvas.getContext('2d') as CanvasRenderingContext2D;
      const FRONT_ctx = FRONT_canvas.getContext('2d') as CanvasRenderingContext2D;
      const MIDDLE_ctx = MIDDLE_canvas.getContext('2d') as CanvasRenderingContext2D;
      const BACKGROUND_ctx = BACKGROUND_canvas.getContext('2d') as CanvasRenderingContext2D;

      canvasEvent.InitCanvasEvent(GRID_canvas);
      canvasDraw.drawGrid({
        ctx: GRID_ctx,
        width,
        height,
        size: store.state.canvasSize,
        x: store.state.initPoint.x,
        y: store.state.initPoint.y,
        gridType: GridRuntimeType.GRID
      });

      // Listen for keyboard events
      watch(
        () => store.getters.isAlt(),
        (newValue, oldValue) => {
          if (newValue) {
            canvasEvent.dragCanvas(GRID_canvas);
          } else {
            canvasEvent.InitCanvasEvent(GRID_canvas);
          }
        }
      );
      // Draw the queue
      const graphGridQueues = new Array<Task>();

      bus.on('refreshCanvas', () => {
        // 绘制网格的操作入队
        graphGridQueues.push({
          data: {
            ctx: GRID_ctx,
            width,
            height,
            size: store.state.canvasSize,
            x: store.state.initPoint.x,
            y: store.state.initPoint.y,
            gridType: GridRuntimeType.GRID
          },
          priority: 0
        });

        // 绘制格子数据入队
        graphGridQueues.push({
          data: {
            ctx: FRONT_ctx,
            width,
            height,
            size: store.state.canvasSize,
            x: store.state.initPoint.x,
            y: store.state.initPoint.y,
            data: store.getters.getAllBlock(DisplayLayer.FRONT),
            items: store.getters.getItems(),
            gridType: GridRuntimeType.ALL
          },
          priority: 1
        });

        // 执行任务
        jumpTimedProcessArray(
          graphGridQueues,
          (item) => {
            if (item == undefined) return;
            // Clear the entire canvas
            canvasDraw.clearAllCanvas(FRONT_ctx, width, height);
            if (isAllParamType(item.data)) {
              canvasDraw.drawAllItem(item.data);
            } else if (isGridParamType(item.data)) {
              canvasDraw.drawGrid(item.data);
            }
          },
          () => {
            // console.log('任务完成');
          }
        );
      });
    });

    return { ...canvasBox, GRID_CANVAS, width, height, scrollBarWheel: canvasEvent.scrollBarWheel };
  }
});
