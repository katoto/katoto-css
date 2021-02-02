<template>
  <div>
    <h1>suspense</h1>
    <p>suspense 组件里的内容</p>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Hello Suspense",
  async setup() {
    const state = reactive({
      count: 0
    });
    const _wait = () => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve("ok");
        }, 3000);
      });
    };
    await _wait();
    return {
      ...toRefs(state)
    };
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
