<template>
  <div class="tile-list">
    <el-image v-for="item of items" :key="item.name" :src="item.path" :title="item.desc" lazy @click="selectedTile(item)"></el-image>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/mystore';
import { defineComponent, ref } from 'vue';
import axios from '@/network';

export default defineComponent({
  setup() {
    const store = useStore();
    const items = ref([]) as any;

    axios.getData
      .getTileList()
      .then((res) => {
        items.value = res;
      })
      .catch((error) => {
        console.error(error);
      });

    function selectedTile(tile: any) {
      store.action.currentTileModify(tile.index, tile.path, tile.name, tile.desc);
    }

    return { items, selectedTile };
  }
});
</script>

<style lang="scss" scoped>
.tile-list {
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
  margin: 5px;
  width: 30px;
  height: 30px;

  &:hover {
    -webkit-filter: brightness(50%); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */
    filter: brightness(50%);
    cursor: pointer;
  }
}
</style>
