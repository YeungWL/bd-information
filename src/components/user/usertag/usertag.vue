<template>
  <section>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true" :model="formInline">
            <el-form-item label="标签名称">
              <el-input v-model="formInline.name" placeholder="标签名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <el-button type="primary" @click="editLabel('add')">添加</el-button>
        </div>
      </div>
      <el-table :data="userLabelList" style="width: 100%" class="customTable">
        <el-table-column prop="name" label="标签名"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="date" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editLabel('modify', scope.row)">修改</el-button>
            <el-button type="text" @click="deleteLabel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        :total="total"
        :page="listQuery.page"
        :size="listQuery.size"
        @pageChange="pageChange"></pagination>
    </div>
    <!-- 添加弹窗/修改弹窗 -->
    <el-dialog :title="formTitle" :visible.sync="labelFormVisible" size="tiny">
      <el-form ref="labelForm" :rules="labelFormRules" :model="labelForm" label-width="70px">
        <el-form-item label="标签名" prop="name">
          <el-input v-model="labelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="labelForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialog('labelForm')">确 定</el-button>
        <el-button @click="labelFormVisible = false">取 消</el-button>
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
      //查询条件
      formInline: {
        name: ''
      },
      //列表数据
      userLabelList: [],
      //分页信息
      listQuery: {
        page: 1,
        size: 10
      },
      total: 10,
      //弹窗信息
      editType: '',
      formTitle: '',
      labelForm: {
        id: 0,
        name: '',
        description: ''
      },
      labelFormVisible: false,
      //弹窗form校验
      labelFormRules: {
        name: [
          {required: true, message: '标签名不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //获取列表数据
    getLabelList() {
      let params = {
        name: this.formInline.name,
        pageNo: this.listQuery.page
      };
      this.$api.getUserLabelList(params).then(res => {
        if (res && res.code === 200 && res.data) {
          this.userLabelList = res.data.Rows;
          this.total = res.data.Total;
        }
      })
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val;
      this.getLabelList();
    },
    //查询
    searchList() {
      if (this.listQuery.page === 1) {
        this.getLabelList();
      } else {
        this.listQuery.page = 1;
      }
    },
    //添加标签、修改标签 - 弹窗
    editLabel(type, rowData) {
      let switchName = {
        'add': '添加标签',
        'modify': '修改标签'
      };
      this.editType = type;
      this.formTitle = switchName[type];
      this.labelFormVisible = true;
      if (type === 'modify') {
        this.labelForm.id = rowData.id;
        this.labelForm.name = rowData.name;
        this.labelForm.description = rowData.description;
      } else {
        this.labelForm.id = 0;
        this.labelForm.name = '';
        this.labelForm.description = '';
      }
    },
    //弹窗 - 确定
    submitDialog(formName) {
      let queryParamsList;
      switch(this.editType) {
        case 'add':
          queryParamsList = {
            url: '/api/label/saveLabel',
            params: {
              name: this.labelForm.name,
              description: this.labelForm.description
            }
          };
          break;
        case 'modify':
          queryParamsList = {
            url: '/api/label/updateLabel',
            params: {
              id: this.labelForm.id,
              name: this.labelForm.name,
              description: this.labelForm.description
            }
          };
          break;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.editUserLabel(queryParamsList).then(res => {
            if (res && res.code === 200) {
              this.getLabelList();
              this.$message({message: res.msg, showClose: true, type: 'success'});
              this.labelFormVisible = false;
            }
          })
        }
      })
    },
    //删除操作
    deleteLabel(id) {
      this.$confirm('您确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancleButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$api.deleteUserLabel({id: id}).then(res => {
          if (res && res.code === 200) {
            this.getLabelList();
            this.$message({message: res.msg, showClose: true, type: 'success'});
          }
        })
      })
    }
  },
  created() {
    this.getLabelList();
  }
}
</script>

