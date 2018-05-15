<template>
  <section>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="文件名称：">
                <el-input v-model="formInline.user"
                          placeholder="请填写文件名称"
                          @change="changeUserName"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="getFileList(formInline.user)">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       v-show="tierData.length !== 1"
                       @click="upOneLevel">返回上一级</el-button>
            <el-button @click=""
                       type="primary">推送</el-button>
            <el-button type="primary"
                       @click="uploadFileVisible=true">添加文件</el-button>
            <el-button type="primary"
                       @click="folderVisible=true">添加文件夹</el-button>
            <el-button type="primary"
                       @click="deleteHandle(idList)">删除</el-button>
          </div>
        </div>
        <p style="padding-bottom:15px;color:#999;">当前用户最大上传空间为：{{totalSpace}}，当前可用空间为：{{availableSpace}}</p>
        <div class="nav-bar">
          <span class="nav" 
                v-for="(item,index) in tierData">
                <span class="nav-item"
                      @click="changeNavItme(item.parentId, index)">{{item.name}}</span></span>
        </div>
        <el-table :data="list"
                  stripe
                  style="width: 100%"
                  v-loading.body="loading"
                  @selection-change="handleSelection">
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="文件名称"
                           show-overflow-tooltip
                           min-width="120"
                           prop="name">
            <template slot-scope="scope">
              <span :style="'background:url('+scope.row.icon+') no-repeat left 5px / 22px 24px;padding:10px 0 0px 30px;'">
                <el-button type="text" v-if="scope.row.isFolder == 1" @click="changeParentId(scope.row)">{{scope.row.name}}</el-button>
                <span v-else>{{scope.row.name}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="文件大小"
                           width="100"
                           prop="fileSize"></el-table-column>
          <el-table-column label="是否加密"
                           width="100"
                           prop="isEncrypt">
            <template slot-scope="scope">{{scope.row.isEncrypt | filterEncrypt}}</template>                 
          </el-table-column>
          <el-table-column label="所有人"
                           width="90"
                           prop="founderName"></el-table-column>
          <el-table-column label="创建人"
                           width="100"
                           prop="creatorName"></el-table-column>
          <el-table-column label="创建时间"
                           min-width="160"
                           prop="create_time"></el-table-column>
          <el-table-column label="下载总数/推送总数"
                           width="140"
                           prop="num">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="goToPushPage(scope.row.id)">{{scope.row.downloadNum}}/{{scope.row.pushNum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作"
                           min-width="140">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="filePushVisible=true">推送</el-button>
              <el-button type="text"
                         @click="deleteItem(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="listQuery.page"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <!-- 推送详情 -->
    <router-view></router-view>
    <!-- 推送弹窗 -->
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
                  <el-checkbox label="MIX--huangwt"></el-checkbox>
                </div>
                <div>
                  <el-checkbox label="MIX--huangwt"></el-checkbox>
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
    <!-- 添加文件弹窗 -->
    <el-dialog title="上传文件"
               :visible.sync="uploadFileVisible"
               class="uploadFileDialog"
               size="small">
      <el-form ref="form"
               label-width="80px"
               :model="uploadFileForm">
        <el-form-item label="上传文件"
                      required>
          <el-button type="info"
                     @click="uploadButtonClick"
                     size="small">上传文件</el-button>
          <input type="file"
                 ref="uploadFile"
                 @change="unpoadFileChange"
                 style="display:none;">
          <el-input disabled
                    v-model="uploadFileForm.fileName"
                    style="width:405px;"></el-input>
        </el-form-item>
        <el-form-item label="加密">
          <el-radio :label="true"
                    v-model="uploadFileForm.sandBox">是</el-radio>
          <el-radio :label="false"
                    v-model="uploadFileForm.sandBox">否</el-radio>
        </el-form-item>
        <el-form-item label-width="0">
          <p>
            <span style="font-weight:bold;">支持上传的文件类型为：</span>
            <span>.mp3 .wav .ogg .mid .mp4 .rmvb .avi .flv .txt .bmp .jpg .jpeg .gif .png .html .htm .xls .xlsx .ppt .pptx .doc .docx .pdf .apk</span>
          </p>
          <p>
            <span style="font-weight:bold;">上传单个文件不能大于：</span>
            <span>50MB</span>
          </p>
          <p>
            <span style="font-weight:bold;">当前用户上传文件空间为：</span>
            <span>5G</span>
          </p>
          <p>
            <span style="font-weight:bold;">当前用户可使用上传空间为：</span>
            <span>5.0G</span>
          </p>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="uploadFileEvent">确 定</el-button>
        <el-button @click="uploadFileVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加文件夹弹窗 -->
    <el-dialog title="添加文件夹"
               :visible.sync="folderVisible"
               size="tiny">
      <el-form ref="addFolder"
               label-width="100px"
               label-position="right"
               :model="folderData">
        <el-form-item label="文件夹名称"
                      required
                      prop="folderName">
          <el-input placeholder="" v-model="folderData.folderName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="createFolder()">确 定</el-button>
        <el-button @click="folderVisible = false">取 消</el-button>
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
    let img = {
      folder: require('assets/images/content/folder.png'),
      txt: require('assets/images/content/icon_txt_file.png'),
      apk: require('assets/images/content/icon_apk_file.png'),
      doc:  require('assets/images/content/icon_doc_file.png'),
      docx: require('assets/images/content/icon_doc_file.png')
    }
    return {
      img,
      folderData: {
        folderName: ''
      },
      formInline: {
        user: '',
        region: ''
      },
      list: [],
      parentId: 0, // 文件夹层级ID
      tierData: [
        {parentId: 0, name: '文件管理'}
      ],
      total: undefined,
      listQuery: {
        page: 1,
        size: 20
      },
      hasPre: false, // 是否有上一级
      hasNext: true, // 是否有下一级
      folderVisible: false,
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
      totalSpace: "", // 总容量
      availableSpace: "", // 剩余容量
      idList: [], // 表格checkbox选择的id
      loading: true, //表格数据加载...
    }
  },
  filters: {
    filterEncrypt(status) {
      const statusMap = {
        '0': '未加密',
        '1': '加密'
      }
      return statusMap[status];
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
    uploadFileEvent(){
      let formdata = new FormData();
      formdata.append('file', this.uploadFileForm.file);
      formdata.append('parentId', this.parentId);
      this.$api.uploadFile(formdata).then(res => {
        console.log(res);
        if(res.code == 200){
          this.getFileList();
          this.uploadFileVisible = false;
          this.uploadFileForm.file = '';
          this.uploadFileForm.fileName = '';
        }else {
          this.$message.error(res.msg);
        }
      })
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
      this.getFileList();
    },
    // 转到推送详情页面
    goToPushPage(fileId) {
      this.$router.push('/content/filepush/' + fileId)
    },
    // 点击用户组
    handleNodeClick(data) {
      console.log(data)
    },
    // 列表选取checkbox
    handleSelection(data) {
      this.idList =  data.map(item => {
        return item.id
      })
    },
    // 列表删除单个数据
    deleteItem(data){
      this.idList = [];
      this.idList.push(data);
      this.deleteHandle(this.idList)
    },
    // 删除
    deleteHandle(idList) {
      if(idList.length == 0){
        this.$message.warning('请选择要删除的数据');
        return;
      }
      this.$confirm('此操作将删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteFile({
          'idList': idList
        }).then(res => {
          if(res.code == 200){
            this.getFileList();
            this.$message.success('删除成功')
          }else {
            this.$message.error(res.msg)
          }
        }).catch(err => {this.$message.error(err)})
      }).catch(() => {})
    },
    changeUserName() {
      if(this.formInline.user == ""){
        this.getFileList();
      }
    },
    // 更改父级ID
    changeParentId(object) {
      this.parentId = object.id;
      let data = {'parentId': object.id, 'name': object.name};
      this.tierData.push(data);
      this.getFileList();
    },
    // 返回上一级
    upOneLevel() {
      this.tierData.pop();
      this.parentId = this.tierData[this.tierData.length - 1].parentId;
      this.getFileList();
    },
    // 文件夹导航栏
    changeNavItme(navId, index) {
      let length = this.tierData.length - index - 1;
      for(let i = 0; i < length; i++){
        this.tierData.pop();
      }
      this.parentId = navId;
      this.getFileList();
    },
    // 获取数据列表
    getFileList() {
      this.loading = true;
      this.$api.getFileList({
        pageNo: this.listQuery.page,
        name: this.formInline.user,
        parentId: this.parentId
      }).then(res => {
        if(res.code == 200){
          // console.log(res.data.Rows);
          let rowData = res.data.Rows;
          for(let i = 0; i < rowData.length; i++){
            if(rowData[i].isFolder == 1){ // 判断是否是文件夹
              rowData[i].icon = this.img.folder;
            }else {
              rowData[i].icon = this.img[rowData[i].fileType];
            }
          }
          // console.log(rowData);
          this.list = rowData;
          this.total = res.data.Total;
          this.listQuery.size = res.data.Size;
          this.loading = false;
        }else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        console.log(err)
        this.$message.error(err);
      })
    },
    // 创建文件夹
    createFolder() {
      this.$api.createFolder({
        parentId: this.parentId,
        name: this.folderData.folderName
      }).then(res => {
        if(res.code == 200){
          this.getFileList();
          this.folderVisible = false;
          this.$refs['addFolder'].resetFields();
        }
      })
    },
    // 空间使用情况
    getUseSpace() {
      this.$api.getUseSpace().then(res => {
        if(res.code == 200){
          this.totalSpace = res.data.totalSpace;
          this.availableSpace = res.data.availableSpace;
        }else {
          this.$message.error(res.msg);
        }
      }).catch(err => {
        this.$message.error(err);
      })
    }
  },
  created() {
    this.getFileList();
    this.getUseSpace();
  }
}
</script>
<style lang="scss" scope>
.uploadFileDialog {
  .el-dialog {
    width: 600px;
  }
}
.filePushDialog {
  .el-dialog {
    width: 800px;
  }
}
.nav-bar{
  padding-bottom: 15px;
  .nav{
    &::before{
      content: '/';
      color: #c5cbdb;
    }
    &:first-child::before{
      content: '';
    }
    .nav-item{
      cursor: pointer;
      margin-left: 5px;
      &:hover{
        color: #20a0ff;
      }
    }
  }
}
</style>
