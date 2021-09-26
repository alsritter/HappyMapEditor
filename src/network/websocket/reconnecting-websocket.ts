/**
 * reference https://github.com/daviddoran/typescript-reconnecting-websocket/blob/master/reconnecting-websocket.ts
 */
export default class ReconnectingWebSocket {
  //These can be altered by calling code
  public debug: boolean = false;

  //Time to wait before attempting reconnect (after close)
  public reconnectInterval: number = 1000;
  //Time to wait for WebSocket to open (before aborting and retrying)
  public timeoutInterval: number = 2000;

  //Should only be used to read WebSocket readyState
  public readyState: number;

  //Whether WebSocket was forced to close by this client
  private forcedClose: boolean = false;
  //Whether WebSocket opening timed out
  private timedOut: boolean = false;

  //List of WebSocket sub-protocols
  private protocols: string[] = [];

  //The underlying WebSocket
  private ws: WebSocket | null;
  private url: string;

  /**
   * Setting this to true is the equivalent of setting all instances of ReconnectingWebSocket.debug to true.
   */
  public static debugAll = false;

  //Set up the default 'noop' event handlers
  public onopen: (ev: Event) => void = (event: Event) => null;
  public onclose: (ev: CloseEvent) => void = (event: CloseEvent) => null;
  public onconnecting: () => void = () => null;
  public onmessage: (ev: MessageEvent) => void = (event: MessageEvent) => null;
  public onerror: (ev: ErrorEvent) => void = (event: ErrorEvent) => null;

  /**
   * 创建一个带有心跳和重连机制的 WebSocket 客户端
   *
   * @param url url
   * @param protocols 指定子协议（就是携带一个自带的头） 参考资料 https://segmentfault.com/q/1010000022700936
   */
  constructor(url: string, protocols: string[] = []) {
    this.url = url;
    this.protocols = protocols;
    this.readyState = WebSocket.CONNECTING;
    this.ws = null;
    this.connect(false);
  }

  /**
   * 连接
   * @param reconnectAttempt 是否重连
   */
  public connect(reconnectAttempt: boolean): void {
    this.ws = new WebSocket(this.url, this.protocols);
    // 执行自定义的重连操作
    this.onconnecting();
    this.log('ReconnectingWebSocket', 'attempt-connect', this.url);

    const localWs = this.ws;

    // 这里是连接超时时会执行的方法（如果连接成功则会执行 clearTimeout(timeout) 方法来避免执行回调函数）
    // 这里的超时操作只是用来判断这个 connect 方法有没有执行成功的，与心跳无关
    const timeout = setTimeout(() => {
      this.log('ReconnectingWebSocket', 'connection-timeout', this.url);
      this.timedOut = true;
      // 超时关闭
      localWs.close();
      this.timedOut = false;
    }, this.timeoutInterval);

    this.ws.onopen = (event: Event) => {
      clearTimeout(timeout);
      this.log('ReconnectingWebSocket', 'onopen', this.url);
      this.readyState = WebSocket.OPEN;
      reconnectAttempt = false;
      // 开启一个心跳检测
      this.startHeartCheck(this.ws as WebSocket);
      this.onopen(event);
    };

    /**
     * 别弄混了，当调用了 ws.close() 方法后会回调这个 onclose 方法
     */
    this.ws.onclose = (event: CloseEvent) => {
      clearTimeout(timeout);
      this.ws = null;
      if (this.forcedClose) {
        this.readyState = WebSocket.CLOSED;
        this.onclose(event);
      }
      // 如果不是强制关闭，还有可能能重连
      else {
        // 超时了，重新连接
        this.readyState = WebSocket.CONNECTING;
        // 执行自定义的重连操作
        this.onconnecting();
        // 如果没有开启重试或超时，则执行自定义的 onclose 事件
        if (!reconnectAttempt && !this.timedOut) {
          this.log('ReconnectingWebSocket', 'onclose', this.url);
          this.onclose(event);
        }
        setTimeout(() => {
          this.connect(true);
        }, this.reconnectInterval);
      }
    };

    this.ws.onmessage = (event) => {
      this.log('ReconnectingWebSocket', 'onmessage', this.url, event.data);
      // 拿到任何消息都说明当前连接是正常的，重置心跳检查（就是靠这个 onmessage 维系心跳检测的）
      this.startHeartCheck(this.ws as WebSocket);
      this.onmessage(event);
    };

    this.ws.onerror = (event) => {
      this.log('ReconnectingWebSocket', 'onerror', this.url, event);
      this.onerror(event as ErrorEvent);
    };
  }

  public send(data: any): void {
    if (this.ws) {
      this.log('ReconnectingWebSocket', 'send', this.url, data);
      return this.ws.send(data);
    } else {
      throw 'INVALID_STATE_ERR : Pausing to reconnect websocket';
    }
  }

  /**
   * Returns boolean, whether websocket was FORCEFULLY closed.
   */
  public close(): boolean {
    if (this.ws) {
      this.forcedClose = true;
      this.ws.close();
      return true;
    }
    return false;
  }

  /**
   * Additional public API method to refresh the connection if still open (close, re-open).
   * For example, if the app suspects bad data / missed heart beats, it can try to refresh.
   *
   * Returns boolean, whether websocket was closed.
   */
  public refresh(): boolean {
    if (this.ws) {
      this.ws.close();
      return true;
    }
    return false;
  }

  private log(...args: any[]): void {
    if (this.debug || ReconnectingWebSocket.debugAll) {
      console.debug(args);
    }
  }

  private timeoutObj: number = 0;
  private serverTimeoutObj: number = 0;
  private heartInterval: number = 1000;

  /**
   * 心跳检测
   */
  private startHeartCheck = (ws: WebSocket): void => {
    console.log('start');
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.timeoutObj = setTimeout(() => {
      //这里发送一个心跳，后端收到后，返回一个心跳消息
      ws.send('0x9'); // 这里随便发什么，只要确保后端收到心跳请求能返回数据就行了，这里规定 ping：0x9、pong：0xA
      if (this.timedOut) {
        const that = this;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.serverTimeoutObj = setTimeout(() => {
          // 如果超时了则关闭 Socket 的连接
          that.close();
          // createWebSocket();
        }, this.timeoutInterval);
      }
    }, this.heartInterval);
  };
}
