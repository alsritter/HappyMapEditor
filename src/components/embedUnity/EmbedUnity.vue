<template>
  <div>
    <!-- <unity src="/dist/Build/Dist.json" width="1000" height="600" unityLoader="/dist/Build/UnityLoader.js" ref="unityvue"></unity> -->
    <iframe ref="iframe" src="/dist/index.html" frameborder="0" width="960px" height="650px" scrolling="no"></iframe>
  </div>
</template>

<script lang="ts">
import bus from '@/core/util/bus';
import { defineComponent, ref, Ref } from 'vue';

// 参考资料 https://blog.csdn.net/weixin_44957482/article/details/114658245
// https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html
export default defineComponent({
  setup() {
    const iframe = ref(null) as Ref<HTMLFrameElement | null>;
    // iframe.value?.contentWindow?.send('SetData', 'this is test Data');
    bus.on('unityRefresh', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore“ because it alters compilation errors
      iframe.value?.contentWindow.location.reload(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore“ because it alters compilation errors
      iframe.value.contentWindow.focus();
    });

    return { iframe };
  }
});
</script>

<style lang="scss" scoped></style>
