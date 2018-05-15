<template>
  <div>
    <div class="page-main">
      <div class="handleArea">
        <div class="left">
          <el-form :inline="true"
                   :model="timeForm">

            <el-form-item label="方案名称：">
              <el-input v-model="timeForm.schemeName"
                        placeholder="请填写用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">查询</el-button>
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary"
                         @click="addTimeScheme">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right"></div>
      </div>
      <el-table :data="tableData"
                stripe
                style="width: 100%">
        <el-table-column label="方案名称"
                         width="250">
          <template slot-scope="scope">
            <span style="color:rgb(42, 100, 150);cursor: pointer"
                  @click="updateScheme(scope.row)">{{scope.row.userName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ip"
                         label="关联资源"
                         width="250">
        </el-table-column>
        <el-table-column prop="time"
                         label="创建时间"
                         width="250">
        </el-table-column>

        <el-table-column prop="time"
                         label="最近修改时间"
                         width="250">
        </el-table-column>
        <el-table-column label="操作"
                         min-width="200">
          <template slot-scope="scope">
            <!-- <span class="bg-danger"
                  >删除</span> -->
            <el-button type="text"
                       @click="deleteScheme(scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination :total="total"
                  :page="listQuery.page"
                  :size="listQuery.size"
                  @pageChange="pageChange"></pagination>
    </div>

    <el-dialog :title="titleName"
               :visible.sync="dialogFormVisible">
      <el-row v-if="titleName=='添加时间方案'">
        <el-col :span="4">
          <el-select v-model="timeScheme"
                     placeholder="请选择">
            <el-option v-for="(item,index) in timeSchemeList"
                       :label="item.label"
                       :value="item.value"
                       :key="index"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-form :model="forms"
               label-width="200px"
               label-position="right">
        <el-form-item label="方案名称">
          <el-input v-model="forms.programmeName"
                    auto-complete="off"
                    style="width:390px;"
                    required></el-input>
        </el-form-item>
        <el-form-item label="方案描述">
          <el-input v-model="forms.programmeDesc"
                    auto-complete="off"
                    style="width:390px;"></el-input>
        </el-form-item>
        <el-form-item label="生效时间段(24小时制)">
          <span class="addTimeSlot"
                @click="addTimeSlot">添加</span>
          <div v-for="(item,index) in forms.timeSlot">
            <el-time-select placeholder="起始时间"
                            v-model="item.startTime"
                            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }">
            </el-time-select>
            <el-time-select placeholder="结束时间"
                            v-model="item.endTime"
                            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30',
      minTime: startTime
    }">
            </el-time-select>
            <span class="deleteTimeSlot"
                  @click="deleteTimeSlot(item)">删除</span>
          </div>

        </el-form-item>
        <el-form-item label="生效星期">
          <el-checkbox-group v-model="forms.effectiveWeek">
            <el-checkbox label="一"
                         value="1"></el-checkbox>
            <el-checkbox label="二"
                         value="2"></el-checkbox>
            <el-checkbox label="三"
                         value="3"></el-checkbox>
            <el-checkbox label="四"
                         value="4"></el-checkbox>
            <el-checkbox label="五"
                         value="5"></el-checkbox>
            <el-checkbox label="六"
                         value="6"></el-checkbox>
            <el-checkbox label="日"
                         value="0"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="生效日期">
          <span class="addTimeSlot"
                @click="addDateSlot">添加</span>
          <div v-for="(item,index) in forms.effectiveSlot">
            <el-date-picker v-model="item.startDate"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
            <el-date-picker v-model="item.endDate"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
            <span class="deleteTimeSlot"
                  @click="deleteDateSlot(item)">删除</span>
          </div>

        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary">使用此方案</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>

</style>
<script>
import Pagination from 'components/common/pagination/index'
export default {
  name: 'timeSchemeManager',
  components: {
    Pagination
  },
  data() {
    return {
      timeForm: {
        schemeName: ''
      },
      tableData: [
        {
          userName: '默认方案',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        },
        {
          userName: '自动方案',
          ip: '127.0.0.1',
          identification: '用户登录',
          status: '成功',
          time: '2018-04-12 11:17:13'
        }
      ],
      listQuery: {
        page: 1,
        size: 8
      },
      total: 10,
      dialogFormVisible: false,
      timeSchemeList: [
        { label: '默认方案', value: '默认方案' },
        { label: '自定义方案', value: '自定义方案' }
      ],
      forms: {
        programmeName: '默认方案',
        programmeDesc: '默认方案',
        timeSlot: [{ startTime: '', endTime: '' }],

        effectiveWeek: ['一'],
        effectiveSlot: [{ startDate: '', endDate: '' }]
      }
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    //
    addTimeScheme() {
      this.titleName = '添加时间方案'
      this.dialogFormVisible = true
    },
    deleteScheme(item) {
      this.$confirm('你确定要删除' + item.userName + '数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    addTimeSlot() {
      this.forms.timeSlot.push({ startTime: '', endTime: '' })
    },
    deleteTimeSlot(item) {
      this.forms.timeSlot.splice(this.forms.timeSlot.indexOf(item), 1)
    },
    addDateSlot() {
      this.forms.effectiveSlot.push({ startDate: '', endDate: '' })
    },
    deleteDateSlot(item) {
      this.forms.effectiveSlot.splice(this.forms.effectiveSlot.indexOf(item), 1)
    },
    updateScheme(item) {
      this.titleName = '修改时间方案'
      this.dialogFormVisible = true
    }
  }
}
</script>
