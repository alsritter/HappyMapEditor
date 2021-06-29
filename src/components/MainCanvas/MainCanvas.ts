import * as Vue from 'vue';
import bus from '../../core/util/bus';
import Constants from '../../core/util/Constants';
import graph from '../../core/util/graph';
import process from '../../core/util/process';
import { useStore } from 'vuex';

export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default Vue.defineComponent({
  setup() {
    const store = useStore();
    const GRID_CANVAS = Vue.ref(null);
    const canvasBox = {
      [displayLayer.FRONT]: Vue.ref(null) as Vue.Ref,
      [displayLayer.MIDDLE]: Vue.ref(null) as Vue.Ref,
      [displayLayer.BACKGROUND]: Vue.ref(null) as Vue.Ref
    };
    const canvasGetters = Vue.computed(() => {
      return {
        state: store.getters['canvas/status'],
        getSize: store.getters['canvas/getSize'],
        getPoint: store.getters['canvas/getPoint']
      };
    });
    const KeyGetters = Vue.computed(() => {
      return {
        isRecall: store.getters['keyboard/isRecall'],
        selectKeys: store.getters['keyboard/selectKeys'],
        pressedKeys: store.getters['keyboard/selectPressedKeys'],
        isAlt: store.getters['keyboard/isAlt']
      };
    });

    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    const currentX = Vue.ref(0);
    const currentY = Vue.ref(0); //TODO: 替换成 state 里面的
    const dragging = Vue.ref(false); //是否激活拖拽状态

    type GridParamType = {
      // 画布元素
      ctx: CanvasRenderingContext2D;
      // 画布的高度
      width: number;
      // 画布的宽度
      height: number;
      // 每个格子的大小
      size: number;
      // 起始点 X
      x: number;
      // 起始点 Y
      y: number;
    };

    // Vue.watch(
    //   () => dragging.value,
    //   (newValue, oldValue) => {
    //     // 激活绘图进程工具（避免一直执行），变化了就刷新

    //   }
    // );

    const graphGridWord = new Array<GridParamType>();

    // const graphProcess = (flag: boolean) => {

    // };

    /**
     * 拖动画布
     * 只拖动最上面的，下面的是跟着一起动的
     */
    const dragCanvas = (canvasDOM: HTMLCanvasElement) => {
      let mouseDownLocation = {
        x: 0,
        y: 0
      };

      //监听鼠标按下事件
      canvasDOM.onmousedown = (event: MouseEvent) => {
        // // 要同时按下 ALT 键
        // if (KeyGetters.value.selectKeys['VALUE_ALT']) {
        //   mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        //   dragging.value = true;
        // }

        mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
        dragging.value = true;
      };

      //鼠标弹起（注意，这里要使用 document）
      canvasDOM.onmouseup = () => {
        //canvasDOM.style.cursor = 'default';
        dragging.value = false;
      };

      //鼠标移动
      canvasDOM.onmousemove = (event) => {
        if (dragging.value) {
          const move = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
          currentX.value += move.x - mouseDownLocation.x;
          currentY.value += move.y - mouseDownLocation.y;
          // 改变光标样式
          //canvasDOM.style.cursor = 'move';
          mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
          bus.emit('refreshCanvas');
        }
      };

      // 处理鼠标离开容器（这里统一收尾工作）
      canvasDOM.onmouseout = () => {
        //canvasDOM.style.cursor = 'default';
        dragging.value = false;
      };
    };

    /**
     * 清空绘图事件
     */
    const dragCanvasClean = (canvasDOM: HTMLCanvasElement) => {
      canvasDOM.onmousedown = null;
      canvasDOM.onmouseup = null;
      canvasDOM.onmousemove = null;
      canvasDOM.onmouseout = null;

      dragging.value = false;
    };

    // /**
    //  * 绘制画布
    //  */
    // const pointCanvas = (canvasDOM: HTMLCanvasElement) => {

    // };

    /**
     * 放大缩小画布
     */
    const scrollBarWheel = (event: WheelEventInit) => {
      if (event.deltaY == undefined) {
        return;
      }

      const size = canvasGetters.value.getSize;

      if (event.deltaY < 0) {
        if (size > Constants.MAX_SIZE) return;
        //上滚
        store.dispatch('canvas/UPDATE_SIZE', size + 1);
      } else if (event.deltaY > 0) {
        //下滚
        if (size < Constants.MIN_SIZE) return;
        store.dispatch('canvas/UPDATE_SIZE', size - 1);
      } else {
        console.error('Mouse wheel zooming in and out status acquisition failed!');
      }

      bus.emit('refreshCanvas');
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

      graph.canvasDraw.drawGrid(GRID_ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value);
      graph.canvasDraw.drawData(FRONT_ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value, 1, 1, '6');

      // 监听键盘事件
      Vue.watch(
        () => KeyGetters.value.isAlt,
        (newValue, oldValue) => {
          if (newValue == true) {
            // 拖拽画布
            dragCanvas(GRID_canvas);
          } else {
            dragCanvasClean(GRID_canvas);
          }
        }
      );

      // let count = 0;
      bus.on('refreshCanvas', () => {
        // console.log('ref:' + count++);
        // 要清除全部画面
        // graph.canvasDraw.clearAllCanvas(GRID_ctx, width, height);
        // graph.canvasDraw.drawGrid(GRID_ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value);
        graphGridWord.push({
          ctx: GRID_ctx,
          width,
          height,
          size: canvasGetters.value.getSize,
          x: currentX.value,
          y: currentY.value
        });

        process.jumpTimedProcessArray(
          graphGridWord,
          (item) => {
            if (item == undefined) return;
            graph.canvasDraw.drawGrid(item.ctx, item.width, item.height, item.size, item.x, item.y);
          },
          () => {
            // console.log('任务完成');
          }
        );

        // 别忘了清除其它画布
        graph.canvasDraw.clearAllCanvas(FRONT_ctx, width, height);
        graph.canvasDraw.drawData(FRONT_ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value, 1, 1, '6');
      });
    });

    return { ...canvasBox, currentX, currentY, GRID_CANVAS, width, height, scrollBarWheel };
  }
});
