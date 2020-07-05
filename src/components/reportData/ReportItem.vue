<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报告详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="d1">
    <div style="height: 100px">
   <img style="float:left;border-radius:35px;height:70px;width: 70px;line-height: 70px;margin-top: 20px;margin-left: 20px" :size="70" :src="userData.img"/>
    <span style="float:left;display:inline-block;line-height:100px;padding-left: 20px"><strong>{{userData.name}}</strong></span>
    <span style="float: right;line-height: 100px"><strong>提交于{{reportData.time}}</strong></span>
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
 <span v-for="i in reportEvaluate">{{i.userVO.name}}: {{i.content}}</span>
  </li>
</ul>
  </div>
</div>
</template>

<script>
  import store from "../../vuex/store";
  import { getMessageItem,findEvaluateByMid } from '../../api/ReportData'
    export default {
        name: "ReportItem",
      data(){
          return{
            userData:{},
            sort:'',
            id:'',
            reportData:[],
            reportEvaluate:[],
          }
      },
      created() {
        this.sort=this.$route.query.sort
        this.id=this.$route.query.id
        this.userData=store.state.uid
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
  .d1{
    height: 500px;
    width: 800px;
    background-color:#f0f4ff;
    margin-top: 20px;
    margin-left: 350px;
  }
  .u1{
    list-style: none;
    text-align: left;


  }
  .u1 li{
    padding-top: 30px;
  }
</style>
