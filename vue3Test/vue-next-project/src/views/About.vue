<template>
  <div class="about">
    <h1>This is an about page</h1>
    <Suspense>
      <testSuspense />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
  <!-- <teleport to="#teleportId">
    <div>
      <div>我是About组件里的内容</div>
    </div>
  </teleport> -->
</template>
<script>
import testSuspense from "@/components/testSuspense.vue";
export default {
  components: {
    testSuspense
  }
};
</script>
