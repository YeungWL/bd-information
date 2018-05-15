<template>
  <section>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="文件夹路径：">
                <el-input v-model="formInline.user"
                          placeholder="请填写文件夹路径"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-form :inline="true"
                     :model="{}">
              <el-form-item label="请输入密钥："
                            label-width="100">
                <el-input placeholder=""></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">提交密钥</el-button>
                <el-button type="primary"
                           @click="addCatalogVisible=true">添加</el-button>
              </el-form-item>
            </el-form>

          </div>
        </div>

        <el-table :data="list"
                  style="width: 100%">
          <el-table-column label="文件夹路径"
                           prop="name"
                           min-width="100"></el-table-column>
          <el-table-column label="创建人"
                           prop="creator"></el-table-column>
          <el-table-column label="加密总数/推送总数"
                           prop="num"
                           min-width="120">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToPushPage">{{scope.row.num}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="120">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="filePushVisible=true">推送</el-button>
              <el-button type="text"
                         @click="deleteHandle">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="listQuery.page"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <!-- 详情 -->
    <router-view></router-view>
    <!-- 推送 -->
    <el-dialog title="推送"
               :visible.sync="filePushVisible"
               class="filePushDialog">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple"
               style="border:1px solid #4074e1;">
            <h3 class="title"
                style="background-color:#4074e1;">选择用户组</h3>
            <el-tree :data="data"
                     :props="defaultProps"
                     accordion
                     show-checkbox
                     @node-click="handleNodeClick">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <el-form :model="{}"
                   label-width="100px">
            <el-form-item label="设备查询：">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label-width="20px">
              <div style="height:100px;overflow:auto;border:1px solid #ccc;border-radius:5px;padding:0 5px;">
                <el-tag :closable="true"
                        type="primary">MIX--huangwt</el-tag>
              </div>
            </el-form-item>
            <el-form-item label="标签查询：">
              <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item label-width="20px">
              <div style="height:100px;overflow:auto;border:1px solid #ccc;border-radius:5px;padding:0 5px;">
                <div>
                  <el-checkbox label="MIX--huangwt">dsdsd</el-checkbox>
                </div>
                <div>
                  <el-checkbox label="MIX--huangwt">dsds232332d</el-checkbox>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="filePushVisible = false">确 定</el-button>
        <el-button @click="filePushVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加目录 -->
    <el-dialog title="添加目录"
               size="tiny"
               :visible.sync="addCatalogVisible">
      <el-form label-width="100px">
        <el-form-item label="文件夹目录">
          <el-input placeholder=""></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="filePushVisible = false">确 定</el-button>
        <el-button @click="filePushVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </section>
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
      total: undefined,
      listQuery: {},
      list: [
        {
          name: '消息1',
          content: '回家吃饭',
          num: '0/0/0',
          creator: '张三',
          createTime: '2018-04-25 12:26:30',
          status: '1'
        },
        {
          name: '消息2',
          content: '回家不吃饭',
          num: '1/1/1',
          creator: '张三',
          createTime: '2018-04-25 12:25:01',
          status: '2'
        }
      ],
      filePushVisible: false,
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
      addCatalogVisible: false
    }
  },
  methods: {
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    },
    // 转到推送详情页面
    goToPushPage() {
      this.$router.push('/content/catalogpush')
    },
    // 点击用户组
    handleNodeClick(data) {
      console.log(data)
    },
    // 删除
    deleteHandle() {
      this.$confirm('此操作将删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message.success('删除成功')
        })
        .catch(() => {})
    }
  }
}
</script>
