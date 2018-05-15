<template>
  <section>
    <template v-if="$route.meta.hasChild">
      <div class="page-main">
        <div class="handleArea">
          <div class="left">
            <el-form :inline="true"
                     :model="formInline">
              <el-form-item label="策略名称">
                <el-input v-model="formInline.name"
                          placeholder="策略名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="right">
            <el-button type="primary"
                       @click="addVisible = true">添加</el-button>
            <el-button type="primary">删除</el-button>
          </div>
        </div>

        <el-table :data="tableData"
                  style="width: 100%"
                  class="customTable">
          <el-table-column type="selection"
                           width="50">
          </el-table-column>
          <el-table-column prop="name"
                           label="策略名称">
          </el-table-column>
          <el-table-column prop="num"
                           label="有效下发/推送总数"
                           min-width="200">
            <template slot-scope="scope">
              <el-button type="text"
                         @click="toPush">{{scope.row.num}}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="meter"
                           label="定位间隔">
          </el-table-column>
          <el-table-column prop="meter"
                           label="上报间隔">
          </el-table-column>
          <el-table-column prop="date"
                           min-width="160"
                           label="最近修改时间">
          </el-table-column>
          <el-table-column prop="date"
                           min-width="160"
                           label="最近推送时间">
          </el-table-column>
          <el-table-column label="操作"
                           min-width="200">
            <template slot-scope="scope">
              <el-button type="text">授权</el-button>
              <el-button type="text"
                         @click="copyDialog(scope.row)">复制</el-button>
              <el-button type="text"
                         @click="updateDialog(scope.row)">修改</el-button>
              <el-button type="text"
                         @click="deleteTiming">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination :total="total"
                    :page="listQuery.page"
                    :size="listQuery.size"
                    @pageChange="pageChange"></pagination>
      </div>
    </template>
    <router-view></router-view>
    <!-- 新增弹窗 -->
    <el-dialog title="新增定时策略"
               :visible.sync="addVisible"
               size="small">
      <el-form ref="form"
               :inline="true"
               :model="addDate"
               label-width="70px">
        <el-form-item label="策略名称">
          <el-input v-model="addDate.name"
                    style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="定位间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间方案">
          <el-button type="primary"
                     size="small"
                     @click="showProject = !showProject">显示时间方案</el-button>
        </el-form-item>
      </el-form>
      <div class="time-project"
           v-show="showProject">
        <el-select v-model="addDate.position"
                   class="project"
                   placeholder="请选择">
          <el-option label="默认方案"
                     value="30"></el-option>
          <el-option label="自动方案1"
                     value="60"></el-option>
        </el-select>
        <el-form ref="form"
                 :inline="true"
                 :model="timeData"
                 label-width="100px">
          <el-form-item label="方案名称">
            <el-input v-model="timeData.name"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="方案描述">
            <el-input v-model="timeData.info"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="生效时间段">
            <el-form-item label="上午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;width:260px;">
              <el-time-picker is-range
                              v-model="timeData.amTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="下午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;">
              <el-time-picker is-range
                              v-model="timeData.pmTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="生效星期">
            <el-checkbox-group v-model="timeData.day">
              <el-checkbox label="一"></el-checkbox>
              <el-checkbox label="二"></el-checkbox>
              <el-checkbox label="三"></el-checkbox>
              <el-checkbox label="四"></el-checkbox>
              <el-checkbox label="五"></el-checkbox>
              <el-checkbox label="六"></el-checkbox>
              <el-checkbox label="日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="失效日期">
            <el-date-picker v-model="timeData.limitTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="addVisible = false">确 定</el-button>
        <el-button @click="addVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹窗 -->
    <el-dialog title="修改定时策略"
               :visible.sync="updateVisible"
               size="small">
      <el-form ref="form"
               :inline="true"
               :model="addDate"
               label-width="70px">
        <el-form-item label="策略名称">
          <el-input v-model="addDate.name"
                    style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="定位间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间方案">
          <el-button type="primary"
                     size="small"
                     @click="showProject = !showProject">显示时间方案</el-button>
        </el-form-item>
      </el-form>
      <div class="time-project"
           v-show="showProject">
        <el-select v-model="addDate.position"
                   class="project"
                   placeholder="请选择">
          <el-option label="默认方案"
                     value="30"></el-option>
          <el-option label="自动方案1"
                     value="60"></el-option>
        </el-select>
        <el-form ref="form"
                 :inline="true"
                 :model="timeData"
                 label-width="100px">
          <el-form-item label="方案名称">
            <el-input v-model="timeData.name"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="方案描述">
            <el-input v-model="timeData.info"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="生效时间段">
            <el-form-item label="上午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;width:260px;">
              <el-time-picker is-range
                              v-model="timeData.amTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="下午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;">
              <el-time-picker is-range
                              v-model="timeData.pmTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="生效星期">
            <el-checkbox-group v-model="timeData.day">
              <el-checkbox label="一"></el-checkbox>
              <el-checkbox label="二"></el-checkbox>
              <el-checkbox label="三"></el-checkbox>
              <el-checkbox label="四"></el-checkbox>
              <el-checkbox label="五"></el-checkbox>
              <el-checkbox label="六"></el-checkbox>
              <el-checkbox label="日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="失效日期">
            <el-date-picker v-model="timeData.limitTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="updateVisible = false">确 定</el-button>
        <el-button @click="updateVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 复制弹窗 -->
    <el-dialog title="复制定时策略"
               :visible.sync="copyVisible"
               size="small">
      <el-form ref="form"
               :inline="true"
               :model="addDate"
               label-width="70px">
        <el-form-item label="策略名称">
          <el-input v-model="addDate.name"
                    style="width: 193px;"></el-input>
        </el-form-item>
        <el-form-item label="定位间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上报间隔">
          <el-select v-model="addDate.position"
                     placeholder="选择">
            <el-option label="30分钟"
                       value="30"></el-option>
            <el-option label="1小时"
                       value="60"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间方案">
          <el-button type="primary"
                     size="small"
                     @click="showProject = !showProject">显示时间方案</el-button>
        </el-form-item>
      </el-form>
      <div class="time-project"
           v-show="showProject">
        <el-select v-model="addDate.position"
                   class="project"
                   placeholder="请选择">
          <el-option label="默认方案"
                     value="30"></el-option>
          <el-option label="自动方案1"
                     value="60"></el-option>
        </el-select>
        <el-form ref="form"
                 :inline="true"
                 :model="timeData"
                 label-width="100px">
          <el-form-item label="方案名称">
            <el-input v-model="timeData.name"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="方案描述">
            <el-input v-model="timeData.info"
                      style="width: 193px;"></el-input>
          </el-form-item>
          <el-form-item label="生效时间段">
            <el-form-item label="上午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;width:260px;">
              <el-time-picker is-range
                              v-model="timeData.amTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
            <el-form-item label="下午"
                          label-width="50px"
                          style="display:inline-block;vertical-align:top;">
              <el-time-picker is-range
                              v-model="timeData.pmTime"
                              range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间"
                              placeholder="选择时间范围">
              </el-time-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item label="生效星期">
            <el-checkbox-group v-model="timeData.day">
              <el-checkbox label="一"></el-checkbox>
              <el-checkbox label="二"></el-checkbox>
              <el-checkbox label="三"></el-checkbox>
              <el-checkbox label="四"></el-checkbox>
              <el-checkbox label="五"></el-checkbox>
              <el-checkbox label="六"></el-checkbox>
              <el-checkbox label="日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="失效日期">
            <el-date-picker v-model="timeData.limitTime"
                            type="date"
                            placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="copyVisible = false">确 定</el-button>
        <el-button @click="copyVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 推送弹窗 -->
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
        name: '',
        position: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          num: '1/1',
          meter: '10秒'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          num: '1/1',
          meter: '10秒'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          num: '1/1',
          meter: '10秒'
        }
      ],
      addDate: {
        name: ''
      },
      timeData: {
        name: '',
        info: '',
        amTime: [new Date(2018, 4, 18, 8, 0), new Date(2018, 4, 18, 12, 0)],
        pmTime: [new Date(2018, 4, 18, 13, 0), new Date(2018, 4, 18, 18, 0)],
        day: [],
        limitTime: ''
      },
      addVisible: false,
      updateVisible: false,
      copyVisible: false,
      showProject: false,
      total: undefined,
      listQuery: {}
    }
  },
  methods: {
    updateDialog(item) {
      this.updateVisible = !this.updateVisible
    },
    copyDialog(item) {
      this.copyVisible = !this.copyVisible
    },
    deleteTiming() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(_ => {
          this.$message({
            type: 'info',
            message: '取消操作'
          })
        })
    },
    toPush() {
      this.$router.push({ path: '/position/timing/push' })
    },
    // 分页改变
    pageChange(val) {
      this.listQuery.page = val
      console.log(this.listQuery)
    }
  }
}
</script>

<style lang="scss" scoped>
.time-project {
  .project {
    margin-bottom: 22px;
  }
}
</style>
