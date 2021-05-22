import * as Vue from 'vue';
import bus from '../../core/util/bus';

const graph = {
  drawGrid(ctx: CanvasRenderingContext2D, width: number, hight: number, size: number, x: number, y: number) {
    // 计算数量
    const _cols = width / size;
    const _rows = _cols;

    // 绘制线条
    for (let i = 0; i < _cols; i++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(size * i - 0.5, y); // -0.5是为了解决像素模糊问题
      ctx.lineTo(size * i - 0.5, hight);
      ctx.setLineDash([1, 2]); //绘制虚线
      ctx.strokeStyle = '#2a2a2a'; // 设置每个线条的颜色
      ctx.stroke();
    }
    // 同理y轴
    for (let i = 0; i < _rows; i++) {
      ctx.beginPath(); // 开启路径，设置不同的样式
      ctx.moveTo(x, size * i - 0.5);
      ctx.lineTo(width, size * i - 0.5);
      ctx.strokeStyle = '#2a2a2a';
      ctx.stroke();
    }
  },
  clearAllCanvas(ctx: CanvasRenderingContext2D, width: number, hight: number) {
    ctx.clearRect(0, 0, width, hight);
  }
};

export default Vue.defineComponent({
  setup() {
    const mapCanvas = Vue.ref(null) as any;
    const width = 500;
    const height = 500;
    const offsetSpeed = 5;
    const size = Vue.ref(10);
    const currentX = Vue.ref(0);
    const currentY = Vue.ref(0);

    const scrollBarWheel = (event: WheelEventInit) => {
      if (event.deltaY == undefined) {
        return;
      }
      if (event.deltaY < 0) {
        //上滚
        size.value++;
      } else if (event.deltaY > 0) {
        //下滚
        size.value--;
      } else {
        console.error('Mouse wheel zooming in and out status acquisition failed!');
      }
      bus.emit('refreshCanvas');
    };

    const dragCanvas = () => {
      // 参考资料 https://www.jianshu.com/p/80d37f5763a5
      mapCanvas.value.onmousedown = (event: MouseEvent) => {
        if (typeof event === 'object') {
          //鼠标的x坐标减去box的左边距离，unchangeX 这个距离是不会变的，通过这个新鼠标的X坐标减去 unchangeX 就是box的Left
          const unchangeX = event.clientX - mapCanvas.value.offsetLeft;
          const unchangeY = event.clientY - mapCanvas.value.offsetTop;

          mapCanvas.value.onmousemove = (event: MouseEvent) => {
            let oLeft = event.clientX - unchangeX;
            let oTop = event.clientY - unchangeY;

            //优化部分：鼠标移动到浏览器左侧、右侧、上侧、下侧时的问题
            if (oLeft < 0) {
              oLeft = 0;
            } else if (oLeft > document.documentElement.clientWidth - mapCanvas.value.offsetWidth) {
              oLeft = document.documentElement.clientWidth - mapCanvas.value.offsetWidth;
            }

            if (oTop < 0) {
              oTop = 0;
            } else if (oTop > document.documentElement.clientHeight - mapCanvas.value.offsetHeight) {
              oTop = document.documentElement.clientHeight - mapCanvas.value.offsetHeight;
            }

            currentX.value = oLeft;
            currentY.value = oTop;

            bus.emit('refreshCanvas');
          };
        }
      };

      // 恢复
      mapCanvas.value.onmouseup = (event: MouseEvent) => {
        mapCanvas.value.onmousemove = null;
      };
    };

    Vue.onMounted(() => {
      const canvas = mapCanvas.value;
      const ctx = canvas.getContext('2d');
      bus.on('refreshCanvas', () => {
        graph.clearAllCanvas(ctx, width, height);
        graph.drawGrid(ctx, width, height, size.value, currentX.value, currentY.value);
      });

      //dragCanvas();
    });

    return { mapCanvas, width, height, scrollBarWheel };
  }
});
