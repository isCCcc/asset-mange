<template>
  <div class="app-container">
    资产报废审批中心
    <!--  列表展示  -->
    <el-table :data="scrapHistory" stripe style="width: 80vw">
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
        <template slot-scope="scope" v-if="scope.row.s_status==='待审批'">
          <el-button @click="handlePass(scope.row)" type="text" size="small">通过</el-button>
          <el-button @click="handleBack(scope.row)" type="text" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  申请驳回弹出框  -->
    <el-dialog title="审批意见" :visible.sync="dialogVisible"
               width="30%" :before-close="handleClose">
      <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :plain="true">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Audit",
  data() {
    return {
      dialogVisible: false,
      textarea: '',
      row: '', // 记录被驳回的数据
      scrapHistory: JSON.parse(localStorage.getItem('scrapHistory')) || [],
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
  methods: {
    //审核通过
    handlePass(row) {
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
      let assetData = JSON.parse(localStorage.getItem('assetData')).filter(item => item.id != row.s_id)
      localStorage.setItem('assetData', JSON.stringify(assetData))
    },
    //  审核驳回
    handleBack(row) {
      this.dialogVisible = true
      this.row = row
      console.log(this.row);
    },
    //确认驳回
    onSubmit() {
      this.dialogVisible = false
      this.scrapHistory.map(item => {
        if (item.s_id === this.row.s_id) {
          item.s_detail = this.textarea
          item.s_status = '已驳回'
        }
      })
      localStorage.setItem('scrapHistory', JSON.stringify(this.scrapHistory))
      console.log(this.scrapHistory);
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
  },
}
</script>

<style scoped>

</style>