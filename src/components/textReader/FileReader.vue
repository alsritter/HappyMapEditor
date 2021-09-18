<template>
  <label class="text-reader">
    <input type="file" accept="application/json" @change="loadTextFromFile" />
    导入地图
  </label>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * 参考资料：https://www.digitalocean.com/community/tutorials/vuejs-file-reader-component
 */
export default defineComponent({
  setup(props, ctx) {
    function loadTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      // reader.onload = (e) => this.$emit('load', e.target.result);
      reader.onload = (e) => {
        ctx.emit('load', e.target.result);
      };
      reader.readAsText(file);
    }
    return { loadTextFromFile };
  }
});
</script>

<style scoped lang="scss">
input[type='file'] {
  display: none;
}
.text-reader {
  display: inline-block;
  min-height: 15px;
  padding: 7px 15px;
  line-height: 1;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  background: var(--el-button-success-color);
  background-color: #67c23a;
  color: var(--el-button-font-color, #ffffff);
  border-color: var(--el-button-border-color, #67c23a);
  border-radius: calc(var(--el-border-radius-base) - 1px);

  &:hover {
    // -webkit-filter: brightness(-50%); /*考虑浏览器兼容性：兼容 Chrome, Safari, Opera */
    // filter: brightness(-50%);
    color: #e6e6e6;
    border-color: var(--el-color-success-hover-7);
    background-color: #85ce61;
    outline: 0;
  }

  &:focus {
    color: #e6e6e6;
    border-color: var(--el-color-success-light-7);
    background-color: #85ce61;
    outline: 0;
  }
}
</style>
