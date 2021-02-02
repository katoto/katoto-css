<template>
  <div>
    案例测试
  </div>
  <div>
    {{ num }}
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const num = ref(1);
    return { num };
  }
};
</script>
