<template>
  <span>当前已选的 Tile</span>
  <div class="current-tile">
    <el-image v-for="item of items" :key="item.key" :src="item.url" :title="item.key" @click="selectedTile($event, item)">{{ item.key }}</el-image>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/mystore';
import { TileData } from '@/mystore/types';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  setup() {
    const store = useStore();
    const items = computed(() => store.getters.getAllCollectTile());

    function selectedTile(event: Event, tile: TileData) {
      store.action.currentTileModify({
        isCollect: true,
        spriteId: tile.tileSpriteId,
        key: tile.key,
        path: tile.url,
        name: '',
        desc: '',
        image: tile.image
      });
    }

    return {
      items,
      selectedTile
    };
  }
});
</script>

<style lang="scss" scoped>
.current-tile {
  width: 100%;
  height: 300px;
  background-color: #bebeb0;
  margin-top: 7px;
  margin-bottom: 18px;
  overflow-y: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: url('@/assets/img/transparent.png') repeat center center;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
