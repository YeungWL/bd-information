<template>
  <div>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true">
              <el-form-item label="设备组名称：">
                <el-input v-model="params.deviceGrpName"
                          placeholder="请填写设备组名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchGroupName">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       @click="addServiceGroup">添加</el-button>
          </div>
        </div>
        <el-table :data="tableData"
                  stripe
                  style="width: 100%">
          <el-table-column label="组名称"
                           width="200">
            <template slot-scope="scope">
              <a @click="update(scope.row)"
                 style="color:#2a6496;cursor: pointer;">{{scope.row.deviceGrpName}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="description"
                           label="描述"
                           width="400">
          </el-table-column>
          <el-table-column prop="username"
                           label="创建人"
                           width="200">
          </el-table-column>
          <el-table-column prop="modifiedTime"
                           label="创建时间"
                           width="200">
          </el-table-column>
          <el-table-column label="操作"
                           min-width="200">
            <template slot-scope="scope">
              <!-- <span class="bg-primary"
                    style="cursor: pointer"
                    @click="manage(scope.row)">设备管理</span>
              <span class="bg-danger"
                    style="cursor: pointer"
                    @click="remove(scope.row)">删除</span> -->
              <el-button type="text"
                         @click="manage(scope.row)">设备管理</el-button>
              <el-button type="text"
                         @click="remove(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="params.pageNo"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <!-- 详情子组件 -->
    <router-view></router-view>
    <!--对话框-->
    <el-dialog :title="titleName"
               :visible.sync="dialogFormVisible"
               class="customDialog">
      <el-form :model="forms"
               ref="addDeviceGroupForm"
               :rules="rules"
               label-width="80px">
        <el-form-item label="组名称" prop="deviceGrpName">
          <el-input v-model="forms.deviceGrpName"
                    auto-complete="off"
                    style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea"
                    v-model="forms.description"
                    style="width:250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addDevice('addDeviceGroupForm')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="titleName"
               :visible.sync="dialogFormVisible1"
               class="customDialog">
      <el-form :model="modifyParams"
               ref="updateDeviceGroupForm"
               :rules="rules"
               label-width="80px">
        <el-form-item label="组名称" prop="deviceGrpName">
          <el-input v-model="modifyParams.deviceGrpName"
                    auto-complete="off"
                    style="width:250px;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea"
                    v-model="modifyParams.description"
                    style="width:250px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="modifyDeviceSubmit('updateDeviceGroupForm')"
                   >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'index',
  components: {
    Pagination
  },
  data() {
    return {
      listQuery: {
        size: 8
      },
      total: 10,
      titleName: '',
      dialogFormVisible: false,
      dialogFormVisible1:false,
      forms: {
        deviceGrpName: '',
        description: '',
        usernameId:this.$cookie.get('userid')
      },
      deleteParams:{
         id:this.$cookie.get('userid'),
        deviceGroupId:null
      },
      params: {
        deviceGrpName: '',
        pageNo: 1
      },
      modifyParams:{
        description:'',
        id:null,
        deviceGrpName:''
      },
      rules: {
        deviceGrpName: [
          { required: true, message: '请输入组名', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请填写描述', trigger: 'blur' }
        ]
      },
      tableData: [
//        {
//          groupName: 'MI 3C -- liangjunfen..',
//          desc: '梁骏锋',
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          groupName: 'MI 3C -- liangjunfen..',
//          desc: '梁骏锋',
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          groupName: 'MI 3C -- liangjunfen..',
//          desc: '梁骏锋',
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        },
//        {
//          groupName: 'MI 3C -- liangjunfen..',
//          desc: '梁骏锋',
//          clientVersion: '93a595fe',
//          deviceModel: 'MI 3C',
//          deviceSystem: 'Android 6.0.1 (MMB29M)'
//        }
      ],

    }
  },
  mounted(){
    this.groupList(this.params);
  },
  methods: {
    //修改设备组按钮
    modifyDeviceSubmit(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
//          alert('submit!');
//           console.log(this.forms);
          this.groupModify(this.modifyParams);
        } else {
          return false;
        }
      });
    },
    //移除设备
    deleteDeviceGroup(data){
      this.$api.deleteDeviceGroup(data).then(res=>{
         if(res.code==200){
           this.$message({
             type: 'success',
             message: '删除成功!'
           })
           this.groupList(this.params);
         }
      })
    },
    //修改设备
    groupModify(data){
      this.$api.groupModify(data).then(res=>{
         if(res.code==200){
           this.dialogFormVisible1 = false;
           this.$message({
             type: 'success',
             message:res.msg
           });
           this.modifyParams={
             description:'',
             id:null,
             deviceGrpName:''
           };
           this.groupList(this.params);
         }
      })
    },
    deviceGroupSave(data){
      this.$api.deviceGroupSave(data).then(res=>{
         if(res.code==200){
           this.dialogFormVisible = false;
           this.$message({
             type: 'success',
             message:res.msg
           });
           this.groupList(this.params);
           this.forms={
             deviceGrpName: '',
             description: '',
             usernameId:this.$cookie.get('userid')
           }
         }
      })
    },
    //添加设备组
    addDevice(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
//          alert('submit!');
//           console.log(this.forms);
          this.deviceGroupSave(this.forms);
        } else {
          return false;
        }
      });
    },
    //查询
    searchGroupName(){
      this.groupList(this.params);
    },
    // 分页改变
    pageChange(val) {
      this.params.pageNo = val
      this.groupList(this.params);
      //  console.log(this.listQuery)
    },
    //设备组列表
    groupList(data){
      this.$api.groupList(data).then(res=>{
        if(res.code==200){
           this.tableData=res.data.Rows;
           this.total=res.data.Total;
        }
      })
    },
    addServiceGroup() {
      this.dialogFormVisible = true;
      this.titleName = '添加设备组';
//        (this.forms = {
//          groupName: '',
//          desc: ''
//        })
    },
    update(item) {
      this.dialogFormVisible1 = true;
      this.titleName = '修改设备组';
      this.modifyParams={
        description:item.description,
        id:item.id,
        deviceGrpName:item.deviceGrpName
      };
    },
    onSubmit() {
      console.log('submit!')
    },
    //删除
    remove(item) {
      this.$confirm(
        '此操作将删除组名称:' + item.deviceGrpName + '， 是否继续?',
        '提示',
        {
          confirmButtonText: '删除',
          cancelButtonText: '取消',
          type: 'error'
        }
      )
        .then(() => {
          this.deleteDeviceGroup({id:item.id});

        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    //管理
    manage(item) {
      console.log(item)
      this.$router.push({
        path: '/facility/grouping/manageDevice',
        query: { groupData: JSON.stringify(item) }
      })
    }
  }
}
</script>
<style>

</style>
