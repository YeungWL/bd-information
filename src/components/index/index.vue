<template>
  <div class="content-container">
    <ul class="intro clearfix">
      <li class="intro-item">
        <img src="../../assets/images/0icon_facility.png" alt="设备ICON" class="img">
        <div class="intro-message">
          <div class="number facility-number">11</div>
          <div class="word">设备数</div>
        </div>
      </li>
      <li class="intro-item">
        <img src="../../assets/images/0icon_user.png" alt="用户ICON" class="img">
        <div class="intro-message">
          <div class="number">11</div>
          <div class="word">用户数</div>
        </div>
      </li>
      <li class="intro-item">
        <img src="../../assets/images/0icon_apply.png" alt="应用ICON" class="img">
        <div class="intro-message">
          <div class="number apply-number">11</div>
          <div class="word">应用数</div>
        </div>
      </li>
      <li class="intro-item">
        <img src="../../assets/images/0icon_document.png" alt="文档ICON" class="img">
        <div class="intro-message">
          <div class="number document-number">11</div>
          <div class="word">文档数</div>
        </div>
      </li>
    </ul>
    <el-row class="card-container">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>失联设备分布</span>
          </div>
          <div class="select">
            <el-select v-model="value" placeholder="请选择" class="fr">
              <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
              </el-option>
            </el-select>
          </div>
          <line-chart :max="5"
                      chartId="memory-chart"
                      itemStyle="#479f07"
                      areaStyle="#a5d086"></line-chart>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>管理的用户组分布</span>
          </div>
          <pie-chart ></pie-chart>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="card-container" style="margin-bottom: 20px;">
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>管理员历史操作日志</span>
          </div>
          <ul class="card-content">
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略</span>
            </li>
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略</span>
            </li>
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略</span>
            </li>
          </ul>
          <div class="card-bottom clearfix">
            <el-button size="small" class="fr">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card :body-style="{ padding: '0px' }">
          <div class="card-title">
            <span>最近添加的设备(7天内)</span>
          </div>
          <ul class="card-content">
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略臧策略臧策略臧策略臧策略臧策略臧策略</span>
            </li>
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略</span>
            </li>
            <li class="card-item">
              <span>时间</span>
              <span>测试组1</span>
              <span>测试组1推送了策略，策略名称为：臧策略</span>
            </li>
          </ul>
          <div class="card-bottom clearfix">
            <el-button size="small" class="fr">查看详情</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineChart from '../common/charts/lineChart'
import pieChart from '../common/charts/pieChart'
export default {
  components: {
    lineChart,
    pieChart
  },
  data() {
    return {
      test: {
        // cpu:{time: "15:26:39", value: "2.80"},
        // disk:{time: "15:26:39", value: "726"},
        // memory:{time: "15:26:39", value: "53.5"},
        // network:{time: "15:26:39", up: "1.23", down: "1.21"}
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }],
      value: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.content-container{
  margin-left: 56px;
  .intro{
    padding: 20px 50px;
    width: 100%;
    border-bottom: 1px dotted #555;
    box-sizing: border-box;
    .intro-item{
      float: left;
      width: 25%;
      .img{
        float: left;
        width: 80px;
        height: 80px;
        // background-color: #6fb3e0;
        // border-radius: 50%;
      }
      .intro-message{
        float: left;
        padding-left: 20px;
        .number{
          font-size: 30px;
          margin-top: 2px;
          color: #6fb3e0;
        }
        .facility-number{
          color: #6ee8ab;
        }
        .apply-number{
          color: #8d96fd;
        }
        .document-number{
          color: #fd8da5;
        }
        .word{
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
  .card-container{
    padding: 20px 0;
    border-bottom: 1px dotted #555;
    .card-title{
      padding-left: 10px;
      height: 34px;
      line-height: 34px;
      background: #f7f7f7;
    }
    .el-card{
      margin: 0 12px;
    }
    .select{
      height: 50px;
      line-height: 50px;
    }
    .card-bottom{
      padding: 20px 10px;
    }
    .card-content{
      .card-item{
        margin: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #ccc;
        &:hover{
          background: rgba($color: #ccc, $alpha: 0.3);
        }
        span:last-child{
          width: 50%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
