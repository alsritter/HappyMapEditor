export default class SocketClient {
  ip: string;
  port: number;
  interval: number;

  private lockReconnect = false; //避免重复连接
  private ws: WebSocket | undefined;
  private tt: number;
  private timeoutObj: number;
  private serverTimeoutObj: number;
  private callback: (event: MessageEvent) => void;
  private wsUrl: string;

  /**
   * WebSocker 客户端
   * @param ip ip 地址或者域名地址
   * @param port 服务端的端口号
   * @param interval 心跳包 默认 10秒
   * @param callback 接收消息的操作
   */
  constructor(ip: string, port: number, callback: (event: MessageEvent) => void, interval = 3000) {
    this.ip = ip;
    this.port = port;
    this.interval = interval;
    this.callback = callback;

    this.serverTimeoutObj = 0;
    this.timeoutObj = 0;
    this.tt = 0;
    this.wsUrl = 'ws://' + this.ip + ':' + this.port + '/websocket/312';
    // this.ws = new WebSocket(url);
    this.createWebSocket(this.wsUrl);
  }

  /**
   * 发送数据
   * @param message 待发送的数据
   */
  public send = (message: string): void => {
    this.ws?.send(message);
  };

  /**
   * 创建 WebSocket 实例
   * @param wsUrl
   */
  private createWebSocket = (wsUrl: string): void => {
    try {
      this.ws = new WebSocket(wsUrl);
      this.init();
    } catch (e) {
      console.error(e);
      this.reconnect(wsUrl);
    }
  };

  /**
   * 重连操作
   * @param url
   * @returns
   */
  private reconnect = (url: string): void => {
    if (this.lockReconnect) {
      return;
    }

    this.lockReconnect = true;
    // 没连接上会一直重连，设置延迟避免请求过多
    // 这个 clearTimeout 方法可取消由 setTimeout() 方法设置的定时操作。
    // 这里使用 && 短路运算，只有第一返回非 0 时才会执行 && 右边的操作
    this.tt && clearTimeout(this.tt);

    this.tt = setTimeout(() => {
      this.createWebSocket(url);
      this.lockReconnect = false;
    }, 4000);
  };

  /**
   * 初始化操作
   * @param url
   * @returns
   */
  private init = (): void => {
    const ws = this.ws;
    const url = this.wsUrl;

    if (ws == undefined) throw Error('WebSocket 创建失败');

    ws.onclose = () => {
      console.log('链接关闭');
      this.reconnect(url);
    };

    ws.onerror = () => {
      console.log('发生异常了');
      this.reconnect(url);
    };

    ws.onopen = () => {
      //心跳检测重置
      this.startHeartCheck(ws);
    };

    ws.onmessage = (event) => {
      // 拿到任何消息都说明当前连接是正常的
      this.startHeartCheck(ws);
      this.callback(event);
    };
  };

  /**
   * 心跳检测
   */
  private startHeartCheck = (ws: WebSocket): void => {
    console.log('start');
    // 短路操作，逻辑同上
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);

    this.timeoutObj = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息
      ws.send('0x9'); // 这里随便发什么，只要确保后端收到心跳请求能返回数据就行了，这里规定 ping：0x9、pong：0xA
      // 这里等待后端返回心跳
      this.serverTimeoutObj = setTimeout(() => {
        // 如果超时了则关闭 Socket 的连接
        ws.close();
        // createWebSocket();
      }, this.interval);
    }, this.interval);
  };
}
