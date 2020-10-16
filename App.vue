<template>
  <div id="app">
    <!-- 页面切换动画transitionName -->
    <transition :name="transitionName">
      <!-- 缓存数据 <router-view> -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: ""
    };
  },
  create() {},
  mounted() {
    if (document.body.scrollHeight >= document.documentElement.clientHeight) {
      document.body.style.height = document.body.scrollHeight + "px";
    } else {
      document.body.style.height = document.documentElement.clientHeight + "px";
    }
  },
  /* 页面切换动画 */
  watch: {
    //使用watch 监听$router的变化
    $route(to, from) {
      //console.log("to=" + to.meta.index, "from=" + from.meta.index);
      //(1) 如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
      } else if (to.meta.index == 0 && from.meta.index > 0) {
        this.transitionName = "";
      }
      //(2) 当然，如果你没有需要设置索引值为0的页面可以直接用着一段
      // if (to.meta.index < from.meta.index) {
      //   this.transitionName = "slide-right";
      // } else {
      //   this.transitionName = "slide-left";
      // }
    }
  },
  methods: {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
.swiper {
  width: 100%;
  height: 100%;
}
.box-row-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.box-row-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.box-row-around {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.box-col-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.box-col-between {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.box-col-around {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.box-col-end {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  align-items: center;
}
.box-col-start {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
/* 页面切换动画 */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  /* will-change属性可以提前通知浏览器我们要对元素做什么动画，这样浏览器可以提前准备合适的优化设置 */
  will-change: transform;
  transition: all ease 0.4s;
  -webkit-transition: all ease 0.4s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}
/* 页面切换动画 */
</style>
