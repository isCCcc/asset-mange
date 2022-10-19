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
        :data="tableData"
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

    },
    notagree(index) {
      this.tableData[index].status="驳回";

    },
    search({name,group}){
      console.log(name);console.log(group);
      this.listSearch = this.tableData.filter((item) => { //使用过滤方法
        let matchname=true;
        let matchgroup=true;
        if(name){
          // debugger
          const keys=name.toUpperCase().replace("","").split("");
          console.log(keys)
          matchname=keys.every(key=>item.name.toUpperCase().includes(key));
          console.log(matchname)
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

      this.tableData = this.listSearch

    },
    add(){},
  },
  data() {
    return {

      formInline: {
        name: '',
        group: ''
      },

      tableData: [{
        id: '1',
        aid:'1',
        aname: '设备A',
        agroup: '一类',
        cause:'测试',
        lid: '001',
        status: '未通过',
        applicationTime:  '2016-05-04',
      }, {
        id: '2',
        aid: '2',
        aname: '设备B',
        agroup: '二类',
        cause:'测试',
        lid: '001',
        status: '未通过',
        applicationTime:  '2016-05-04',
      }, {
        id: '3',
        aid: '3',
        aname: '设备C',
        agroup: '三类',
        cause:'测试',
        lid: '001',
        status: '未通过',
        applicationTime:  '2016-05-04',
      }, {
        id: '4',
        aid: '4',
        aname: '设备D',
        agroup: '四类',
        cause:'测试',
        lid: '001',
        status: '未通过',
        applicationTime:  '2016-05-04',
      }]
    }
  }
}
</script>