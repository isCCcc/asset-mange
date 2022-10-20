<template>
  <div class="app-container">
    <div class="chart-container">
      <div id="chart" class="chart" style="height:500px;width:100%"/>
    </div>
  </div>
</template>
<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      xData: ['在用', '闲置', '报废', '维修中']
    }
  },
  created() {


  },
  mounted() {
    this.setChart()
  },
  methods: {
    setChart() {
      let lendNum = 0
      let xzNum = 0
      let lendsDatas = JSON.parse(localStorage.getItem('lendDatas'))

      for (var i = 0; i < lendsDatas.length; i++) {
        if (lendsDatas[i].status == '通过') {
          lendNum = lendNum + 1;
        }
      }

      let assetData = JSON.parse(localStorage.getItem('assetData'))
      assetData.forEach(function (value, index) {
        if (value.status == 0) {
          xzNum = xzNum + 1;

        }
      })
      console.log(lendNum)
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(document.getElementById('chart'))
      //console.log(this.chart)

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: '资产盘点'
        },
        tooltip: {
          trigger: 'axis'
        },

        // x轴是类目轴（离散数据）,必须通过data设置类目数据
        xAxis: {
          type: 'category',
          data: this.xData
        },
        // y轴是数据轴（连续数据）
        yAxis: {
          type: 'value'
        },
        // 系列列表。每个系列通过 type 决定自己的图表类型
        series: [{
          // 系列中的数据内容数组
          data: [1, 1, 2, 3],
          // 折线图
          type: 'bar'
        }]
      }

      this.chart.setOption(option)
    }
  }
}
</script>
