<template>
  <div class="app-container">
    <!--查询条件-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
          label="序号"
          width="150">
      </el-table-column>

      <el-table-column
          prop="aid"
          label="资产编号"
          width="150">
      </el-table-column>

      <el-table-column
          prop="aname"
          label="资产名称"
          width="120">
      </el-table-column>

      <el-table-column
          prop="agroup"
          label="资产分类"
          width="120">
      </el-table-column>

      <el-table-column
          prop="cause"
          label="申请原因"
          width="120">
      </el-table-column>

      <el-table-column
          prop="lid"
          label="申请人"
          width="120">
      </el-table-column>

      <el-table-column
          prop="status"
          label="申请状态"
          width="120">
      </el-table-column>

      <el-table-column
          prop="applicationTime"
          label="申请时间"
          width="120">
      </el-table-column>

      <el-table-column
          fixed="right"
          label="操作">
        <template slot-scope="scope">
          <el-button @click="returnAsset(scope.$index,scope.row)" type="text" size="small">归还</el-button>
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
    returnAsset(index, row) {
      //更新的时候就把弹出来的表单中的数据写到要修改的表格中
      this.returnid++
      this.returnData.id = this.returnid
      this.returnData.aid = row.aid
      this.returnData.aname = row.aname
      this.returnData.agroup = row.agroup
      this.returnData.cause = '使用完毕'
      this.returnData.lid = '1'//JSON.parse(localStorage.getItem('user')).uid
      this.returnData.status = '已归还'
      this.returnData.returnTime = this.nowDate();

      this.returnDatas.push(this.returnData);
      console.log(this.returnDatas)
      let assetData = JSON.parse(localStorage.getItem('assetData'))

      for (var i = 0; i < assetData.length; i++) {
        if (assetData[i].id == row.id) {
          assetData[i].status = 0
        }
      }
      localStorage.setItem('assetData', JSON.stringify(assetData))
      localStorage.setItem('returnDatas', JSON.stringify(this.returnDatas))

    }

  },
  created() {
    let uid = 1//JSON.parse(localStorage.getItem('user')).uid
    let lendDatas = JSON.parse(localStorage.getItem('lendDatas'))
    for (var i = 0; i < lendDatas.length; i++) {
      if (lendDatas[i].lid == uid) {
        this.tableData.push(lendDatas[i])
      }
    }
    console.log(this.tableData)
    let returnDatas = []
    localStorage.setItem('returnDatas', JSON.stringify(returnDatas))
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
  data() {
    return {
      returnid: 0,
      formInline: {
        name: '',
        group: ''
      },
      tableData: [],
      returnData: {
        id: '',
        aid: '',
        aname: '',
        agroup: '',
        cause: '',
        lid: '',
        status: '',
        returnTime: '',
      },
      returnDatas: JSON.parse(localStorage.getItem('returnDatas'))

    }
  }
}
</script>