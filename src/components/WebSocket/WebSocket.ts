import { defineComponent, ref, watch } from 'vue';
import bus from '@/core/util/bus';
import { SocketClient } from '@/network/websocket';

export default defineComponent({
  setup() {
    // 服务器返回的数据
    bus.on('sendData', (data) => {
      // console.log(data);
    });

    const checked = ref(false);
    let wc = null as SocketClient | null;

    watch(
      () => checked.value,
      (newVal) => {
        if (newVal) {
          wc = new SocketClient('localhost', 6543, (event) => {
            // console.log(event);
          });
        } else {
          wc?.close();
          wc = null;
        }
      }
    );

    return {
      checked
    };
  }
});
