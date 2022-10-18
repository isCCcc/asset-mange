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
          <el-button @click="edit(scope.$index,scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="deleterow(scope.$index)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑表单弹出框-->
    <el-dialog title="编辑"
               :visible.sync="editFormVisible"
               :close-on-click-modal="false"
               class="form"
               :before-close="handleClose">
      <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
        <el-form-item label="资产名称" prop="name">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产数量" prop="num">
          <el-input v-model="form.num" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="资产类别">
          <el-radio-group prop="group" v-model="form.group">
            <el-radio label="一类"></el-radio>
            <el-radio label="二类"></el-radio>
            <el-radio label="三类"></el-radio>
            <el-radio label="四类"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="资产状态">
          <el-radio-group prop="group" v-model="form.status">
            <el-radio label="0"></el-radio>
            <el-radio label="1"></el-radio>
            <el-radio label="2"></el-radio>
            <el-radio label="3"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="选择日期" v-model="form.storageTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel()">取消</el-button>
        <el-button type="primary" @click.native="saveOrUpdate()">
          <div v-if=" this.currentType == 'edit' ">
            更新
          </div>
          <div v-if=" this.currentType == 'add' ">
            添加
          </div>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    //点击关闭dialog
    handleClose() {
      /*done();
      location.reload();*/
      this.editFormVisible = false;
    },

    //点击取消
    handleCancel() {
      this.editFormVisible = false;
    },

    //点击更新
    saveOrUpdate() {
      if(this.currentType == "add"){
        this.form.storageTime = this.form.storageTime;
        this.form.id = this.currentid+1;
        this.form.storage_uid = this.currentSid;
        this.tableData.push(this.form);
        localStorage.setItem('assetData', JSON.stringify(this.tableData))
      };
      if( this.currentType == "edit" ){
        //更新的时候就把弹出来的表单中的数据写到要修改的表格中
        this.tableData[this.currentIndex].name=this.form.name;
        this.tableData[this.currentIndex].num=this.form.num;
        this.tableData[this.currentIndex].status=this.form.status;
        this.tableData[this.currentIndex].id=this.form.id;
        this.tableData[this.currentIndex].storageTime=this.form.storageTime;
        this.tableData[this.currentIndex].group=this.form.group;
        this.tableData[this.currentIndex].storage_uid=this.form.storage_uid;
        this.tableData[this.currentIndex].out_uid=this.form.out_uid;
      };
      //这里再向后台发个post请求重新渲染表格数据
      localStorage.setItem('assetData', JSON.stringify(this.tableData))
      this.editFormVisible = false;
    },
    add(){
      this.currentType = "add";
      this.editFormVisible = true;
    },
    edit(index, row) {
      this.currentType = "edit";
      this.editFormVisible = true;
      this.form = Object.assign({}, row); //这句是关键！！！
      this.currentRow = row;
      this.currentIndex = index;


    },
    deleterow(index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        localStorage.setItem('assetData', JSON.stringify(this.tableData))
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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

  //组件挂载后将数据存储到浏览器本地，第一次刷新后注释掉
  created() {
    let tableData = [{
      id: '1',
      name: '设备A',
      num: '10',
      group: '一类',
      status: '1',
      storageTime:  '2016-05-04',
      storage_uid: '1',
      out_uid: ''
    }, {
      id: '2',
      name: '设备B',
      num: '10',
      group: '二类',
      status: '0',
      storageTime:  '2016-05-04',
      storage_uid: '1',
      out_uid: ''
    }, {
      id: '3',
      name: '设备C',
      num: '10',
      group: '三类',
      status: '0',
      storageTime:  '2016-05-04',
      storage_uid: '1',
      out_uid: ''
    }, {
      id: '4',
      name: '设备D',
      num: '10',
      group: '四类',
      status: '0',
      storageTime:  '2016-05-04',
      storage_uid: '1',
      out_uid: ''
    }]
    localStorage.setItem('assetData', JSON.stringify(tableData))
  },

  data() {
    return {
      data:[],
      filterDataShow: [], //储存符合条件的数据
      listSearch: [],
      currentSid: '1',
      currentid: 4,
      currentRow: {},
      currentIndex: '',
      editFormVisible: false,
      currentType: '',
      form: {
        id: '',
        name: '',
        num: '',
        group: '',
        status: '',
        storageTime:  '',
        storage_uid: '',
        out_uid: ''
      },
      formInline: {
        name: '',
        group: ''
      },
      tableData:  JSON.parse(localStorage.getItem('assetData'))
    }
  }
}
</script>