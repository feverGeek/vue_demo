<template>
  <div id="admin-index">
    <!-- 导航栏开始 -->

      <NavigationBar />
    <!-- 导航栏结束 -->
    <router-view />
  </div>
</template>
<script>
import NavigationBar from './NavigationBar.vue'

export default {
  name: 'AdminIndex',
  created() {

  },
  components: {
    NavigationBar
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
<style>
</style>
