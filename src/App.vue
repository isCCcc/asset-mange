<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  created() {
    this.assetData = JSON.parse(localStorage.getItem('assetData'))
    this.maintainData = JSON.parse(localStorage.getItem('maintainData'))
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify([
        {
          uid: '04191329',
          uname: '超级管理员',
          pwd: '123456'
        }
      ]))
    }
    if (!this.assetData) {
      let tableData = [{
        id: '1',
        name: '设备A',
        num: '10',
        group: '一类',
        status: '1',
        storageTime: '2021-05-04',
        storage_uid: '1',
        out_uid: ''
      }, {
        id: '2',
        name: '设备B',
        num: '10',
        group: '二类',
        status: '0',
        storageTime: '2022-05-04',
        storage_uid: '1',
        out_uid: ''
      }, {
        id: '3',
        name: '设备C',
        num: '10',
        group: '三类',
        status: '0',
        storageTime: '2021-09-11',
        storage_uid: '1',
        out_uid: ''
      }, {
        id: '4',
        name: '设备D',
        num: '10',
        group: '四类',
        status: '0',
        storageTime: '2021-10-04',
        storage_uid: '1',
        out_uid: ''
      }]
      localStorage.setItem('assetData', JSON.stringify(tableData))
    }
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
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
