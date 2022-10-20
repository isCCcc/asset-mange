<template>
  <div class="app-container">
    <!--查询条件-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="查询条件:">
      </el-form-item>
      <el-form-item label="资产名称">
        <el-input v-model="formInline.name" placeholder="资产名称"></el-input>
      </el-form-item>
      <el-form-item label="资产分类">
        <el-select v-model="formInline.group" placeholder="资产分类">
          <el-option label="一类" value="一类"></el-option>
          <el-option label="二类" value="二类"></el-option>
          <el-option label="三类" value="三类"></el-option>
          <el-option label="四类" value="四类"></el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <el-table
        :data="tables"
        border
        style="width: 100%">

      <el-table-column
          prop="id"
          label="资产编号"
          width="150">
      </el-table-column>

      <el-table-column
          prop="name"
          label="资产名称"
          width="120">
      </el-table-column>

      <el-table-column
          prop="num"
          label="资产数量"
          width="120">
      </el-table-column>

      <el-table-column
          prop="group"
          label="资产分类"
          width="120">
      </el-table-column>

      <el-table-column
          prop="status"
          label="资产状态"
          width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.status==1">
            在用
          </div>
          <div v-if="scope.row.status==2">
            维修中
          </div>
          <div v-if="scope.row.status==3">
            已损坏
          </div>
          <div v-if="scope.row.status==0">
            闲置
          </div>
        </template>
      </el-table-column>

      <el-table-column
          prop="storageTime"
          label="入库时间"
          width="180">
      </el-table-column>

      <el-table-column
          prop="storage_uid"
          label="入库人编号"
          width="120">
      </el-table-column>

      <el-table-column
          prop="out_uid"
          label="出库人编号"
          width="120">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="sendlendApplication(scope.$index,scope.row)" type="text" size="small">申请借用</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  methods: {
    // 当前时间
    nowDate() {
      let nowDate = new Date()
      let date = nowDate.getFullYear() + '-' + nowDate.getMonth() + '-' + nowDate.getDate()
      return date
    },

    sendlendApplication(index, row) {
      //更新的时候就把弹出来的表单中的数据写到要修改的表格中
      this.lendid++
      this.lendData.id = this.lendid
      this.lendData.aid = row.id
      this.lendData.aname = row.name
      this.lendData.agroup = row.group
      this.lendData.cause = '生产需要'
      this.lendData.lid = '1'//JSON.parse(localStorage.getItem('user')).uid
      this.lendData.status = '未通过'
      this.lendData.applicationTime = this.nowDate();

      this.lendDatas.push(this.lendData);

      localStorage.setItem('lendDatas', JSON.stringify(this.lendDatas))

    },


  },
  computed: {
    // 模糊搜索
    tables() {
      const {
        name,
        group
      } = this.formInline
      return this.tableData.filter((item) => { //使用过滤方法
        let matchname = true;
        let matchgroup = true;
        if (name) {
          // debugger
          const keys = name.toUpperCase().replace("", "").split("");
          matchname = keys.every(key => item.name.toUpperCase().includes(key));
        }
        if (group) {
          // debugger
          const keys = group.toUpperCase().replace("", "").split("");
          // console.log(keys)
          matchgroup = keys.every(key => item.group.toUpperCase().includes(key));
          // console.log(matchname)
        }
        return matchname && matchgroup
      });
    }
  },

  //组件挂载后将数据存储到浏览器本地，第一次刷新后注释掉
  created() {
    let lendDatas = []
    localStorage.setItem('lendDatas', JSON.stringify(lendDatas))
    let assetData = JSON.parse(localStorage.getItem('assetData'))
    for (var i = 0; i < assetData.length; i++) {
      if (assetData[i].status == '0') {
        this.tableData.push(assetData[i])
      }
    }
    console.log(this.tableData)
  },

  data() {
    return {
      lendid: 0,
      filterDataShow: [], //储存符合条件的数据
      listSearch: [],
      editFormVisible: false,
      currentType: '',
      lendData: {
        id: '',
        aid: '',
        aname: '',
        agroup: '',
        cause: '',
        lid: '',
        status: '',
        applicationTime: '',
      },

      formInline: {
        name: '',
        group: ''
      },
      tableData: [],
      lendDatas: JSON.parse(localStorage.getItem('lendDatas')),
    }
  }
}
</script>