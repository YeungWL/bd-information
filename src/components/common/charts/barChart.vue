<template>
  <div :style="{height:'200px',width:'100%'}"></div>
</template>

<script>
export default {
  name: "barChart",
  data() {
    return {
      chart: null,
      status: []
    };
  },
  props: {},
  mounted() {
    this.chart = this.$echarts.init(this.$el);
    let myChartbar = this.chart;
    if (typeof window.addEventListener != "undefined") {
      window.addEventListener(
        "resize",
        function() {
          myChartbar.resize();
        },
        false
      );
    } else {
      window.attachEvent("onresize", function() {
        myChartbar.resize();
      });
    }
    this.setBar(this.cpuData);
  },
  methods: {
    setBar() {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: "6%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "10%",
            data: [10, 52, 200, 334, 390, 330, 220]
          },
          {
            name: "test",
            type: "bar",
            barWidth: "10%",
            data: [10, 52, 200, 334, 390, 330, 220]
          },
        ]
      });
    }
  }
};
</script>
