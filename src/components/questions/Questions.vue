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
        prop="userVO.name"
        label="发布人"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="content"
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
  import Pagination from "../public/Pagination";
  import { findAllQuestion,addQuestion,banQuestion } from '../../api/questions'
    export default {
        name: "Questions",
      components: {Pagination},
      data(){
        return{
          uid:'',
          loading:false,
          tableData: [],
          formInline: {
            page: 1,//当前页
            rows: 5,
            key:{state:1}
          },
          editForm: {
            id: '',
            uid:'',
            name: '',
            title:'',
            content:'',
          },
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
        this.getQuestionsData(this.formInline)
      },
      methods:{
        async getQuestionsData(param){
          this.loading = true
          findAllQuestion(param).then(res=>{
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
        callFather(parm) {
          this.formInline.page = parm.currentPage
          this.formInline.rows = parm.pageSize
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{"name":this.formInline.name,
              "title":this.formInline.title}};
          this.getQuestionsData(para)
        },
        search() {
          // console.log(this.formInline.college)
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{"name":this.formInline.name,
              "title":this.formInline.title}};
          this.getQuestionsData(para)
        },
        stateFormat(row) {
          if (row.status === 1) {
            return "已有回答";
          } else {
            return "暂无回答";
          }
        },
        handEdit(index,row){
          this.$router.push({ name: 'questionItem',query:{qid:row.id} });
        },
        handleEdit2() {
          // console.log("这是row"+JSON.stringify(row.id))
          this.editFormVisible = true
          let userId = JSON.parse(sessionStorage.getItem("user"));
            this.editForm.id = userId.id
            this.editForm.title = ''
            this.editForm.content = ''


        },
        handleEdit3() {
          let userId = JSON.parse(sessionStorage.getItem("user"));
          let param={ page: 1,
            rows: 5,
            key:{state:1,uid:userId.id}}
            this.getQuestionsData(param)
        },
        handleDelete(index, row) {
          this.$confirm("确认删除该提问吗?", "提示", {
            type: "warning"
          }).then(() => {
            let para = {id: row.id,
              state:0};
            banQuestion(para).then(res => {
              if (res.status==200) {
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              }

              this.getQuestionsData(this.formInline);
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
