<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>这里是teleported, count 值为： {{ count }}</p>
      <!-- <teleport to="#teleportId" v-if="count !== 3"> 传送指定节点 -->
      <teleport to="body" v-if="count !== 3">
        <div>
          <div>我是组件里的内容</div>
          <div @click="teleEvt">我是组件里的内容，搬定了事件</div>
        </div>
      </teleport>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  name: "HelloWorld",
  props: {
    title: {
      type: String,
      default: "距结束还有"
    }
  },
  setup(props, context) {
    console.log(props);
    console.log("-------props-------");
    context.emit("hellemit");
    console.log();
    console.log("------context------");
    const state = reactive({
      count: 0
    });
    const teleEvt = () => {
      state.count++;
    };
    return {
      teleEvt,
      ...toRefs(state)
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
