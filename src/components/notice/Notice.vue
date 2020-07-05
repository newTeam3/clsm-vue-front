<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查看公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.content"  placeholder="输入公告内容"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.name" placeholder="输入发布人名字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="warning" icon="el-icon-download" @click="exportExcel" >导出</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      style="width: 75%;margin: auto"
      v-loading="loading"
      element-loading-text="拼命加载中">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userVO.name"
        label="发布人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="content"
        label="公告内容">
      </el-table-column>
      <el-table-column
        prop="time"
        label="发布时间">
      </el-table-column>
    </el-table>
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
  </div>
</template>

<script>
  import Pagination from "../public/Pagination";
  import { getAllNotice } from '../../api/Notice'
    export default {
        name: "Notice",
      components: {Pagination},
      data(){
          return{
            loading:false,
            tableData: [],
            formInline: {
              page: 1,//当前页
              rows: 5,
            },
            editForm: {
              id: '',
              name: '',
              content:'',
              uid:'',
            },
            pageparm: {
              currentPage: 1,
              pageSize: 5,
              total: 1
            },
          }
      },
      created() {
          this.getNoticeData(this.formInline)
      },
      methods:{
       async getNoticeData(param){
         this.loading = true
          getAllNotice(param).then(res=>{
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
              console.log("test:"+JSON.stringify(res.data.list))
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
        callFather(parm) {
          this.formInline.page = parm.currentPage
          this.formInline.rows = parm.pageSize
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{"content":this.formInline.content,"name":this.formInline.name}};
          this.getNoticeData(para)
        },
        search() {
          // console.log(this.formInline.college)
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{"content":this.formInline.content,
              "name":this.formInline.name}};
          this.getNoticeData(para)
        },
        stateFormat(row) {
          if (row.status === 1) {
            return "启用";
          } else {
            return "禁用";
          }
        },
        exportExcel() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/Excel/Export2Excel');
            const tHeader = ['ID', '发布人', '内容','发布时间','当前状态'];
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['id', 'userVO.name', 'content','time','status'];
            // 上面的index、nickName、name是tableData里对象的属性
            const list = this.tableData;  //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '公告列表excel');
          })
        },

        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
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
