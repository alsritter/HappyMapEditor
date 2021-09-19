<template>
  <div>
    <el-select v-model="eff" multiple placeholder="选择 Tile 携带效果">
      <el-option v-for="item in effects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { watch, defineComponent, ref, computed } from 'vue';
import { useStore } from '@/mystore';
import axios from '@/network';

export default defineComponent({
  setup() {
    const store = useStore();
    const eff = ref([] as string[]);
    const effects = ref([] as Lb[]);
    const key = computed(() => store.state.tile.key);
    store.state.effects.get(key.value)?.forEach((o) => {
      eff.value.push(o);
    });

    type Lb = {
      value: string;
      label: string;
    };

    axios.getData
      .getEffectList()
      .then((res) => {
        effects.value = [];
        for (const item of res as any[]) {
          effects.value.push({
            value: item.effect_id,
            label: item.effect
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // const eff = computed(() => store.state.effects);
    watch(eff, (value) => {
      // console.log(value);
      if (value) {
        if (!key.value) return;
        const result = [];
        for (const item of value) {
          result.push(item);
        }
        store.action.effectModify(key.value, result);
      }
    });

    watch(
      () => store.state.tile.key,
      (value) => {
        if (value) {
          eff.value = [];
          const arr = store.state.effects.get(value);
          if (!arr) return;
          for (const item of arr) {
            eff.value.push(item);
          }
        }
      }
    );

    return {
      effects,
      eff
    };
  }
});
</script>

<style lang="scss" scoped></style>
