<template>
  <div class="nav">
    <ul>
      <li v-for="item in NavList" class="nav-item" @click="clickNav($event)">
        <div>
          <img class="nav-icon" :src="item.icon" width="20px" height="20px" alt="sy">
          <router-link :to="item.url">{{ item.title }}</router-link>
        </div>
      </li>
    </ul>
    <div class="nav-img-box" style="margin-top: 10;">
      <img src="../../assets/ionicons/logo-github.svg" alt="zs">
    </div>
  </div>
</template>

<script setup>
import { reactive } from '@vue/reactivity'

var NavList = reactive([
  {
    title: "Tasks",
    url: "/admin/tasks",
    icon: "../../src/assets/ionicons/list.svg"
  },
  {
    title: "Workers",
    url: "/admin/workers",
    icon: "../../src/assets/ionicons/list.svg"
  },
  {
    title: "Workbooks",
    url: "/admin/workbooks",
    icon: "../../src/assets/ionicons/list.svg"
  },
  {
    title: "Sheets",
    url: "/admin/sheets",
    icon: "../../src/assets/ionicons/list.svg"
  },
  {
    title: "SheetTemplates",
    url: "/admin/sheettemplates",
    icon: "../../src/assets/ionicons/list.svg"
  },
  {
    title: "Log",
    url: "/admin/log",
    icon: "../../src/assets/ionicons/list.svg"
  }
])

function clickNav(e) {
  var domList = e.currentTarget.parentNode.children
  for (let index = 0; index < domList.length; index++) {
    domList[index].className = 'nav-item'
  }
  console.log('click', e.currentTarget)
  e.currentTarget.className = 'nav-item isclick'
}
</script>

<style scoped>
li {
  list-style-type: none;
}

a {
  text-decoration: none;
  color: #39475a;
}

.nav {
  width: 200px;
  height: 100%;
  background: #ffffff;
  box-shadow: 3px 0px 6px 0px rgba(82, 82, 82, 0.14);
}

.nav ul {
  margin-top: 32px;
  padding: 0;
}

.nav-item {
  width: 200px;
  height: 46px;
  font-size: 16px;
  color: #39475A;
  letter-spacing: 0;
  line-height: 46px;
  font-weight: 500;
}

.nav-item div {
  margin-left: 17px;
  height: 46px;
  line-height: 46px;
}

.nav-item div img {
  width: 20px;
  height: 20px;
}

.nav-icon {
  vertical-align: middle;
  margin-right: 7px;
  padding-bottom: 6px;
}

.isclick {
  background: #e9feff;
  color: #0bbfbc;
}

.nav-img-box img {
  width: 200px;
  height: 416px;
}
</style>