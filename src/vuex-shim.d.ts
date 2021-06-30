import { IRootState } from './store/interfaces';
import { Store } from 'vuex';

/**
 * 让支持 $store
 * 参考官方文档
 * https://v3.cn.vuejs.org/guide/typescript-support.html#%E4%B8%BA-globalproperties-%E6%89%A9%E5%85%85%E7%B1%BB%E5%9E%8B
 */
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<IRootState>;
  }
}
