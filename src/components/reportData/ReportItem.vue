<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报告详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
<ul class="u1">
  <li>
      <span style="color: #7ec6f6" v-if="sort==1">本周工作:</span>
      <span style="color: #7ec6f6" v-else>今日工作:</span>
     {{reportData.work}}
  </li>
  <li>
  <span style="color: #7ec6f6">遇到问题:</span>
  {{reportData.problem}}
</li>
  <li>
    <span style="color: #7ec6f6">解决方法:</span>
    {{reportData.solve}}
  </li>
  <li>
    <span v-if="sort==1" style="color: #7ec6f6">本周心得:</span>
    <span v-else style="color: #7ec6f6">今日心得:</span>
    {{reportData.summary}}
  </li>
  <li>
    <span v-if="sort==1" style="color: #7ec6f6">下周计划:</span>
    <span v-else style="color: #7ec6f6">明日计划:</span>
    {{reportData.plan}}
  </li>
  <li>
    <span style="color: #7ec6f6">老师评语:</span>
   <p><span v-for="i in reportEvaluate"> {{i.content}}</span></p>
  </li>
</ul>
</div>
</template>

<script>
  import { getMessageItem,findEvaluateByMid } from '../../api/ReportData'
    export default {
        name: "ReportItem",
      data(){
          return{
            sort:'',
            id:'',
            reportData:[],
            reportEvaluate:[],
          }
      },
      created() {
        this.sort=this.$route.query.sort
        this.id=this.$route.query.id
        let param={id:this.id}
        this.getData(param)
        let para={mid:this.id}
        this.getComment(para)
      },
      methods:{
        async getData(param){
          getMessageItem(param).then(res=>{
            if(res.status==200){
              this.reportData=res.data
              console.log(this.reportData)
            }
          })
        },
        getComment(param){
         findEvaluateByMid(param).then(res=>{
           if(res.status==200){
             this.reportEvaluate=res.data
             console.log("vv"+JSON.stringify(this.reportEvaluate))
           }
         })
       }
      }
    }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
  .u1{
    list-style: none;
    text-align: left;
    margin-top: 20px;
    margin-left: 400px;
  }
  .u1 li{
    padding-top: 20px;
  }
</style>
