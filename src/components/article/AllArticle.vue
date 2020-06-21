<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部文章</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <el-form :inline="true" :model="formInline" class="user-search">
    <el-form-item label="搜索：">
      <el-input size="small" v-model="formInline.title"  placeholder="输入文章标题"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-select v-model="formInline.sid" clearable placeholder="请选择文章分类" size="small">
        <el-option
          v-for="(item,index) in selectData"
          :key="item.id"
          :label="item.sortName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button size="small" type="warning" icon="el-icon-download" @click="exportExcel" >导出</el-button>
      <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit2" >发布文章</el-button>
      <el-button size="small" type="primary" icon="el-icon-s-custom" @click="handleEdit3" >我的文章</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="tableData"
    stripe
    style="width: 75%;margin: auto"
    v-loading="loading"
    element-loading-text="拼命加载中">
    <el-table-column
      prop="name"
      label="发布人"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="文章标题">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="发布时间">
    </el-table-column>
    <el-table-column
      prop="quantity"
      label="阅读量">
    </el-table-column>
    <el-table-column
      prop="sortName"
      label="文章类别">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="230">
      <template slot-scope="scope">
        <el-button @click="handEdit(scope.$index, scope.row)"  type="primary" size="small">查看</el-button>
        <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)" v-show="scope.row.uid==uid">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
  <el-dialog title="发布文章" :visible.sync="editFormVisible" width="30%" @click="closeDialog" center>
    <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
      <el-form-item label="标题" prop="title">
        <el-input size="small"  auto-complete="off" v-model="editForm.title" placeholder="请输入提问标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input size="small"  auto-complete="off" v-model="editForm.content" placeholder="请输入提问内容"></el-input>
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
  import Pagination from "../public/Pagination";
  import { findAllArticle,getSort,banArticle } from '../../api/Article'
  export default {
    name: "AllArticle",
    components: {Pagination},
    data(){
      return{
        uid:'',
        loading:false,
        tableData: [],
        formInline: {
          page: 1,//当前页
          rows: 5,
          key:{status:1}
        },
        editForm: {
          id: '',
          sid:'',
          name: '',
          title:'',
          content:'',

        },
        selectData:[],
        pageparm: {
          currentPage: 1,
          pageSize: 5,
          total: 1
        },
        editFormVisible: false,
        rules: {
          title: [
            { required: true, message: '请输入提问标题', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请输入提问内容', trigger: 'blur' }
          ],
        },
      }
    },
    created() {
      let userId = JSON.parse(sessionStorage.getItem("user"));
      this.uid=userId.id
      this.getArticleData(this.formInline)
      this.getSortAll()
    },
    methods:{
      async getArticleData(param){
        this.loading = true
        findAllArticle(param).then(res=>{
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
      async getSortAll() {
        getSort()
          .then(res => {
            if(res.status==200){
              this.selectData=res.data
            }
          })
      },
      callFather(parm) {
        this.formInline.page = parm.currentPage
        this.formInline.rows = parm.pageSize
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"sid":this.formInline.sid,
            "title":this.formInline.title,
            status:1}};
        this.getArticleData(para)
      },
      search() {
        // console.log(this.formInline.college)
        let para = {page: this.formInline.page,
          rows:this.formInline.rows,
          key:{"sid":this.formInline.sid,
            "title":this.formInline.title,
            "status":1}};
        this.getArticleData(para)
      },
      stateFormat(row) {
        if (row.status === 1) {
          return "已有回答";
        } else {
          return "暂无回答";
        }
      },
      handEdit(index,row){
        this.$router.push({ name: 'ArticleItem',query:{id:row.id} });
      },
      handleEdit2() {
        this.$router.push({ name: 'addArticle' });
      },
      handleEdit3() {
        let userId = JSON.parse(sessionStorage.getItem("user"));
        let param={ page: 1,
          rows: 5,
          key:{state:1,uid:userId.id}}
        this.getArticleData(param)
      },
      handleDelete(index, row) {
        this.$confirm("确认删除该文章吗?", "提示", {
          type: "warning"
        }).then(() => {
          let para = {id: row.id,
            status:0};
          banArticle(para).then(res => {
            if (res.status==200) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            }

            this.getArticleData(this.formInline);
          })
        }).catch(() => {
        });
      },
      closeDialog() {
        this.editFormVisible = false
      },
      createData () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              let para = {userVO:{id:this.editForm.id},title:this.editForm.title,
                content:this.editForm.content}
              // // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
              addQuestion(para).then(res => {
                if(res.status==200){
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.getQuestionsData(this.formInline);
                }else{
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }

              })
            }).catch(err => {
              console.log(e)
            })
          }
        })
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
