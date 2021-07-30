import { defineComponent, ref, computed, onUpdated, onMounted, watch, Ref } from 'vue';
import bus from '@/core/util/bus';
import Constants from '@/core/util/Constants';
import { AllItemParamType, canvasDraw, isAllParamType, isGridParamType, GridRuntimeType } from '@/core/util/graph';
import { GridParamType, SingleItemParamType } from '@/core/util/graph';
import { jumpTimedProcessArray, Task } from '@/core/util/process';
import { CanvasEventShape } from '@/core/util/manipulate';
// import { useStore } from 'vuex';
import { useStore } from '@/use/useStore';
import { DisplayLayer } from '@/store/modules/map/map.types';

export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default defineComponent({
  setup() {
    const store = useStore();
    const GRID_CANVAS = ref(null) as Ref<HTMLCanvasElement | null>;
    const canvasBox = {
      [displayLayer.FRONT]: ref(null) as Ref<HTMLCanvasElement | null>,
      [displayLayer.MIDDLE]: ref(null) as Ref<HTMLCanvasElement | null>,
      [displayLayer.BACKGROUND]: ref(null) as Ref<HTMLCanvasElement | null>
    };
    const canvasGetters = computed(() => {
      return {
        state: store.getters.status,
        getSize: store.getters.getSize,
        getPoint: store.getters.getPoint
      };
    });
    const KeyGetters = computed(() => {
      return {
        isRecall: store.getters.isRecall,
        selectKeys: store.getters.selectKeys,
        pressedKeys: store.getters.selectPressedKeys,
        isAlt: store.getters.isAlt
      };
    });
    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    // The starting position of the current coordinate
    const currentX = ref(0);
    const currentY = ref(0); //TODO: 替换成 state 里面的
    const dragging = ref(false); // Whether it is in the drag and drop state
    const canvasEvent = new CanvasEventShape(dragging, currentX, currentY);

    const tmpTile = {
      id: 0,
      displayModel: DisplayLayer.FRONT,
      // 通过 id 去另一个存储图片的 State 查找图片
      tileSpriteId: 0,
      color: '#ffc107',
      effectKeys: [],
      tags: []
    };

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
        size: canvasGetters.value.getSize,
        x: currentX.value,
        y: currentY.value,
        gridType: GridRuntimeType.GRID
      });

      // Listen for keyboard events
      watch(
        () => KeyGetters.value.isAlt,
        (newValue, oldValue) => {
          if (newValue) {
            canvasEvent.dragCanvas(GRID_canvas);
          } else {
            canvasEvent.InitCanvasEvent(GRID_canvas);
          }
        }
      );

      console.log(import.meta.env.SERVER_IP);
      // Draw the queue
      const graphGridQueues = new Array<Task>();

      bus.on('refreshCanvas', () => {
        // 可以通过不使用缓存的情况来比较卡顿
        // canvasDraw.drawGrid({
        //   ctx: GRID_ctx,
        //   width,
        //   height,
        //   size: canvasGetters.value.getSize,
        //   x: currentX.value,
        //   y: currentY.value
        // });
        // canvasDraw.clearAllCanvas(FRONT_ctx, width, height);
        // canvasDraw.drawAllItem({
        //   ctx: FRONT_ctx,
        //   width,
        //   height,
        //   size: canvasGetters.value.getSize,
        //   x: currentX.value,
        //   y: currentY.value,
        //   data: store.getters.getAllBlock(DisplayLayer.FRONT),
        //   items: store.getters.getItems
        // });

        // 绘制网格的操作入队
        graphGridQueues.push({
          data: {
            ctx: GRID_ctx,
            width,
            height,
            size: canvasGetters.value.getSize,
            x: currentX.value,
            y: currentY.value,
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
            size: canvasGetters.value.getSize,
            x: currentX.value,
            y: currentY.value,
            data: store.getters.getAllBlock(DisplayLayer.FRONT),
            items: store.getters.getItems,
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

        // 别忘了清除其它画布
        // canvasDraw.clearAllCanvas(FRONT_ctx, width, height);
      });
    });

    return { ...canvasBox, currentX, currentY, GRID_CANVAS, width, height, scrollBarWheel: canvasEvent.scrollBarWheel };
  }
});
