import * as Vue from 'vue';
import bus from '../../core/util/bus';
import Constants from '../../core/util/Constants';
import graph from '../../core/util/graph';
import { useStore } from 'vuex';

export enum displayLayer {
  FRONT = 'FRONT',
  MIDDLE = 'MIDDLE',
  BACKGROUND = 'BACKGROUND'
}

export default Vue.defineComponent({
  setup() {
    const store = useStore();
    const canvasBox = {
      [displayLayer.FRONT]: Vue.ref(null) as Vue.Ref,
      [displayLayer.MIDDLE]: Vue.ref(null) as Vue.Ref,
      [displayLayer.BACKGROUND]: Vue.ref(null) as Vue.Ref
    };
    const GRID_CANVAS = Vue.ref(null);

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
        pressedKeys: store.getters['keyboard/selectPressedKeys']
      };
    });

    const width = Constants.CANVAS_WIDTH;
    const height = Constants.CANVAS_HEIGHT;
    const currentX = Vue.ref(0);
    const currentY = Vue.ref(0); //TODO: 替换成 state 里面的
    const dragging = Vue.ref(false); //是否激活拖拽状态

    // 只拖动最上面的，下面的是跟着一起动的
    const dragCanvas = (canvasDOM: HTMLCanvasElement) => {
      let mouseDownLocation = {
        x: 0,
        y: 0
      };

      //监听鼠标按下事件
      canvasDOM.onmousedown = (event: MouseEvent) => {
        // 要同时按下 ALT 键
        if (KeyGetters.value.selectKeys['VALUE_ALT']) {
          mouseDownLocation = graph.canvasPoint.windowToCanvas(canvasDOM, event.clientX, event.clientY);
          dragging.value = true;
        }
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
          //var newMouseLocation = windowToCanvas(canvas, event.clientX, event.clientY);
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

    Vue.onMounted(() => {
      const canvas = GRID_CANVAS.value as unknown as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
      graph.canvasDraw.drawGrid(ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value);
      // 拖拽画布
      dragCanvas(canvas);

      bus.on('refreshCanvas', () => {
        graph.canvasDraw.clearAllCanvas(ctx, width, height);
        graph.canvasDraw.drawGrid(ctx, width, height, canvasGetters.value.getSize, currentX.value, currentY.value);
      });

      //dragCanvas();
    });

    return { ...canvasBox, GRID_CANVAS, width, height, scrollBarWheel };
  }
});
