<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/report/findReport' }" >我的报告</el-breadcrumb-item>
      <el-breadcrumb-item v-if="sort==0">提交日报</el-breadcrumb-item>
      <el-breadcrumb-item v-else>提交周报</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div style="width: 800px;margin: 20px auto;">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  label-width="30%" class="demo-ruleForm">
    <el-form-item v-if="sort==0" label="今日工作" prop="work">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.work">
      </el-input>
    </el-form-item>
    <el-form-item v-if="sort==1" label="本周工作" prop="work">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.work">
      </el-input>
    </el-form-item>

    <el-form-item label="遇到问题" prop="problem">
    <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="请输入内容"
      v-model="ruleForm.problem">
    </el-input>
  </el-form-item>
    <el-form-item label="解决办法" prop="solve">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.solve">
      </el-input>
    </el-form-item>
    <el-form-item v-if="sort==0" label="今日总结" prop="summary">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.summary">
      </el-input>
    </el-form-item>
    <el-form-item v-if="sort==1" label="本周总结" prop="summary">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.summary">
      </el-input>
    </el-form-item>
    <el-form-item v-if="sort==0" label="明日计划" prop="plan">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.plan">
      </el-input>
    </el-form-item>
    <el-form-item v-if="sort==1" label="下周计划" prop="plan">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="ruleForm.plan">
      </el-input>
    </el-form-item>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
    <el-button type="primary"
               :loading="loading"
               class="title"
               @click="handleEdit">保存</el-button>
  </el-form>
  </div>
  <el-dialog title="提交报告" :visible.sync="delVisible" width="30%" @click="closeDialog" center>
    <div class="del-dialog-cnt">确定要提交吗？</div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small" type="primary" :loading="loading" class="title" @click="commitReport" >保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import { commit } from '../../api/Report'
    export default {
        name: "Commit",
        // props:['tid','sort'],
      data(){
          return{
            tid:'',
            sort:'',
            uid:'',
            form: [],
            delVisible:false,
            loading:false,
            rules: {
              work: [
                { required: true, message: '请输入工作内容', trigger: 'blur' }
              ],
              problem: [
                { required: true, message: '请输入遇到困难', trigger: 'blur' }
              ],
              solve: [
                { required: true, message: '请输入解决办法', trigger: 'blur' }
              ],
              summary: [
                { required: true, message: '请输入总结', trigger: 'blur' }
              ],
              plan: [
                { required: true, message: '请输入计划', trigger: 'blur' }
              ],

            },
            ruleForm: {
              id: '',
              work: '',
              problem:'',
              solve:'',
              summary:'',
              plan:'',

            },
          }

      },
      created() {
        this.tid = this.$route.query.tid
        this.sort = this.$route.query.sort
        this.uid = this.$route.query.uid
      },
      methods:{
        closeDialog() {

          this.delVisible = false

        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },

        commitReport() {
          let para = {work: this.ruleForm.work,
                      problem:this.ruleForm.problem,
                      solve:this.ruleForm.solve,
                      summary:this.ruleForm.summary,
                      plan:this.ruleForm.plan,
                      userVO:{id:this.uid},
                      task:{id:this.tid}};
          console.log("uid:"+this.uid+"tid:"+this.tid+"work:"+this.ruleForm.work+"problem："+this.ruleForm.problem+"solve:"+this.ruleForm.solve)
          commit(para)
            .then(res => {
              this.loading = false
              if (res.status==200) {
                this.$message.success('操作成功')
              }else{
                this.$message.error('操作失败')
              }
              this.delVisible = false;//关闭删除提示的弹窗
              this.$router.push({ path: '/report/findReport' });
            });

        },
        handleEdit: function (index, row) {
          this.delVisible = true

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
