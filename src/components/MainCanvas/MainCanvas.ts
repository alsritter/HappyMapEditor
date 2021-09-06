import { defineComponent, ref, onMounted, watch, Ref } from 'vue';
import bus from '@/core/util/bus';
import Constants from '@/core/util/Constants';
import { canvasDraw, isAllParamType, isGridParamType, GridRuntimeType } from '@/core/util/graph';
import { jumpTimedProcessArray, Task } from '@/core/util/process';
import { CanvasEventShape } from '@/core/util/manipulate';
import { useStore } from '@/mystore';
import { Layer } from '@/mystore/types';

export default defineComponent({
  setup() {
    const store = useStore();
    // 引用页面的画布
    const GRID_CANVAS = ref(null) as Ref<HTMLCanvasElement | null>;
    const canvasBox = {
      [Layer.FRONT]: ref(null) as Ref<HTMLCanvasElement | null>,
      [Layer.MIDDLE]: ref(null) as Ref<HTMLCanvasElement | null>,
      [Layer.BACKGROUND]: ref(null) as Ref<HTMLCanvasElement | null>
    };

    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    // The starting position of the current coordinate
    const canvasEvent = new CanvasEventShape();

    onMounted(() => {
      const gridElement = GRID_CANVAS.value as unknown as HTMLCanvasElement;
      const frontElement = canvasBox.FRONT.value as unknown as HTMLCanvasElement;
      const middleElement = canvasBox.MIDDLE.value as unknown as HTMLCanvasElement;
      const backgroundElement = canvasBox.BACKGROUND.value as unknown as HTMLCanvasElement;

      const gridCtx = gridElement.getContext('2d') as CanvasRenderingContext2D;
      const frontCtx = frontElement.getContext('2d') as CanvasRenderingContext2D;
      const middleCtx = middleElement.getContext('2d') as CanvasRenderingContext2D;
      const backgroundCtx = backgroundElement.getContext('2d') as CanvasRenderingContext2D;

      canvasEvent.initCanvasEvent(gridElement);
      canvasDraw.drawGrid({
        ctx: gridCtx,
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
            canvasEvent.dragCanvas(gridElement);
          } else {
            canvasEvent.initCanvasEvent(gridElement);
          }
        }
      );

      // Draw the queue
      const graphGridQueues = new Array<Task>();

      bus.on('refreshCanvas', () => {
        // 绘制网格的操作入队
        graphGridQueues.push({
          data: {
            ctx: gridCtx,
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
            ctx: frontCtx,
            width,
            height,
            size: store.state.canvasSize,
            x: store.state.initPoint.x,
            y: store.state.initPoint.y,
            data: store.getters.getAllBlock(Layer.FRONT),
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
            canvasDraw.clearAllCanvas(frontCtx, width, height);
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
