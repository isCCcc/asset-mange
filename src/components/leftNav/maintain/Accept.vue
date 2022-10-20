<template>
  <div class="app-container">
    产品维修受理中心
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
          <template v-if="scope.row.m_status!=='申请中'">
            <el-button type="text" size="small">完成</el-button>
            <el-button type="text" size="small">失败</el-button>
          </template>
          <template v-else>
            <el-button @click="handleAccept(scope.row)" type="text" size="small">受理</el-button>
          </template>
        </template>
      </el-table-column>

    </el-table>

    <!--  申请驳回弹出框  -->
    <!--    <el-dialog title="审批意见" :visible.sync="dialogVisible"-->
    <!--               width="30%" :before-close="handleClose">-->
    <!--      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">-->
    <!--      </el-input>-->
    <!--      <span slot="footer" class="dialog-footer">-->
    <!--        <el-button @click="dialogVisible = false">取 消</el-button>-->
    <!--        <el-button type="primary" @click="onSubmit" :plain="true">确 定</el-button>-->
    <!--      </span>-->
    <!--    </el-dialog>-->
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
    handleAccept(val) {
      console.log(val);
    }
  }
}
</script>

<style scoped>

</style>