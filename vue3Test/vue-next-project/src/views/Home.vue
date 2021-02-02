<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" :data="count" @hellemit="hellemit" />
  </div>
  <div>
    <p>{{ vue2Data }}</p>
  </div>
  <p>count 值{{ count }} 这是p标签1</p>
  <p>count 值{{ count }} 这是p标签1</p>
  <p>count 值{{ count }} 这是p标签1</p>
  <p @click="addCount">这是p标签2</p>
</template>

<script>
// @ is an alias to /src
import {
  reactive,
  ref,
  toRefs,
  computed,
  watch,
  onMounted,
  onBeforeMount,
  onBeforeUnmount,
  onUnmounted
} from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

// vue3 的reactive ref 取代vue2 中的data 数据定义
export default {
  name: "Home",
  setup(props, context) {
    const state = reactive({
      count: 0
    });
    const addCount = function() {
      state.count++;
      console.log(state.count);
    };
    onBeforeMount(() => {
      console.log("--vue3 onBeforeMount--");
    });
    onMounted(() => {
      console.log("--vue3 onMounted--");
    });
    onBeforeUnmount(() => {
      console.log("--vue3 onBeforeUnmount--");
    });
    onUnmounted(() => {
      console.log("--vue3 onUnmounted--");
    });
    
    console.log(this);
    // 是没有this 的  undefined
    // 直接...state 失去响应
    return {
      addCount,
      ...toRefs(state)
    };
  },
  components: {
    HelloWorld
  },
  data() {
    return {
      vue2Data: 123
    };
  },
  beforeCreate() {
    console.log("---vue2-beforeCreate----");
  },
  created() {
    console.log("---vue2-create----");
  },
  beforeMount() {
    console.log("---vue2-beforeMount----");
  },
  mounted() {
    console.log("---vue2-mounted----");
    this.testMethods();
    console.log(this);
  },
  //   beforeDestroy() {
  //   废弃，编译报错提示
  //     console.log("---vue2-beforeDestroy----");
  //   },
  //   destroyed() {
  //     console.log("---vue2-destroyed----");
  //   },
  beforeUnmount() {
    console.log("---vue2-beforeUnmount----");
  },
  unmounted() {
    console.log("---vue2-unmounted----");
  },
  methods: {
    testMethods() {
      console.log("---vue2 testMethods 执行----");
    },
    testMethods2() {
      console.log("---vue2 testMethods2 执行----");
    },
    hellemit(){
        console.log(0)
    }
  }
};
</script>
