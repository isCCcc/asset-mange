<template>
  <div class="app-container">
    <div style="margin: 0 0 20px 0">产品维修受理中心</div>
    <!--  列表展示  -->
    <el-table :data="form" stripe style="width: 80vw">
      <!--      <el-table-column prop="uni_id" label="维修编号"/>-->
      <el-table-column prop="m_id" label="设备编号"/>
      <el-table-column prop="m_name" label="设备名称"/>
      <el-table-column prop="root" label="申请人"/>
      <el-table-column prop="m_create" label="引入时间"/>
      <el-table-column prop="m_history" label="维修时间"/>
      <el-table-column prop="m_status" label="审批状态"/>
      <el-table-column prop="m_desc" label="维修原因"/>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <template v-if="scope.row.m_status=='受理中'">
            <el-button @click="handleAccept(scope.row,'success')" type="text" size="small">完成</el-button>
            <el-button @click="handleAccept(scope.row,'fail')" type="text" size="small">失败</el-button>
          </template>
          <template v-else-if="scope.row.m_status=='申请中'">
            <el-button @click="handleAccept(scope.row)" type="text" size="small">受理</el-button>
          </template>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "CenterOfAccept",
  data() {
    return {
      maintainData: JSON.parse(localStorage.getItem('maintainData'))
          .filter(item => item.m_status != '待维修'),
      form: [],
    }
  },
  //路由守卫，验证用户身份
  beforeRouteEnter(to, from, next) {
    let user = JSON.parse(localStorage.getItem('user'))[0]
    if (user.identity === '超级管理员') {
      next()
    } else {
      next('/noAllow')
    }
  },
  created() {
    this.maintainData.map(item => {
      for (let val of item.m_history) {
        this.form.push({
          uni_id: val.id,
          m_id: item.m_id,
          m_name: item.m_name,
          root: val.root,
          m_create: item.m_create,
          m_history: val.time,
          m_status: val.status,
          m_desc: val.desc
        })
      }
    })
  },
  methods: {
    // 受理 按钮逻辑,维修 成功 / 失败 按钮逻辑
    handleAccept(val, flag) {
      // console.log(this.form);
      this.form.map(item => {
        if (item.uni_id === val.uni_id) {
          if (flag === 'success') item.m_status = '维修完成'
          else if (flag === 'fail') item.m_status = '维修失败'
          else item.m_status = '受理中'
        }
      })
      let maintain = JSON.parse(localStorage.getItem('maintainData'))
      maintain.map(item => {
        let hasMaintain = false
        for (let history of item.m_history) {
          if (history.id === val.uni_id) {
            if (flag === 'success') history.status = '维修完成'
            else if (flag === 'fail') history.status = '维修失败'
            else history.status = '受理中'
          }
          // eslint-disable-next-line no-unused-vars
          if (history.status === '受理中') hasMaintain = true
          if (!hasMaintain) item.m_status = '已完成'
        }
      })
      localStorage.setItem('maintainData', JSON.stringify(maintain))
    },
  }
}
</script>

<style scoped>

</style>