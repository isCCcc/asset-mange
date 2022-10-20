<template>
  <div class="app-container">
    <div style="margin: 0 0 20px 0">资产维修中心</div>
    <!--查询筛选-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="资产名称">
        <el-input placeholder="资产名称" v-model="checkName"></el-input>
      </el-form-item>
      <el-form-item label="临期分类">
        <el-select placeholder="临期分类" v-model="checkTime">
          <el-option label="一周内" value="week"></el-option>
          <el-option label="一个月内" value="month"></el-option>
          <el-option label="一年内" value="year"></el-option>
          <el-option label="全部" value="all"></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item>-->
      <!--        <el-button type="primary">查询</el-button>-->
      <!--      </el-form-item>-->
    </el-form>

    <el-table :data="maintainData" border style="width: 100%; max-height:100%;">
      <el-table-column prop="m_id" label="产品编号"/>
      <el-table-column prop="m_name" label="产品名称"/>
      <el-table-column prop="m_group" label="产品分类"/>
      <el-table-column prop="m_create" label="到期时间"/>
      <el-table-column prop="m_status" label="维修状态"/>
      <el-table-column prop="u_id" label="维修申请人"/>
      <el-table-column prop="m_ohter" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="text" size="small" @click="toggle(scope.row)">申请维修</el-button>
            <el-button type="text" size="small" @click="showHistory(scope.row)">历史维修</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--  弹出框信息  -->
    <el-dialog title="维修申请" :visible.sync="dialogVisible"
               width="30%" :before-close="handleClose">
      <!--   表单信息   -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="设备编号">
          <el-input v-model="form.m_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="form.m_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备分类">
          <el-input v-model="form.m_group" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="form.u_id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="维修原因">
          <el-input type="textarea" v-model="form.m_desc"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!--  维修历史记录  -->
    <el-dialog title="维修记录" :visible.sync="historyVisible"
               width="50%">
      <template v-if="hasHistory">
        <el-descriptions v-for=" (item,i) in maintainHistory" :key="i"
                         :title="item.m_time"
                         style="border-bottom: 1px solid rgba(0,0,0,.25);
                                padding: 10px 0">
          <el-descriptions-item label="设备编码">{{ item.m_id }}</el-descriptions-item>
          <el-descriptions-item label="设备名称">{{ item.m_name }}</el-descriptions-item>
          <el-descriptions-item label="维修人员">{{ item.u_id }}</el-descriptions-item>
          <el-descriptions-item label="维修原因">{{ item.m_desc }}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <template v-if="item.status==='维修失败'">
              <el-tag size="small" type="danger">{{ item.status }}</el-tag>
            </template>
            <template v-else-if="item.status==='申请中'">
              <el-tag size="small" type="info">{{ item.status }}</el-tag>
            </template>
            <template v-else>
              <el-tag size="small" :type="item.status==='维修完成'?'success':''">{{ item.status }}</el-tag>
            </template>
          </el-descriptions-item>
        </el-descriptions>
        <br>
      </template>
      <template v-else>
        暂无维修记录
      </template>
    </el-dialog>
  </div>
</template>


<script>
import dayjs from "dayjs"

export default {
  created() {
    this.assetData = JSON.parse(localStorage.getItem('assetData'))
    this.maintainData = JSON.parse(localStorage.getItem('maintainData'))
    // this.maintainHistory = JSON.parse(localStorage.getItem('maintainHistory')) || []
    // console.log(this.applyMaintain)
    if (!this.maintainData) {
      let maintain = []
      this.assetData.map((item) => {
        maintain.push({
          m_id: item.id,
          m_name: item.name,
          m_group: item.group,
          m_create: dayjs(item.storageTime).add(1, 'year').format('YYYY-MM-DD'),
          m_status: '待维修',
          m_uid: '',
          m_history: []
        })
      })
      maintain.sort((a, b) => dayjs(a.m_create) - dayjs(b.m_create))
      localStorage.setItem('maintainData', JSON.stringify(maintain))
    }
  }
  ,
  data() {
    let assetData    // 设备数据
    let maintainData // 维修数据
    // let applyMaintain
    let checkTime = '全部' // 通过时间查询
    let checkName = ''    // 通过设备名称查询
    let maintainHistory // 维修记录
    let today = dayjs().format('YYYY-MM-DD')

    return {
      dialogVisible: false,
      historyVisible: false,
      hasHistory: false,
      assetData,
      maintainData,
      checkTime,
      checkName,
      maintainHistory,
      today,
      form: {
        m_id: '',
        m_name: '',
        m_group: '',
        m_time: '',
        m_status: '',
        u_id: '',
        m_desc: ''
      }
    }
  },
  watch: {
    //根据时间期限查询
    checkTime(value) {
      if (value !== 'all') {
        this.maintainData = JSON.parse(localStorage.getItem('maintainData')).filter(item => dayjs(item.m_create).isSame(this.today, value))
      } else {
        this.maintainData = JSON.parse(localStorage.getItem('maintainData'))
      }
    }
    ,
    //根据资产名称查询
    checkName(value) {
      if (value) {
        this.maintainData = JSON.parse(localStorage.getItem('maintainData'))
            .filter(item => item.m_name.indexOf(value) >= 0)
      } else {
        this.maintainData = JSON.parse(localStorage.getItem('maintainData'))
      }
    }
  }
  ,
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    toggle(value) {
      this.dialogVisible = true
      this.form = this.maintainData.filter(item => item.m_id === value.m_id)[0]
      this.form.u_id = JSON.parse(localStorage.getItem('user'))[0].uid
    },
    //维修申请
    onSubmit() {
      if (!this.form.m_desc) {
        this.$notify.error({
          title: '错误',
          message: '请填写维修原因，以便排查。'
        });
      } else {
        this.$notify({
          title: '成功',
          message: '已提交维修申请',
          type: 'success'
        });
        this.dialogVisible = false
        this.maintainData.filter(item => {
          if (item.m_id === this.form.m_id) {
            let time = dayjs().format('YYYY-MM-DD')
            item.m_status = '申请中'
            item.m_history.push({
              id: dayjs(), // 标识每一个子数据
              root: this.form.u_id,
              time: time,
              status: '申请中',
              desc: this.form.m_desc || '维修申请'
            })
          }
        })
        localStorage.setItem('maintainData', JSON.stringify(this.maintainData))
      }

    },
    showHistory(value) {
      this.historyVisible = true
      if (value.m_history.length) {
        this.hasHistory = true
      } else {
        this.hasHistory = false
      }
      let his = []
      for (let i in value.m_history) {
        his.push({
          m_id: value.m_id,
          m_name: value.m_name,
          u_id: value.m_history[i].root,
          m_desc: value.m_history[i].desc,
          m_time: value.m_history[i].time,
          status: value.m_history[i].status,
        })
      }
      this.maintainHistory = his
    }
  }
}
</script>

<style scoped>

</style>