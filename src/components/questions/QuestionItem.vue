<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/questions/questions  ' }">所有答疑</el-breadcrumb-item>
      <el-breadcrumb-item>答疑详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
    <div style="text-align: center">
      <h1>{{this.questionData.qes.title}}</h1>
      <p>提问人：{{this.questionData.qes.userVO.name}}</p>
      <p>提问内容：{{this.questionData.qes.content}}</p>
      <HR align=center width=80% color=#987cb9 SIZE=1></HR>
    </div>
  <div style="text-align: center;width: 1000px;">
    <el-form label-width="200px" :model="editForm" style="margin-left: 250px" :rules="rules" ref="editForm">
      <el-form-item label="发布评论" prop="content">
        <el-input
          style="width: 400px"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="editForm.content">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm('editForm')">重置</el-button>
        <el-button type="primary"
                   :loading="loading"
                   class="title"
                   @click="commit">保存</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li v-if="JSON.stringify(questionData.asw)=='[]'" style="text-align: center;list-style: none"><p style="margin-left: 350px"> <el-link type="success">暂无评论，快来评论吧</el-link></p></li>
      <li v-else style="list-style: none" v-for="(i,index) in questionData.asw">
        <span>
           <img style="border-radius:25px;height: 50px;width: 50px;line-height: 60px" :size="50" :src="i.userVO.img"/>
          第{{questionData.asw.length-index}}楼
          {{i.userVO.name}}回答:
        </span>
        <span style="float: right">
        {{i.time}}
        </span>
        <p>{{i.content}}</p>
        <HR align=center width=100% color=#987cb9 SIZE=1 style="margin-left: 200px"></HR>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import {findQuestionById,reply } from '../../api/questions'
    export default {
        name: "QuestionItem",
      data() {
        return {
          qid:'',
          questionData:[],
          editForm:{
            content:'',
          },
          loading:false,
          rules: {
            content: [
              { required: true, message: '请输入评论内容', trigger: 'blur' }
            ],
          },
        }
      },
      created() {
        this.qid = this.$route.query.qid
        let para={id:this.qid}
        this.getData(para)
      },
      methods:{
          getData(param){
            findQuestionById(param).then(res=>{
              if(res.status=200){
                console.log(res.data)
                this.questionData=res.data
              }
            })
          },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        commit() {
          this.$refs.editForm.validate(valid => {
            if (valid) {
              let userId = JSON.parse(sessionStorage.getItem("user"));
              let para = {userVO:{id:userId.id},
                question:{id:this.qid},
                content:this.editForm.content};
              console.log(JSON.stringify(userId)+this.qid+this.editForm.content)
              reply(para).then(res=>{
                if(res.status==200){
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  let para={id:this.qid}
                  this.getData(para)
                  this.$refs["editForm"].resetFields();
                }else{
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }
              })
            }
          })
        },
      }
    }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
</style>
