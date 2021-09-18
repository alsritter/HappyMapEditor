<template>
  <div class="index-aside">
    <el-card class="box-card">
      <collect-list />
    </el-card>
    <el-card class="box-card">
      <layer-select />
    </el-card>
    <el-card class="box-card"></el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayerSelect from '@/components/layerSelect/LayerSelect.vue';
import CollectList from '@/components/collectList/CollectList.vue';

export default defineComponent({
  components: {
    LayerSelect,
    CollectList
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
