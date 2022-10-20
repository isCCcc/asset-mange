<template>
  <div class="app-container">
    <!--查询筛选-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="已废设备">
        <el-input placeholder="已废设备" v-model="scrapName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = true">报废申请</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="applyHistory">申请历史</el-button>
      </el-form-item>
      `
    </el-form>

    <!--  报废历史  -->
    <div class="scarp-history">
      报废历史
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

    <!--  报废申请弹出框信息  -->
    <el-dialog title="报废申请" :visible.sync="dialogVisible"
               width="30%" :before-close="handleClose">
      <!--   表单信息   -->
      <el-form ref="form" label-width="80px">
        <el-form-item label="设备编号">
          <el-input v-model="id" placeholder="请输入设备编号"/>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input v-model="d_name" :disabled="true" placeholder="请输入正确的设备编号"/>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input v-model="uid" :disabled="true" placeholder="请输入正确的设备编号"/>
        </el-form-item>
        <el-form-item label="设备引入时间">
          <el-input v-model="creatTime" :disabled="true" placeholder="请输入正确的设备编号"/>
        </el-form-item>
        <el-form-item label="设备报废时间">
          <el-input v-model="desTime" placeholder="请输入正确的设备编号"/>
        </el-form-item>
        <el-form-item label="报废标签">
          <el-radio-group v-model="tag">
            <el-radio label="正常报废"></el-radio>
            <el-radio label="异常报废"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="报废原因">
          <el-input type="textarea" v-model="result"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit" :plain="true">确 定</el-button>
      </span>
    </el-dialog>

    <!--  申请历史弹出框信息  -->
    <el-dialog title="申请历史" :visible.sync="historyVisible"
               width="50%" :before-close="handleClose">

      <el-table stripe :data="scrapHistory" style="width: 100%">
        <el-table-column prop="s_id" label="设备编号" />
        <el-table-column prop="s_name" label="设备名称" />
        <el-table-column prop="s_time" label="申请时间" />
        <el-table-column prop="s_uid" label="申请人" />
        <el-table-column prop="s_res" label="申请原因" />
        <el-table-column prop="s_status" label="审核状况" width="200">
          <template slot-scope="scope">
            <div>
              <template v-if="scope.row.s_status==='待审批'|| scope.row.s_status==='已审批'">
                <el-button type="text" size="small" @click="toggle(scope.row)">{{ scope.row.s_status }}</el-button>
              </template>
              <template v-else>
                <el-collapse accordion>
                  <el-collapse-item>
                    <template slot="title">
                      <span style="color: #f56c6c;background: transparent">
                        {{ scope.row.s_status }}
                        <i class="header-icon el-icon-info"/>
                      </span>
                    </template>
                    <div>{{ scope.row.s_detail }}</div>
                  </el-collapse-item>
                </el-collapse>
                <!--                <el-collapse>-->
                <!--                  <el-collapse-item :title="scope.row.s_status" style="color: red;">-->
                <!--                    <div> {{ scope.row.s_detail }}</div>-->
                <!--                  </el-collapse-item>-->
                <!--                </el-collapse>-->

              </template>

            </div>
          </template>
        </el-table-column>


      </el-table>

    </el-dialog>
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
      assetData: JSON.parse(localStorage.getItem('assetData')),
      scrapHistory: JSON.parse(localStorage.getItem('scrapHistory')) || [],
      scrapData: '',  // 报废设备信息
      scrapName: '',  // 查找报废设备名称
      dialogVisible: false, // 报废申请弹出框
      id: '',  // 报废设备id
      d_name: '',
      uid: JSON.parse(localStorage.getItem('user'))[0].uid,
      creatTime: '',
      desTime: dayjs().format('YYYY-MM-DD'), // 设备报废时间
      tag: '正常报废', // 报废标签
      result: '', // 报废原因
      flag: false, //报废状态

      historyVisible: false, // 申请历史弹出框
    }
  },
  created() {
    this.scrapData = this.source
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    //报废申请
    onSubmit() {
      //将新增数据存储到scrapData中
      if (this.flag) {
        this.dialogVisible = false
        let scrapItem = {
          s_id: this.id,
          s_name: this.d_name,
          s_create: this.creatTime,
          s_time: this.desTime,
          s_uid: this.uid,
          s_res: this.result,
          s_tag: this.tag,
          s_status: '待审批',
          s_detail: '', // 驳回意见
        }
        this.scrapHistory.push(scrapItem)
        localStorage.setItem('scrapHistory', JSON.stringify(this.scrapHistory))
        this.$notify({
          title: '成功',
          message: '申请成功，待审批',
          type: 'success'
        });

        //   this.source.push(scrapItem)
        //   this.source.sort((a, b) => dayjs(b.s_time) - dayjs(a.s_time))
        //   localStorage.setItem('scrapData', JSON.stringify(this.source))
        //   //  将删除设备从assetData中删掉
        //   let newAssetData = this.assetData.filter(item => item.id != this.id)
        //   localStorage.setItem('assetData', JSON.stringify(newAssetData))
      } else {
        this.$notify.error({
          title: '错误',
          message: '提交错误！请输入正确的设备编号'
        });
        // this.$message.error('提交错误！请输入正确的设备编号');
      }
    },
    //报废申请历史
    applyHistory() {
      this.historyVisible = true
      console.log(this.scrapHistory);
    },

  },
  watch: {
    // 监视已废设备输入框
    scrapName(val) {
      if (!val) {
        this.scrapData = this.source
      } else {
        this.scrapData = this.source.filter(item =>
            item.s_name.indexOf(val) >= 0
        )
      }
    },
    //  监视申请报废id输入框
    id(val) {
      let data = this.assetData.filter(item => item.id === val)[0]
      if (data) {
        this.flag = true
        this.d_name = data.name
        this.creatTime = data.storageTime
        this.desTime = dayjs(this.desTime).format('YYYY-MM-DD')
      } else {
        this.flag = false
        this.$message.error('请输入正确的设备编号');
      }
    },
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