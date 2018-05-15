<template>
  <div class="page-main">
    <div class="handleArea">
      <div class="left"></div>
      <div class="right">
        <el-button type="primary"
                   @click="onSubmit">返回列表</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="24"
              class="table-title">日志明细</el-col>
    </el-row>
    <table class="custom">
      <tr>
        <td>生产商</td>
        <td>HUAWEI</td>
      </tr>
      <tr>
        <td>操作系统</td>
        <td> Android 6.0 (HUAWEINXT-AL10)</td>
      </tr>
      <tr>
        <td>生产商</td>
        <td>HUAWEI</td>
      </tr>
      <tr>
        <td>操作系统</td>
        <td> Android 6.0 (HUAWEINXT-AL10)</td>
      </tr>
      <tr>
        <td>生产商</td>
        <td>HUAWEI</td>
      </tr>
      <tr>
        <td>操作系统</td>
        <td>
          <el-button type="primary"
                     @click="showDialog"
                     style="padding:6px 20px;">主体数据</el-button>
          <el-button type="primary"
                     @click="pushScope"
                     style="padding:6px 20px;">推送范围</el-button>
        </td>
      </tr>
    </table>

    <el-dialog title="主体数据"
               :visible.sync="dialogVisible">
      <el-row>
        <el-col>
          <table class="custom">
            <tr>
              <td>策略ID</td>
              <td>10178</td>
            </tr>
            <tr>
              <td>策略名称</td>
              <td>安卓默认策略</td>
            </tr>
            <tr>
              <td>平台</td>
              <td>Android</td>
            </tr>
            <tr>
              <td>模板</td>
              <td>default_android_policy</td>
            </tr>
            <tr>
              <td>可见性</td>
              <td>公开</td>
            </tr>
          </table>
        </el-col>
      </el-row>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="推送范围"
               :visible.sync="dialogVisible1">
      <el-row>
        <el-col :span="12">
          <h3>用户组</h3>
          <el-tree :data="data2"
                   show-checkbox
                   default-expand-all
                   node-key="id"
                   ref="tree"
                   @check-change="handleCheckChange"
                   :props="defaultProps">
          </el-tree>
        </el-col>
        <el-col :span="12">
          <el-row style="padding:0 10px;margin-bottom:5px;">
            <el-col :span="24">
              <h3>单个设备</h3>
              <el-form :model="forms"
                       label-width="0px">
                <el-form-item label=""
                              style="margin-bottom:5px;">
                  <el-input v-model="forms.singleDevice"
                            auto-complete="off"
                            placeholder="查询关键字"></el-input>
                </el-form-item>
              </el-form>
              <div style="padding:10px;margin-bottom:5px;background-color:#ddd;border-radius: 3px;">
                <table class="deviceList">
                  <tr v-for="(item,index) in deviceList"
                      :key="index">
                    <td>{{item.name}}</td>
                    <td>
                      <span class="delete"
                            @click="deleteDevice(item)"></span>
                    </td>
                  </tr>
                </table>
              </div>
            </el-col>
            <el-col :span="24">
              <el-form :model="forms"
                       label-width="50px">
                <el-form-item label="标签"
                              style="margin-bottom:5px;">
                  <el-input v-model="forms.singleDevice"
                            auto-complete="off"
                            placeholder="标签"
                            style="width:180px;"></el-input>
                  <el-button type="primary"
                             @click="dialogFormVisible1 = false">搜索</el-button>
                </el-form-item>
              </el-form>
              <div style="padding:10px;background-color:#ddd;border-radius: 3px;">
                <table class="deviceList">
                  <tr v-for="(item,index) in deviceLists"
                      :key="index">
                    <td>
                      <el-checkbox v-model="item.checked"
                                   @change="getItem(item)"></el-checkbox>
                    </td>
                    <td>{{item.name}}</td>
                    <td style="text-align: center">{{item.sort}}</td>
                  </tr>
                </table>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
export default {
  name: 'administratorLogDetail',
  components: {},
  data() {
    return {
      formInline: {},
      dialogVisible: false,
      dialogVisible1: false,
      deviceList: [
        { name: 'MI 3C -- liangjunfeng' },
        { name: 'MI 3C -- liangjunfeng' }
      ],
      deviceLists: [
        {
          checked: false,
          name: 'zy测试 [admin]',
          sort: '用户'
        },
        {
          checked: false,
          name: '产品测试',
          sort: '用户'
        }
      ],
      data2: [
        {
          id: 1,
          label: '组织机构1',
          children: [
            {
              id: 2,
              label: '二级 1-1'
            },
            {
              id: 3,
              label: '二级 1-2'
            },
            {
              id: 4,
              label: '二级 1-3'
            },
            {
              id: 5,
              label: '二级 1-4'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      platformList: [
        { label: 'Andriod', value: 'Andriod' },
        { label: 'ios', value: 'ios' }
      ],
      form: {
        name: '',
        platform: ''
      },
      forms: {
        strategyName: '',
        platform: ''
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    onSubmit() {},
    showDialog() {
      this.dialogVisible = true
    },
    pushScope() {
      this.dialogVisible1 = true
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    deleteDevice(item) {
      console.log(item)
    }
  }
}
</script>
