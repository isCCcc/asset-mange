<template>
  <div class="app-container">
    <el-table :data="scrapHistory" stripe style="width: 80%">
      <el-table-column prop="s_id" label="设备编号">
      </el-table-column>
      <el-table-column prop="s_name" label="设备名称">
      </el-table-column>
      <el-table-column prop="s_uid" label="申请人">
      </el-table-column>
      <el-table-column prop="s_create" label="引入时间">
      </el-table-column>
      <el-table-column prop="s_time" label="报废时间">
      </el-table-column>
      <el-table-column prop="s_status" label="审批状态">
      </el-table-column>
      <el-table-column prop="s_res" label="报废原因">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">通过</el-button>
          <el-button type="text" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "报废审核中心",
  data() {
    return {
      scrapHistory: JSON.parse(localStorage.getItem('scrapHistory')) || [],
    }
  },
  methods: {
    //审核通过
    handleClick(row) {
      console.log(row);
      this.scrapHistory.map(item => {
        if (item.s_id === row.s_id) {
          item.s_status = '已审批'
        }
      })
      //报废历史新增一条数据
      localStorage.setItem('scrapHistory', JSON.stringify(this.scrapHistory))
      //报废申请历史新增一条数据
      let scrapData = JSON.parse(localStorage.getItem('scrapData'))
      scrapData.push(row)
      localStorage.setItem('scrapData', JSON.stringify(scrapData))
      //可用设备减少一条数据
      let assetData=JSON.parse(localStorage.getItem('assetData')).filter(item=>item.id!=row.s_id)
      localStorage.setItem('assetData', JSON.stringify(assetData))
    }
  },
}
</script>

<style scoped>

</style>