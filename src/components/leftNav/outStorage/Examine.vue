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
      <el-form-item>
        <el-button type="primary" @click="search(formInline)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">入库</el-button>
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
          <div v-if="scope.row.status == '未通过' ">
            <el-button @click="agree(scope.$index)" type="text" size="small">通过</el-button>
            <el-button @click="notagree(scope.$index)" type="text" size="small">驳回</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  methods: {
    agree(index) {
      this.tableData[index].status="通过";
      let aid =this.tableData[index].aid
      let assetData =  JSON.parse(localStorage.getItem('assetData'))
      assetData.forEach(function(value,index){
        if(value.id ==  aid){
          value.status = 1
        }
      })
      localStorage.setItem('assetData', JSON.stringify(assetData))
    },
    notagree(index) {
      this.tableData[index].status="未通过";

    },

  },
  computed: {
    // 模糊搜索
    tables () {
      const {
        name,
        group
      } = this.formInline
      return this.tableData.filter((item) => { //使用过滤方法
        let matchname=true;
        let matchgroup=true;
        if(name){
          // debugger
          const keys=name.toUpperCase().replace("","").split("");
          matchname=keys.every(key=>item.name.toUpperCase().includes(key));
        }
        if(group){
          // debugger
          const keys=group.toUpperCase().replace("","").split("");
          // console.log(keys)
          matchgroup=keys.every(key=>item.group.toUpperCase().includes(key));
          // console.log(matchname)
        }
        return matchname && matchgroup
      });
    }
  },

  data() {
    return {

      formInline: {
        name: '',
        group: ''
      },

      tableData: JSON.parse(localStorage.getItem('lendDatas'))
    }
  }
}
</script>