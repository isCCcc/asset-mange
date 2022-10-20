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
    // 默认生成用户信息
    // if (!JSON.parse(localStorage.getItem('user'))) {
    //   localStorage.setItem('user', JSON.stringify([
    //     {
    //       uid: '04190000',
    //       uname: '超级管理员',
    //       identity: '超级管理员',
    //       pwd: '123456'
    //     }
    //   ]))
    // }
    //默认生成用户列表
    if (!JSON.parse(localStorage.getItem('userList'))) {
      localStorage.setItem('userList', JSON.stringify([
        {
          uid: '04190000',
          uname: '超级管理员',
          identity: '超级管理员',
          pwd: '123456'
        },
        {
          uid: '04191111',
          uname: '普通管理员',
          identity: '普通管理员',
          pwd: '123456'
        }
      ]))
    }
    //默认生成设备信息
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
    //默认生成维修设备信息
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
    // 默认生成报废历史记录信息
    if (!JSON.parse(localStorage.getItem('scrapData'))) {
      let scrapData = [
        {
          s_id: '001',
          s_name: '设备1',
          s_create: '2015-10-01',
          s_time: '2022-10-01',
          s_uid: '04191329',
          s_res: '设备老坏，无法继续维修',
          s_tag: '正常报废',
        }, {
          s_id: '002',
          s_name: '设备2',
          s_create: '2018-10-01',
          s_time: '2021-10-01',
          s_uid: '04191329',
          s_res: '人为因素损坏，已完成后续理赔',
          s_tag: '异常报废',
        }, {
          s_id: '003',
          s_name: '设备3',
          s_create: '2019-10-01',
          s_time: '2022-10-09',
          s_uid: '04191329',
          s_res: '设备老坏，无法继续维修',
          s_tag: '正常报废',
        }, {
          s_id: '004',
          s_name: '设备4',
          s_create: '2015-10-01',
          s_time: '2022-10-01',
          s_uid: '04191329',
          s_res: '设备老坏',
          s_tag: '正常报废',
        }, {
          s_id: '005',
          s_name: '设备5',
          s_create: '2015-10-01',
          s_time: '2022-10-19',
          s_uid: '04191329',
          s_res: '更新设备',
          s_tag: '正常报废',
        },
      ]
      localStorage.setItem('scrapData', JSON.stringify(scrapData))
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
