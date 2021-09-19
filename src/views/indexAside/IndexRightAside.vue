<template>
  <div class="index-aside">
    <el-card class="box-card">
      <collect-list />
    </el-card>
    <el-card class="box-card">
      <layer-select />
    </el-card>
    <el-card class="box-card"><effect-list /></el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayerSelect from '@/components/layerSelect/LayerSelect.vue';
import CollectList from '@/components/collectList/CollectList.vue';
import EffectList from '@/components/effectList/EffectList.vue';

export default defineComponent({
  components: {
    LayerSelect,
    CollectList,
    EffectList
  },
  setup() {
    return {};
  }
});
</script>

<style lang="scss" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
