<template>
  <div class="prefab-list">
    <el-image v-for="item of items" :key="item.name" :src="item.path" :title="item.desc" fit="contain"></el-image>
  </div>
</template>

<script lang="ts">
import axios from '@/network';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const items = ref([]) as any;
    axios.getData
      .getPrefabList()
      .then((res) => {
        items.value = res;
      })
      .catch((error) => {
        console.error(error);
      });

    return { items };
  }
});
</script>

<style lang="scss" scoped>
.prefab-list {
  height: 400px;
  width: 400px;
  overflow-y: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: url('@/assets/img/transparent.png') repeat center center;
}

.el-image {
  // height: 30px;
  margin: 2px;
  max-height: 50px;
  max-width: 50px;

  &:hover {
    -webkit-filter: brightness(50%);
    filter: brightness(50%);
    cursor: pointer;
  }
}
</style>
