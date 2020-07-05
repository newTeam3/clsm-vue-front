<template>
<div>
 <ul>
   <li v-for="i in tableData">
    <div style="padding-top: 20px;margin-left: 10px">
      <img style="float:left;border-radius:35px;height:70px;width: 70px;line-height: 70px" :size="70" :src="i.img"/>
      <span style="float:left;display:inline-block;line-height:70px;padding-left: 5px">{{i.name}}@你</span>
      <span style="float: right;line-height: 70px">{{i.time}}</span>

    </div>
     <p style="margin-top: 100px;text-align: center">{{i.content}}</p>
     <span style="float: right;color: #69c8ff;" @click="handleEdit2(i.aid)">查看</span>
     <span style="float: right;color: #69c8ff" @click="handleEdit(i.id,i.aid)">回复&nbsp;&nbsp;</span>
   </li>

 </ul>
  <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>

  <el-dialog title="回复" :visible.sync="editFormVisible" width="30%" @click="closeDialog" center>
    <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
      <el-form-item label="回复内容" prop="content">
        <el-input
          style="width: 250px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入回复内容"
          v-model="editForm.content">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small"
                 type="primary"
                 class="title"
                 @click="reply">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import Pagination from "../public/Pagination";
  import {getReply,addReply } from '../../api/Article'
  import store from "../../vuex/store";
  import {addQuestion} from "../../api/questions";
    export default {
        name: "ReplyItem",
      components: {Pagination},
      data(){
        return{
          editFormVisible:false,
          tableData:[],
          formInline: {
            page: 1,//当前页
            rows: 5,
            key:{id:store.state.uid.id}
          },
          pageparm: {
            currentPage: 1,
            pageSize: 5,
            total: 1
          },
          editForm: {
            id:'',
            pid:'',
            aid:'',
            content:'',
          },
          rules: {
            content: [
              { required: true, message: '请输入回复内容', trigger: 'blur' }
            ],
          },
        }
      },
      created() {
        this.getData(this.formInline)
      },
      methods:{
        async getData(param){
          getReply(param).then(res=>{
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
              this.pageparm.currentPage = this.formInline.page
              this.pageparm.pageSize = this.formInline.rows
              this.pageparm.total = res.data.total
            }
          })
        },
        callFather(param) {
          this.formInline.page = param.currentPage
          this.formInline.rows = param.pageSize
          let para = {page: this.formInline.page,
            rows:this.formInline.rows,
            key:{id:store.state.uid.id}};
          this.getData(para)
        },
        handleEdit(pid,aid) {
          // console.log("这是row"+JSON.stringify(row.id))
          this.editFormVisible = true
          this.editForm.id = store.state.uid.id
          this.editForm.pid = pid
          this.editForm.aid=aid
          this.editForm.content = ''


        },
        handleEdit2(aid){
          this.$router.push({ name: 'ArticleItem',query:{id:aid} });
        },
        reply(){
            this.$refs.editForm.validate(valid => {
              if (valid) {
                this.$confirm("确认提交吗？", "提示", {}).then(() => {
                  let para = {uid:this.editForm.id,pid:this.editForm.pid,aid:this.editForm.aid,
                    content:this.editForm.content}
                  // // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
                  addReply(para).then(res => {
                    if(res.status==200){
                      this.$message({
                        message: "提交成功",
                        type: "success"
                      });
                      this.editFormVisible = false;
                      this.getData(this.formInline)
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
        closeDialog() {
          this.editFormVisible = false
        },

      }
    }
</script>

<style scoped>
ul li{
  margin:10px auto;
  list-style: none;
  width: 600px;
  height: 200px;
  background-color: #f0f4ff;
}
</style>
