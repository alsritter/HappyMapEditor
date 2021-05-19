import { EventID } from './EventID';
import EventMananger from './EventManager';

/**
 * 传输事件的基本单元，如果想要传输更多不一样的数据需要自己再实例一个对象
 */
export default class EventData<T> {
  public eid: EventID;
  private _data: T | null;

  /**
   * 这里使用 private 修饰，避免用户直接创建这个对象
   * @param eid 当前事件的类型
   */
  private constructor(eid: EventID) {
    this.eid = eid;
    this._data = null;
  }

  public Send(arg: T): void {
    this._data = arg;
    EventMananger.getInstance().SendEvent(this);
  }

  public get data(): T | null {
    return this._data;
  }

  public static CreateEvent<T>(eventId: EventID): EventData<T> {
    return new EventData<T>(eventId);
  }
}
