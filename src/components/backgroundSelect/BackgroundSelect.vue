<template>
  <div class="bg-list">
    <el-popover placement="left" trigger="click">
      <!-- <div v-for="item of items" :key="item.name">{{ item.name }}</div> -->
      <el-radio v-for="item of items" :key="item.name" v-model="radioValue" :label="item.bg_id" @change="changeBG(item)">{{ item.name }}</el-radio>
      <template #reference>
        <el-button>选择背景图片</el-button>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/mystore';
import axios from '@/network';

export default defineComponent({
  setup() {
    const store = useStore();
    const items = ref([]) as any;
    const radioValue = ref('');

    function changeBG(item: any) {
      store.action.backgroundModify(item.bg_id, item.path, item.name);
    }

    axios.getData
      .getBg()
      .then((res) => {
        items.value = res;
      })
      .catch((error) => {
        console.error(error);
      });

    return {
      items,
      radioValue,
      changeBG
    };
  }
});
</script>

<style lang="scss" scoped>
.bg-list {
  display: inline;
}
</style>
