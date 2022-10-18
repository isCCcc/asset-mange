<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
// import dayjs from "dayjs";
//
// let maintain = []
// this.assetData.map((item) => {
//   maintain.push({
//     m_id: item.id,
//     m_name: item.name,
//     m_group: item.group,
//     m_create: dayjs(item.storageTime).add(1, 'year').format('YYYY-MM-DD'),
//     m_status: '待维修',
//     m_uid: '',
//     m_history: []
//   })
// })
// maintain.sort((a, b) => dayjs(a.m_create) - dayjs(b.m_create))
// localStorage.setItem('maintainData', JSON.stringify(maintain))
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
