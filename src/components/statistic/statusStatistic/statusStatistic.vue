<template>
  <div class="chart-container">
    <el-row style="padding-bottom:20px;border-bottom:1px solid #ddd;">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>失联设备统计</span>
          </div>
          <line-chart :max="5"
                      chartId="memory-chart"
                      itemStyle="#479f07"
                      areaStyle="#a5d086"
                      height="250px"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>设备激活统计</span>
          </div>
          <div class="select-bar">
            <el-form ref="form"
                    :inline="true"
                    :model="selectData">
              <el-form-item>
                <el-date-picker v-model="selectData.time"
                                class="select-from"
                                type="daterange"
                                placeholder="选择日期范围">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="selectData.date"
                          class="select-from"
                          placeholder="请选择">
                  <el-option label="周"
                            value="30"></el-option>
                  <el-option label="月"
                            value="60"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="selectData.chart"
                          class="select-from"
                          placeholder="请选择">
                  <el-option label="周"
                            value="30"></el-option>
                  <el-option label="月"
                            value="60"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <bar-chart></bar-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding:20px 0;border-bottom:1px solid #ddd;">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>设备应用安装统计</span>
          </div>
          <pie-chart height="200px"></pie-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>合规性统计(Android策略)</span>
          </div>
          <bar-chart></bar-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding:20px 0;border-bottom:1px solid #ddd;">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>合规性统计(ROOT)</span>
          </div>
          <line-chart :max="5"
                      chartId="memory-chart"
                      itemStyle="#479f07"
                      areaStyle="#a5d086"
                      height="250px"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>合规性统计(装有黑名单应用)</span>
          </div>
          <bar-chart></bar-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="padding:20px 0;">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>合规性统计(未装必装应用)</span>
          </div>
          <bar-chart></bar-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>合规性统计(Android白名单)</span>
          </div>
          <bar-chart></bar-chart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart from '../../common/charts/lineChart'
import barChart from '../../common/charts/barChart'
import pieChart from '../../common/charts/pieChart'
export default {
  components: {
    lineChart,
    barChart,
    pieChart
  },
  data() {
    return {
      selectData: {
        time: '',
        date: '',
        chart: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container{
  .card-title{
    padding-left: 10px;
    height: 34px;
    line-height: 34px;
    background: #f7f7f7;
  }
  .el-card{
    margin: 0 12px;
  }
  .select-bar{
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    .select-from{
      width: 150px;
    }
    .el-form-item{
      margin-bottom: 0;
    }
  }
}
</style>
