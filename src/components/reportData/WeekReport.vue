<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的报告</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form :inline="true" :model="formInline" class="user-search">
    <el-form-item label="搜索：">
      <el-select v-model="formInline.state" clearable placeholder="请选择评阅状态" size="small">
        <el-option
          label="未评阅"
          :value="0">
        </el-option>
        <el-option
          label="已评阅"
          :value="1">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="">
      <el-select v-model="formInline.sort" clearable placeholder="请选择报告类型" size="small">
        <el-option
          label="日报"
          :value="0">
        </el-option>
        <el-option
          label="周报"
          :value="1">
        </el-option>
      </el-select>
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
      prop="task.content"
      label="报告主题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="time"
      label="提交时间">
    </el-table-column>
    <el-table-column
      label="报告类型"
      :formatter="stateFormat">
    </el-table-column>
    <el-table-column
      label="评阅状态"
      :formatter="stateFormat2">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="230">
      <template slot-scope="scope">
        <el-button @click="handEdit(scope.$index, scope.row)"  type="primary" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
</div>
</template>

<script>
  import Pagination from "../public/Pagination";
  import { getMessageByUid } from '../../api/ReportData'
    export default {
        name: "WeekReport",
      components: {Pagination},
      data() {
          return{
            loading:false,
            tableData:[],
            formInline: {
              page: 1,//当前页
              rows: 5,
              key:{status:1}
            },
            editForm: {
              sort:'',
              content:'',
              state:'',
            },
            pageparm: {
              currentPage: 1,
              pageSize: 5,
              total: 1
            },
          }
      },
      created() {
          let userId = JSON.parse(sessionStorage.getItem("user"));
          let param={page:1,rows:5,key:{status:1,uid:userId.id}}
          this.getData(param)
      },
      methods:{
        getData(param){
          this.loading=true
          getMessageByUid(param).then(res=>{
            if(res.status==200){
              this.loading=false
              this.tableData=res.data.list
              console.log(this.tableData)
            }
          })
        },
        stateFormat(row) {
          if (row.task.sort === 1) {
            return "周报";
          } else {
            return "日报";
          }
        },
        stateFormat2(row) {
          if (row.state === 1) {
            return "已评阅";
          } else {
            return "待评阅";
          }
        },

        callFather(parm) {
          let userId = JSON.parse(sessionStorage.getItem("user"));
          this.formInline.page = parm.currentPage
          this.formInline.rows = parm.pageSize
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{state:this.formInline.state,
              sort:this.formInline.sort,
              status:this.formInline.key.status,
              uid:userId.id}};
          this.getData(para)
        },
        search() {
          console.log("contents："+this.formInline.sort)
          let userId = JSON.parse(sessionStorage.getItem("user"));
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{state:this.formInline.state,
              sort:this.formInline.sort,
              status:this.formInline.key.status,
              uid:userId.id}};
          this.getData(para)
        },

        exportExcel() {
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/Excel/Export2Excel');
            const tHeader = ['报告主题', '提交时间', '评阅状态','报告类型'];
            // 上面设置Excel的表格第一行的标题
            const filterVal = ['task.content', 'time', 'state','sort'];
            // 上面的index、nickName、name是tableData里对象的属性
            const list = this.tableData;  //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '我的周报列表excel');
          })
        },

        formatJson(filterVal, jsonData) {
          return jsonData.map(v => filterVal.map(j => v[j]))
        },
        handEdit(index,row){
          this.$router.push({ name: 'ReportItem',query:{id:row.id,sort:row.task.sort} });
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
