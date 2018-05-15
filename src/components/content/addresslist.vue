<template>
  <section>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline"
                     class="search-form">
              <el-form-item label="通讯录名称：">
                <el-input v-model="formInline.name"
                          placeholder="请填写通讯录名称"
                          @change="formNameChange"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="getAddressList">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       @click="uploadFileVisible=true">添加</el-button>
            <el-button type="primary"
                       @click="downLoad({path: 'downContactsTemplate'})">下载xls模板</el-button>
          </div>
        </div>
        <el-table :data="list"
                  stripe
                  style="width: 100%">
          <el-table-column label="通讯录名称"
                           prop="name"
                           width="120"></el-table-column>
          <el-table-column label="创建人"
                           prop="username"></el-table-column>
          <el-table-column label="创建时间"
                           prop="create_time"></el-table-column>
          <el-table-column label="下载总数/推送总数"
                           prop="download_num">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToPushPage(scope.row.id)">{{scope.row.download_num +'/'+ scope.row.push_num}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="filePushVisible=true">推送</el-button>
              <el-button type="text"
                         @click="deleteItem(scope.row.id)">删除</el-button>
              <el-button type="text"
                         @click="downLoad({path: 'downloadContacts', id: scope.row.id})">下载</el-button>
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
    <!-- 添加通讯录 -->
    <el-dialog title="上传通讯录"
               :visible.sync="uploadFileVisible"
               class="uploadFileDialog"
               size="small">
      <el-form ref="form"
               label-width="110px"
               :model="uploadFileForm">
        <el-form-item label="上传通讯录"
                      required>
          <el-button type="info"
                     @click="uploadButtonClick"
                     size="small">上传通讯录</el-button>
          <input type="file"
                 ref="uploadFile"
                 @change="unpoadFileChange"
                 style="display:none;">
          <el-input disabled
                    v-model="uploadFileForm.fileName"
                    style="width:360px;"></el-input>
          <p>
            <span style="font-weight:bold;">上传文件类型为：</span>
            <span>.csv .xls .xlsx</span>
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="uploadFileVisible = false">确 定</el-button>
        <el-button @click="uploadFileVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
  </section>
</template>
<script>
import cookie from '@/utils/cookie.js'
import Pagination from 'components/common/pagination/index'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      formInline: {
        name: ''
      },
      list: [],
      uploadFileVisible: false,
      uploadFileForm: {
        file: '',
        global: true,
        sandBox: false,
        install: true,
        security: false,
        desc: '',
        fileName: ''
      },
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
      total: undefined,
      listQuery: {
        page: 1,
        size: 20
      },
      idList: []
    }
  },
  methods: {
    // 显示文件选择框
    uploadButtonClick() {
      this.$refs.uploadFile.value = ''
      this.$refs.uploadFile.click()
    },
    // 所选文件改变
    unpoadFileChange(e) {
      if (e.target.files.length !== 0) {
        this.uploadFileForm.file = e.target.files[0]
        this.uploadFileForm.fileName = e.target.files[0].name
      }
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val;
      console.log(this.listQuery)
    },
    // 转到推送详情页面
    goToPushPage(pId) {
      this.$router.push('/content/addersspush/' + pId);
    },
    // 点击用户组
    handleNodeClick(data) {
      console.log(data)
    },
    // 列表删除单条数据
    deleteItem(data) {
      this.idList = [];
      this.idList.push(data);
      // console.log(this.idList);
      this.deleteHandle(this.idList);
      // this.$api.downloadContacts({
      //   contactsId: data
      // }).then(res => {
      //   console.log(res);
      // })
    },
    // 删除
    deleteHandle(idList) {
      this.$confirm('此操作将删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteAddress({
          'idList': idList
        }).then(res => {
          if(res.code == 200){
            this.getAddressList();
            this.$message.success('删除成功')
          }else {
            this.$message.error(res.msg);
          }
        })
      }).catch(() => {})
    },
    // 下载模板
    downLoad(data) {
      console.log(data);
      // this.$api.downloadXlsTemplate().then(res => {
      //   console.log(res);
      // })
      let body = document.getElementsByTagName('body')[0];
      let form = document.createElement("form"); // 创建form表单来提交action - 下载模板
      form.setAttribute('style', 'display: none;');
      form.setAttribute('target', '_blank');
      body.appendChild(form);
      // form.action = process.env.BASE_API + '/api/contacts/downContactsTemplate';
      if(data.id){
        form.action = process.env.BASE_API + '/api/contacts/' + data.path + '?authorization=' + cookie.get('userid') + '_' + cookie.get('access_token') + '&contactsId=' + data.id;
      }else {
        form.action = process.env.BASE_API + '/api/contacts/' + data.path;
      }
      form.method = 'post';
      // if(data.id){
      //   let htmlStr = `<input type="hidden" name="contactsId" value="${data.id}">`;
      //   form.innerHTML = htmlStr;
      // }
      form.submit();
      form.parentNode.removeChild(form);
    },
    // 输入框为空时重新查询
    formNameChange() {
      if(this.formInline.name == "") {
        this.getAddressList();
      }
    },
    // 获取通讯录列表
    getAddressList() {
      this.$api.getAddressList({
        pageNo: this.listQuery.page,
        name: this.formInline.name
      }).then(res => {
        console.log(res);
        if(res.code == 200){
          this.list = res.data.Rows;
        }else {
          this.$message.error(res.msg);
        }
      })
    },
  },
  created() {
    this.getAddressList();
  }
}
</script>
