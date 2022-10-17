<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
<!--    <el-button class="buttonimg">-->
<!--      <img class="showimg" :src="collapsed?imgsq:imgshow" @click="toggle(collapsed)">-->
<!--    </el-button>-->
    <el-submenu index="2" class="submenu" style="float: right">
      <template slot="title">超级管理员</template>
      <el-menu-item index="2-1">设置</el-menu-item>
      <el-menu-item @click="content()" index="2-2">个人中心</el-menu-item>
      <el-menu-item @click="exit()" index="2-3">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "TopNav",
  data() {
    return {
      collapsed: true,
      imgshow: require('../../assets/img/show.png'),
      imgsq: require('../../assets/img/sq.png'),
      user: {}
    }
  },
  methods:{
    toggle(){},
    content(){},
    exit(){},
  }
}
</script>

<style scoped>
.el-menu-demo{
  width: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
}
.submenu {
  float: right;
}
.buttonimg {
  height: 60px;
  background-color: transparent;
  border: none;
}
.showimg {
  width: 26px;
  height: 26px;
  position: absolute;
  top: 17px;
  left: 17px;
}
.showimg:active {
  border: none;
}
</style>