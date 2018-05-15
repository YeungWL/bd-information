<template>
  <div :style="{height: height,width:'100%'}">
  </div>
</template>

<script>
export default {
  name: 'lineChart',
  data() {
    return {
      chart: null,
      status: [
        {time: "15:26:39", value: "2.90"},
        {time: "15:26:40", value: "2.80"},
        {time: "15:26:41", value: "2.20"},
        {time: "15:26:42", value: "2.80"}
      ]
    }
  },
  props: {
    height: {
      type: String,
      default: '200px'
    },
    data: {
      type: Object,
      require: true
    },
    max: {
      type: Number,
      default: null
    },
    itemStyle: {
      type: String,
      default: '#13b3bc'
    },
    areaStyle: {
      type: String,
      default: '#88d9dd'
    }
  },
  watch: {
    data(val) {
      console.log(val);
      this.status.push(val)
      if (this.status.length > 100) {
        this.status.shift()
      }
      this.setLine()
    }
  },
  mounted() {
    console.log(this.cpuData);
    this.chart = this.$echarts.init(this.$el)
    let myChartbar = this.chart
    if (typeof window.addEventListener != "undefined") { 
      window.addEventListener('resize',function(){myChartbar.resize();},false); 
    } else { 
      window.attachEvent("onresize",function(){myChartbar.resize();}); 
    } 

    this.setLine(this.cpuData)
  },
  methods: {
    setLine() {
      console.log(this.status);
      let xAxisArr = []
      let dataArr = []
      for (let i = 0; i < this.status.length; i++) {
        xAxisArr.push(this.status[i].time)
        dataArr.push(this.status[i].value)
      }
      console.log(xAxisArr);
      this.chart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '6%',
          left: '6%',
          right: '6%',
          bottom: '16%',
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            // axisLine: {
            //   show: false
            // },
            // axisTick: {
            //   show: false
            // },
            boundaryGap: false,
            data: xAxisArr
          }
        ],
        yAxis: [
          {
            type: 'value',
            max: this.max,
            splitLine: {
              lineStyle: {
                type: 'dashed',
                color: ['#efefef']
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
          }
        ],
        series: [
          {
            name: '当前值',
            type: 'line',
            // areaStyle: { normal: { color: this.areaStyle } },
            itemStyle: { normal: { color: this.itemStyle } },
            data: dataArr,
            // animationDuration: 2600,
            // animationEasing: 'cubicInOut',
            // smooth: true
          }
        ]
      })
    }
  }
}
</script>
