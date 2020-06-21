<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>所有提问</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.title"  placeholder="输入问题标题"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入发布人名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="warning" icon="el-icon-download" @click="exportExcel" >导出</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit2" >发布问题</el-button>
        <el-button size="small" type="primary" icon="el-icon-s-custom" @click="handleEdit3" >我的提问</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      style="width: 75%;margin: auto"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        prop="deadline"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="公告内容">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发布时间">
      </el-table-column>
      <el-table-column
        prop="quanity"
        label="阅读量">
      </el-table-column>
      <el-table-column
        label="有无回答"
        :formatter="stateFormat">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="230">
        <template slot-scope="scope">
          <el-button @click="handEdit(scope.$index, scope.row)"  type="primary" size="small">查看</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" v-show="scope.row.userVO.id==uid">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <el-dialog title="发布提问" :visible.sync="editFormVisible" width="30%" @click="closeDialog" center>
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="标题" prop="title">
          <el-input size="small"  auto-complete="off" v-model="editForm.title" placeholder="请输入提问标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="editForm.content">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small"
                   type="primary"
                   :loading="loading"
                   class="title"
                   @click="createData">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


  import Pagination from "../public/Pagination"

    export default {
        name: "DayReport",
      components: {Pagination},
      data() {
        return {
          uid:'',
          loading:false,
          tableData:[],
          formInline: {
            page: 1,//当前页
            rows: 5,

            key:{status:1}
          },
          editForm: {
            name: '',
            title:'',
            content:'',
          },
          pageparm: {
            currentPage: 1,
            pageSize: 5,
            total: 1
          },
        }
      },
      created() {
          let userId = JSON.parse(sessionStorage.getItem("user"))
          let param={ page:1,rows: 5,key:{status:1,uid:userId.id}}
          this.getData(param)
      },
      methods:{
        async getData(param){
          this.loading = true
          getTaskByUid(param).then(res=>{
            this.loading = false
            if(res.status!=200){
              this.$message({
                type: 'error',
                message: "查询失败"
              })
            } else {
              this.$message({
                message: "查询成功",
                type: "success"
              });
              //将查询到的用户数据赋值给tableData
              this.tableData = res.data.list
              console.log(this.tableData)
              // 将当前第几页每页多少条数据等赋值给pageparm
              this.pageparm.currentPage = this.formInline.page
              this.pageparm.pageSize = this.formInline.rows
              this.pageparm.total = res.data.total
            }
          })
            .catch(err => {
              this.loading = false
              this.$message.error('加载失败，请稍后再试！')
            })
        },
        stateFormat(row) {
          if (row.sort === 1) {
            return "周报";
          } else {
            return "日报";
          }
        },
        handEdit(index,row){

        },
        handleDelete(index,row){

        },
        callFather(parm) {
          // this.formInline.page = parm.currentPage
          // this.formInline.rows = parm.pageSize
          // let para = {page: this.formInline.page,
          //   rows:this.formInline.rows,
          //   key:{"uid":this.uid,
          //     "status":1}};
          // this.getData(para)
        },
      }
    }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
  .user-search {
    margin-top: 20px;
    margin-left: 150px;
  }
</style>
