<template>
  <div>
    <div class="page-main">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple bg-purple"
               style="border:1px solid #4074e1;">
            <h3 class="title"
                style="background-color:#4074e1;">选择用户组</h3>
            <el-tree :data="data"
                     :props="defaultProps"
                     accordion
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="20">
          <h3 class="statistic_title">设备在线统计</h3>
          <div class="header-search">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="用户名搜索：">
                <el-input v-model="formInline.user"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="在线状态：">
                <el-select v-model="formInline.region"
                           placeholder="请选择在线状态">
                  <el-option label="在线"
                             value="1"></el-option>
                  <el-option label="离线"
                             value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="级联搜索：">
                <el-select v-model="formInline.cascading"
                           placeholder="请选择">
                  <el-option label="是"
                             value="1"></el-option>
                  <el-option label="否"
                             value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="请选择日期：">
                <div style="display: inline-block">
                  <el-date-picker v-model="formInline.startDate"
                                  type="date"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
                <span>-</span>
                <div style="display: inline-block">
                  <el-date-picker v-model="formInline.endDate"
                                  type="date"
                                  placeholder="选择日期">
                  </el-date-picker>
                </div>
              </el-form-item>

              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary"
                           @click="onSubmit">生成图表</el-button>
                <el-button type="primary"
                           @click="onSubmit">导出图片</el-button>
              </el-form-item>
            </el-form>
            <line-chart :max="5"
                        chartId="memory-chart"
                        itemStyle="#479f07"
                        areaStyle="#a5d086"></line-chart>
          </div>
          <h3 class="statistic_title">失联设备统计</h3>
          <div class="header-search">
            <el-form :inline="true"
                     :model="params"
                     class="search-form">
              <el-form-item label="用户名搜索：">
                <el-input v-model="params.user"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="级联搜索：">
                <el-select v-model="params.cascading"
                           placeholder="请选择">
                  <el-option label="是"
                             value="1"></el-option>
                  <el-option label="否"
                             value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
              <el-form-item label="">
                <el-button type="primary"
                           @click="onSubmit">生成失联图表</el-button>
                <el-button type="primary"
                           @click="onSubmit">导出失联图片</el-button>
              </el-form-item>
            </el-form>
            <line-chart :max="5"
                        chartId="memory-chart"
                        itemStyle="#479f07"
                        areaStyle="#a5d086"></line-chart>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<style>

</style>
<script>
import lineChart from '../../common/charts/lineChart'
export default {
  name: 'deviceOnlineStatistic',
  components: {
    lineChart
  },
  data() {
    return {
      data: [
        {
          label: '组织机构1',
          children: [
            {
              label: '二级 1-1'
            },
            {
              label: '二级 1-2'
            },
            {
              label: '二级 1-3'
            }
          ]
        },
        {
          label: '组织机构2',
          children: [
            {
              label: '二级 2-1'
            },
            {
              label: '二级 2-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      formInline: {
        user: '',
        region: '',
        cascading: '',
        startDate: '',
        endDate: ''
      },
      params: {
        user: '',
        cascading: ''
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    handleNodeClick(data) {
      console.log(data)
    }
  }
}
</script>
