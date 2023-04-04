<template>
  <div id="admin-index">
    <div class="menu">
        <!-- 导航栏开始 -->
        <NavigationHeader/> 
        <NavigationBar/>
        <!-- 导航栏结束 -->
        <router-view />
    </div>
    <div class="content">

    </div>
  </div>
</template>
<script>
import NavigationHeader from './NavigationHeader.vue'
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

<style scoped>
.admin-index {
  display: flex;
}
</style>
