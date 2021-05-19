import * as Collections from 'typescript-collections';
import Singleton from '../Singleton';
import EventData from './EventData';
import { EventID } from './EventID';
import { IEventObserver } from './IEventObserver';

/**
 * 事件管理器
 */
export default class EventManager extends Singleton {
  //  维护一个观察者队列
  private observerList: Collections.Dictionary<EventID, Collections.LinkedList<IEventObserver>> = new Collections.Dictionary<
    EventID,
    Collections.LinkedList<IEventObserver>
  >();

  //private readonly eventQueue:Collections.Queue<EventData> = new Collections.Queue<EventData>(); //消息队列

  /**
   * 发送事件
   * @type 事件类型
   * @args 携带数据
   */
  public SendEvent<T>(eve: EventData<T>): void {
    // 如果没有观察者监听这个事件则结束
    if (!this.observerList.containsKey(eve.eid)) return;

    // 通知监听了这个事件的全部观察者
    const observers = this.observerList.getValue(eve.eid);
    observers?.forEach((x) => {
      if (x != null) {
        x.HandleEvent(eve);
      }
    });
  }

  /**
   * 注册一个监听者
   * @param newobj 需要注册的监听者
   * @param eid 需要监听的事件 ID
   */
  private RegisterObj(newobj: IEventObserver, eid: EventID): void {
    if (!this.observerList.containsKey(eid)) {
      const list = new Collections.LinkedList<IEventObserver>();
      list.add(newobj);
      this.observerList.setValue(eid, list);
    } else {
      const list = this.observerList.getValue(eid);
      list?.forEach((x) => {
        if (x == newobj) {
          return;
        }
      });
      list?.add(newobj);
    }
  }

  /**
   * 监听者在这里注册，注意这里形参是可变参数
   * @param newobj  需要被注册的监听者
   * @param eids 需要监听的事件列表
   * @returns
   */
  public static Register(newobj: IEventObserver, ...eids: EventID[]): void {
    for (const eid of eids) {
      EventManager.getInstance().RegisterObj(newobj, eid);
    }
  }

  /**
   * 移除监听者
   * @param removeObj 需要移除的监听对象
   */
  public RemoveObj(removeObj: IEventObserver): void {
    this.observerList.forEach((k, v) => {
      const list = v;
      list.remove(removeObj);
    });
  }

  /**
   * 移除一个监听者
   * @param removeObj 需要移除的对象
   * @returns
   */
  public static Remove(removeObj: IEventObserver): void {
    console.log(`销毁了 ${removeObj}`);

    EventManager.getInstance().RemoveObj(removeObj);
  }
}
