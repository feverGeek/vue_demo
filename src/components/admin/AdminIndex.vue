<template>
  <div class="menu">
    <!-- 导航栏开始 -->
    <NavigationHeader />
    <NavigationBar />
    <!-- 导航栏结束 -->


    <router-view />
  </div>
  <div class="content">
    <!-- 右边内容开始 -->
    <RightNavTop />
    <!-- 右边内容结束 -->
  </div>
</template>
<script>
import NavigationHeader from './NavigationHeader.vue'
import NavigationBar from './NavigationBar.vue'
import RightNavTop from './RightNavTop.vue';

export default {
  name: 'AdminIndex',
  created() {

  },
  components: {
    NavigationHeader,
    NavigationBar,
    RightNavTop
  },
  data() {
    return {
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}

</script>

<style scoped>
.menu {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 0;
  overflow: hidden;
  background-color: #263238;
}

.content {
  position: relative;
  background: #f1f4f5;
  height: 100%;
}
</style>
