<template>
  <el-menu class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
    <!--        <el-menu :default-openeds="['1', '3']">-->
    <div class="logobox">
      <img class="logoimg" src="../../assets/img/logo.png" alt="">
    </div>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-message"></i>资产入库</template>
      <el-menu-item-group>
        <el-menu-item index="1-1">资产展示</el-menu-item>
        <el-menu-item index="1-2">资产核实</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title"><i class="el-icon-menu"></i>资产出归</template>
      <el-menu-item-group>
        <el-menu-item index="2-1">出库</el-menu-item>
        <el-menu-item index="2-2">归还</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i>产品维修</template>
      <el-menu-item-group>
        <el-menu-item index="3-1">产品维修</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title"><i class="el-icon-setting"></i>资产报废</template>
      <el-menu-item-group>
        <el-menu-item index="3-1">报废记录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title"><i class="el-icon-setting"></i>资产盘点</template>
      <el-menu-item-group>
        <el-menu-item index="3-1">资产盘点</el-menu-item>
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
  overflow-y:hidden;
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