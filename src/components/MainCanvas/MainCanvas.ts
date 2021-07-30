import * as Vue from 'vue';
import bus from '@/core/util/bus';
import Constants from '@/core/util/Constants';
import { AllItemParamType, canvasDraw, isAllParamType } from '@/core/util/graph';
import { GridParamType, SingleItemParamType } from '@/core/util/graph';
import { jumpTimedProcessArray } from '@/core/util/process';
import { CanvasEventShape } from '@/core/util/manipulate';
// import { useStore } from 'vuex';
import { useStore } from '@/use/useStore';
import { DisplayLayer } from '@/store/modules/map/map.types';

export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default Vue.defineComponent({
  setup() {
    const store = useStore();
    const GRID_CANVAS = Vue.ref(null) as Vue.Ref<HTMLCanvasElement | null>;
    const canvasBox = {
      [displayLayer.FRONT]: Vue.ref(null) as Vue.Ref<HTMLCanvasElement | null>,
      [displayLayer.MIDDLE]: Vue.ref(null) as Vue.Ref<HTMLCanvasElement | null>,
      [displayLayer.BACKGROUND]: Vue.ref(null) as Vue.Ref<HTMLCanvasElement | null>
    };
    const canvasGetters = Vue.computed(() => {
      return {
        state: store.getters.status,
        getSize: store.getters.getSize,
        getPoint: store.getters.getPoint
      };
    });
    const KeyGetters = Vue.computed(() => {
      return {
        isRecall: store.getters.isRecall,
        selectKeys: store.getters.selectKeys,
        pressedKeys: store.getters.selectPressedKeys,
        isAlt: store.getters.isAlt
      };
    });
    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    const currentX = Vue.ref(0);
    const currentY = Vue.ref(0); //TODO: 替换成 state 里面的
    const dragging = Vue.ref(false); //是否激活拖拽状态
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

    /**
     * 会在组件更新后调用，只有 data 里的变量改变并且要在页面重新渲染完成之后，才会进 updated 生命周期，
     * 只改变 data 里的值但是没有再页面上渲染该值的话并不会触发 updated 方法。
     *
     * 例如这里暴露的坐标 currentX, currentY 变化后就会更新（因为它显示在了页面上）
     */
    Vue.onUpdated(() => {
      // console.log('sssssssssss');
    });

    Vue.onMounted(() => {
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
        y: currentY.value
      });

      canvasDraw.drawSingleItem({
        ctx: GRID_ctx,
        width,
        height,
        size: canvasGetters.value.getSize,
        x: currentX.value,
        y: currentY.value,
        changeX: 1,
        changeY: 1,
        data: tmpTile
      });

      // 监听键盘事件
      Vue.watch(
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
      const graphGridQueues = new Array<GridParamType | AllItemParamType>();

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
          ctx: GRID_ctx,
          width,
          height,
          size: canvasGetters.value.getSize,
          x: currentX.value,
          y: currentY.value
        });

        // 绘制格子数据入队
        graphGridQueues.push({
          ctx: FRONT_ctx,
          width,
          height,
          size: canvasGetters.value.getSize,
          x: currentX.value,
          y: currentY.value,
          data: store.getters.getAllBlock(DisplayLayer.FRONT),
          items: store.getters.getItems
        });

        // 执行任务
        jumpTimedProcessArray(
          graphGridQueues,
          (item) => {
            if (item == undefined) return;
            if (isAllParamType(item)) {
              canvasDraw.drawAllItem(item);
            } else {
              canvasDraw.drawGrid(item);
            }
          },
          () => {
            // console.log('任务完成');
          }
        );

        // 别忘了清除其它画布
        canvasDraw.clearAllCanvas(FRONT_ctx, width, height);
      });
    });

    return { ...canvasBox, currentX, currentY, GRID_CANVAS, width, height, scrollBarWheel: canvasEvent.scrollBarWheel };
  }
});
