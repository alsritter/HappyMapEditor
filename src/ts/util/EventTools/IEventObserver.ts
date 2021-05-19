import EventData from './EventData';

/**
 * 事件监听者基类
 */
export interface IEventObserver {
  HandleEvent<T>(resp: EventData<T>): void;
}
