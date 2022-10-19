<template>
  <div class="app-container">
    <!--查询筛选-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="已废设备">
        <el-input placeholder="已废设备" v-model="scrapName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>报废申请</el-button>
      </el-form-item>
    </el-form>

    <!--  报废历史  -->
    <div class="scarp-history">
      <template v-for="item in scrapData">
        <el-descriptions :title="item.s_name" class="history-item">
          <el-descriptions-item label="设备编号">{{ item.s_id }}</el-descriptions-item>
          <el-descriptions-item label="报废人">{{ item.s_uid }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small" :type="item.s_tag==='异常报废'?'danger':''">{{ item.s_tag }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="引入时间">{{ item.s_create }}</el-descriptions-item>
          <el-descriptions-item label="销毁时间">{{ item.s_time }}</el-descriptions-item>
          <el-descriptions-item label="销毁原因">{{ item.s_res }}</el-descriptions-item>
        </el-descriptions>
      </template>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Scrap",
  data() {
    return {
      source: JSON.parse(localStorage.getItem('scrapData'))
          .sort((a, b) => dayjs(b.s_time) - dayjs(a.s_time)),
      scrapData: '',  // 报废设备信息
      scrapName: ''  // 查找报废设备名称
    }
  },
  created() {
    this.scrapData = this.source
  },
  watch: {
    scrapName(val) {
      if (!val) {
        this.scrapData = this.source
      } else {
        this.scrapData = this.source.filter(item =>
            item.s_name.indexOf(val) >= 0
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  justify-content: center;
  //border: 1px solid red;
  position: relative;
  padding: 10px 0;

  .scarp-history {
    max-height: 50vh;
    position: absolute;
    min-width: 75%;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    margin-top: 10px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);

    .history-item {
      margin: 0 0 10px 0;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}

</style>