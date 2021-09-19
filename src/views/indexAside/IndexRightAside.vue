<template>
  <div class="index-aside">
    <el-card class="box-card">
      <collect-list />
    </el-card>
    <el-card class="box-card">
      <layer-select />
    </el-card>
    <el-card class="box-card select-bg">
      <background-select class="bg-s" />
      <el-divider>背景信息</el-divider>
      <span>当前选中背景： {{ store.state.bgName }}</span>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/mystore';
import BackgroundSelect from '@/components/backgroundSelect/BackgroundSelect.vue';
import LayerSelect from '@/components/layerSelect/LayerSelect.vue';
import CollectList from '@/components/collectList/CollectList.vue';

export default defineComponent({
  components: {
    LayerSelect,
    CollectList,
    BackgroundSelect
  },
  setup() {
    const store = useStore();
    return { store };
  }
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}

.bg-s {
  // display: inline;
  display: block;
  text-align: right;
}
</style>
