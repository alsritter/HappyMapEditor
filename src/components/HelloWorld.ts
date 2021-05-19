import * as MyEvent from '../ts/util/EventTools';

class Test implements MyEvent.IEventObserver {
  constructor() {
    MyEvent.EventManager.Register(this, MyEvent.EventID.TEST);
  }

  HandleEvent<T>(resp: MyEvent.EventData<T>): void {
    console.log('执行了');
    console.log(resp);
  }
}

const temp = new Test();

export default {
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
    const INIT_OPTIONS = {
      width: 640,
      height: 480,
      color: '#00FF00',
      label: 'VGA'
    };

    // 这里使用 typeof 快速匹配类型
    const event = MyEvent.EventData.CreateEvent<typeof INIT_OPTIONS>(MyEvent.EventID.TEST);

    return {
      onclick: () => {
        event.Send(INIT_OPTIONS);
      }
    };
  },
  // 要在生命周期结束时销毁，否则会导致内存泄漏（因为在 EventManager 中一直被引用着，没有释放）
  beforeUnmount() {
    console.log('销毁');
    MyEvent.EventManager.Remove(temp);
  }
};
