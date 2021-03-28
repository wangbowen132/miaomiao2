<template>
  <div>
    <el-table
      :data="nowUsersList"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="date"
        label="注册日期">
      </el-table-column>
      <el-table-column
        fixed
        label="用户头像">
        <template slot-scope="scope">
          <el-avatar :size="60" src="https://empty" @error="errorHandler">
            <img :src="scope.row.HeadImg"/>
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="email"
        label="用户邮箱">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleToFreeze(scope.row)" size="small" :type="scope.row.isFreeze ? 'primary' : ''">
            {{ scope.row.isFreeze ? '已冻结' : '未冻结' }}
          </el-button>
          <el-button @click="handleToDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :current-page.sync="currentPage"
      :total="usersList.length">
    </el-pagination>
  </div>
</template>

<script>
import { messageBox } from '@/components/JS'
export default {
  name: 'Users',
  data() {
    return {
      usersList: [],
      pageSize: 3,
      currentPage: 1
    }
  },
  methods: {
    handleToFreeze(row) {
      console.log(!row.isFreeze);
      this.axios.post('/api2/admin/freezeUser', {
        email: row.email,
        isFreeze: !row.isFreeze
      }).then((res) => {
        if(res.data.status === 0){
          this.$alert('账号冻结操作成功', '账号操作', {
            confirmButtonText: '确定',
            callback: () => {
              row.isFreeze = !row.isFreeze;
            }
          });
        }else{
          this.$alert('账号冻结操作失败', '账号操作', {
            confirmButtonText: '确定'
          });
        }
      });
    },
    handleToDelete(index, row){
      this.axios.post('/api2/admin/deleteUser', { email: row.email }).then((res) => {
        if(res.data.status === 0){
          this.$alert('账号已删除', '账号操作', {
            confirmButtonText: '确定',
            callback: () => {
              this.usersList.splice(index, 1);
            }
          });
        }else{
          this.$alert('账号删除失败', '账号操作', {
            confirmButtonText: '确定',
          });
        }
      })
    }
  },
  computed: {
    nowUsersList(){
      return this.usersList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
    }
  },
  mounted(){
    this.axios.get('/api2/admin/usersList').then((res) => {
      if(res.data.status === 0){
        this.usersList = res.data.data.usersList;
      }else{
        messageBox({
          title: '用户列表',
          content: '用户列表获取失败',
          ok: '确定'
        });
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.pagination{ margin-top: 25px; }
</style>