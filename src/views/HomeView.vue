<template>
  <!-- 侧边导航栏 -->
  <el-container class="index-con">
    <el-aside style="width: 240px">
      <LeftNav></LeftNav>
    </el-aside>

    <!--  头部导航栏  -->
    <el-container class="main-con">
      <el-header class="index-header" style="padding: 0">
        <TopNav></TopNav>
      </el-header>

      <!--   内容主体   -->
      <el-main clss="index-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LeftNav from "@/components/leftNav/LeftNav.vue";
import TopNav from "@/components/topNav/TopNav.vue";

export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };

    return {
      tableData: Array(20).fill(item)
    }
  },
  components: {
    TopNav,
    LeftNav
  },
  // components: {left-nav}
  beforeRouteEnter(to,from,next) {
    let user = localStorage.getItem('user')
    if (!user) {
      this.$router.push('/')
    }else {
      next()
    }
  }

};
</script>

<style>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}

.asideshow {
  width: 240px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}

.index-header,
.index-main {
  padding: 0px;
  border-left: 2px solid #333;
  width: 100%;
}
</style>