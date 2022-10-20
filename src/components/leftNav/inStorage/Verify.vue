<template>
  <div class="app-container">
    <div v-if="updateRecordData != null">
      <el-descriptions v-for="record in updateRecordData" :key="record.id" title="资产修改记录">
        <el-descriptions-item label="原资产名称">{{record.name}}</el-descriptions-item>
        <el-descriptions-item label="现资产名称">{{record.uname}}</el-descriptions-item>
        <el-descriptions-item label="原资产数量">{{record.num}}</el-descriptions-item>
        <el-descriptions-item label="现资产数量">{{record.unum}}</el-descriptions-item>
        <el-descriptions-item label="原资产类别">{{record.group}}</el-descriptions-item>
        <el-descriptions-item label="现资产类别">{{record.ugroup}}</el-descriptions-item>
        <el-descriptions-item label="原资产状态">
          <el-tag size="small">
            <div v-if="record.status==1">
              在用
            </div>
            <div v-if="record.status==2">
              维修中
            </div>
            <div v-if="record.status==3">
              已损坏
            </div>
            <div v-if="record.status==0">
              闲置
            </div>
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="现资产状态">
          <el-tag size="small">
            <div v-if="record.ustatus==1">
              在用
            </div>
            <div v-if="record.ustatus==2">
              维修中
            </div>
            <div v-if="record.ustatus==3">
              已损坏
            </div>
            <div v-if="record.ustatus==0">
              闲置
            </div>
          </el-tag>
        </el-descriptions-item>

      </el-descriptions>
    </div>
  </div>
</template>

<script>
export default {
  methods:{

  },
  data() {
    return {
      updateRecordData: JSON.parse(localStorage.getItem('updateRecordData'))
    }
  }
}
</script>