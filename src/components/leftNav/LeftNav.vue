<template>
  <el-menu class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <!--        <el-menu :default-openeds="['1', '3']">-->
    <div class="logobox">
      <img class="logoimg" src="../../assets/img/logo.png" alt="">
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>资产入库</template>
      <el-menu-item-group>
        <router-link to="/display">
          <el-menu-item index="1-1">资产入库</el-menu-item>
        </router-link>
        <router-link to="/verify">
          <el-menu-item index="1-2">修改记录</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>资产出归</template>
      <el-menu-item-group>
        <router-link to="/borrow">
          <el-menu-item index="2-1">借用申请</el-menu-item>
        </router-link>
        <router-link to="/examine">
          <el-menu-item index="2-2">借用审批</el-menu-item>
        </router-link>
        <router-link to="/return">
          <el-menu-item index="2-3">资产归还</el-menu-item>
        </router-link>
        <router-link to="/returnTable">
          <el-menu-item index="2-4">归还记录</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i>产品维修</template>
      <el-menu-item-group>
        <router-link to="/maintain">
          <el-menu-item index="3-1">产品维修</el-menu-item>
        </router-link>
        <router-link to="/accept">
          <el-menu-item index="3-2">受理中心</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i>资产报废</template>
      <el-menu-item-group>
        <router-link to="/scrap">
          <el-menu-item index="4-1">报废中心</el-menu-item>
        </router-link>
        <router-link to="/audit">
          <el-menu-item index="4-2">审批中心</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title"><i class="el-icon-setting"></i>资产盘点</template>
      <el-menu-item-group>
        <router-link to="/check">
          <el-menu-item index="5-1">资产盘点</el-menu-item>
        </router-link>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "leftNav"
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  height: 100vh;
  overflow-y: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
}

.el-menu-item-group__title {
  padding: 0px;
}

.el-menu-bg {
  background-color: #1f2d3d !important;
}

.el-menu {
  border: none;
}

.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}

.logoimg {
  height: 40px;
}
</style>