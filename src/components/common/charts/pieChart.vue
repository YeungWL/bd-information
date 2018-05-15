<template>
  <div :style="{height:height,width:'100%'}">
  </div>
</template>

<script>
export default {
  name: "pieChart",
  data() {
    return {
      chart: null,
      status: []
    };
  },
  props: {
    height: {
      type: String,
      default: '250px'
    },
  },
  mounted() {
    this.chart = this.$echarts.init(this.$el);
    let myChartbar = this.chart
    if (typeof window.addEventListener != "undefined") { 
      window.addEventListener('resize',function(){myChartbar.resize();},false); 
    } else { 
      window.attachEvent("onresize",function(){myChartbar.resize();}); 
    } 
    this.setPie(this.cpuData);
  },
  methods: {
    setPie() {
      this.chart.setOption({
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "right",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "85%",
            center: ["40%", "50%"],
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
