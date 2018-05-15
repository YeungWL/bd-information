<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="formInline">
            <el-form-item label="设备名称">
              <el-input v-model="formInline.user"
                        placeholder="设备名称"></el-input>
            </el-form-item>
            <el-form-item label="级联搜索">
              <el-select v-model="formInline.region"
                         placeholder="选择">
                <el-option label="是"
                           value="1"></el-option>
                <el-option label="否"
                           value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple"
               style="border:1px solid #4074e1;">
            <h3 class="title"
                style="background-color:#4074e1;">选择用户组</h3>
            <el-tree :data="treeData"
                     :props="defaultProps"
                     accordion
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="20"
                style="padding-left:10px;">
          <div class="button-bar"
               style="padding-bottom:10px;">
            <el-button type="primary"
                       @click="toRealtime">实时定位</el-button>
            <el-button type="primary"
                       @click="toPath">轨迹定位</el-button>
          </div>
          <el-table :data="tableData"
                    style="width: 100%"
                    class="customTable">
            <el-table-column type="selection"
                             width="50">
            </el-table-column>
            <el-table-column prop="name"
                             label="设备名称">
            </el-table-column>
            <el-table-column prop="name"
                             label="拥有人">
            </el-table-column>
            <el-table-column prop="date"
                             label="激活时间">
            </el-table-column>
            <el-table-column prop="date"
                             label="上报时间">
            </el-table-column>
          </el-table>
          <pagination :total="total"
                      :page="listQuery.page"
                      :size="listQuery.size"
                      @pageChange="pageChange"></pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Pagination from 'components/common/pagination/index'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      treeData: [
        {
          label: '组织机构1',
          children: [
            {
              label: '二级 1-1'
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
        // 树形结构规则
        children: 'children',
        label: 'label'
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        }
      ],
      total: undefined,
      listQuery: {}
    }
  },
  methods: {
    toRealtime() {
      this.$router.push({ path: '/position/equipment/realtime' })
    },
    toPath() {
      this.$router.push({ path: '/position/equipment/path' })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    }
  }
}
</script>

