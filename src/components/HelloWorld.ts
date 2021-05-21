import * as Vue from 'vue';
import * as MyEvent from '../core/util/EventTools';

let _space = 30;

class Draw implements MyEvent.IEventObserver {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    MyEvent.EventManager.Register(this, MyEvent.EventID.TEST);
    this.canvas = document.getElementById('testCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D; //取得2d 画布上下文
  }

  HandleEvent<T>(resp: MyEvent.EventData<T>): void {
    switch (resp.eid) {
      case MyEvent.EventID.TEST: {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 计算数量
        const _cols = this.canvas.width / _space;
        const _rows = _cols;

        // 先获取每个图形格子的大小
        //_space = this.canvas.width / _cols;

        // 绘制线条
        for (let i = 0; i < _cols; i++) {
          this.ctx.beginPath(); // 开启路径，设置不同的样式
          this.ctx.moveTo(_space * i - 0.5, 0); // -0.5是为了解决像素模糊问题
          this.ctx.lineTo(_space * i - 0.5, this.canvas.height);
          this.ctx.setLineDash([1, 2]); //绘制虚线
          this.ctx.strokeStyle = '#2a2a2a'; // 设置每个线条的颜色
          this.ctx.stroke();
        }
        // 同理y轴
        for (let i = 0; i < _rows; i++) {
          this.ctx.beginPath(); // 开启路径，设置不同的样式
          this.ctx.moveTo(0, _space * i - 0.5);
          this.ctx.lineTo(this.canvas.width, _space * i - 0.5);
          this.ctx.strokeStyle = '#2a2a2a';
          this.ctx.stroke();
        }

        break;
      }
    }
  }
}

export default Vue.defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    };
  },
  setup() {
    let drow: any = null;
    let eventData: any = null;
    Vue.onMounted(() => {
      drow = new Draw();
      eventData = MyEvent.EventData.CreateEvent(MyEvent.EventID.TEST);
    });

    Vue.onUnmounted(() => {
      MyEvent.EventManager.Remove(drow);
    });

    return {
      scrollBarWheel: (event: WheelEventInit) => {
        if (event.deltaY == undefined) {
          return;
        }

        if (event.deltaY < 0) {
          //console.log('上滚');
          _space++;
          //业务代码
        } else if (event.deltaY > 0) {
          //下滚
          //console.log('下滚');
          _space--;
        } else {
          console.error('Mouse wheel zooming in and out status acquisition failed!');
        }

        eventData.Send(null);
      }
    };
  }
});
