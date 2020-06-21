<template>
    <div>
      <div class="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
     <ul>
       <li style=" list-style:none;text-align: center">
         <i class="el-icon-message-solid"></i>最新公告：{{NoticeData[0].content}}--{{NoticeData[0].time}}
<!--         <el-button size="small" type="primary" icon="el-icon-search" @click="search">更多</el-button>-->
          <span @click="search"  class="s1">...更多</span>
       </li>
     </ul>
      </div>
      <div class="d0">
        <div class="d1">
        <ul class="ul1">
          <li>
            <el-avatar style="margin-left:70px " :src="userData.img" :size="100"></el-avatar>
          </li>
          <li>
            <span style="color: #7ec6f6">用户姓名：</span>{{userData.name}}
          </li>
          <li>
            <span style="color: #7ec6f6">所属院系：</span><span >{{userData.coidName}}</span>
          </li>
          <li>
            <span style="color: #7ec6f6">班级名称：</span><span >{{userData.cidName}}</span>
          </li>
          <li>
            <span style="color: #7ec6f6">所属项目组：</span><span>{{userData.gidName}}</span>
          </li>
          <li>
            <span style="color: #7ec6f6">担任职务：</span><span>{{userData.pidName}}</span>
          </li>
<!--          <li>-->
<!--            角色：<span v-for="i in userData.roles">-->
<!--            {{i.roleName}}&nbsp;-->
<!--          </span>-->
<!--          </li>-->
        </ul>
        </div>
        <div class="d3">
          <ul>
            <li>
              mmjgig
            </li>
          </ul>
        </div>
      </div>
      <div class="d2">
        <el-calendar>
          <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
          <template
            slot="dateCell"
            slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
          </template>
        </el-calendar>
      </div>
    </div>
</template>

<script>
  import { findUserByID } from '../../api/User'
  import { getAllNotice } from '../../api/Notice'
    export default {
        name: "Test",
      data(){
          return{
            NoticeData:[],
            userData:[],
          }
      },
      created() {
        this.getNotice()
        let userId = JSON.parse(sessionStorage.getItem("user"))
        let param={id:userId.id}
        this.getData(param)
      },
      methods:{
      async  getNotice(){
          let par={page:1,rows:5}
          getAllNotice(par).then(res=>{
            if(res.status==200){
              this.NoticeData=res.data.list
            }
          })
        },
        async getData(param){
          findUserByID(param).then(res=>{
            if(res.status==200){
              this.userData=res.data
              console.log("user"+JSON.stringify(this.userData))
            }
          })
        },
        search(){
          this.$router.push({ name: 'Notice' });
        },
      }
    }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
  .is-selected {
    color: #1989FA;
  }
  .s1{
    color:  #7ec6f6;

  }
  .s1:hover{
    color: #6bff30;
  }
  .ul1 li{
    list-style: none;
    text-align: left;
    padding-top: 20px;
  }
  .d0{
    background-color: #2c3e50;
    height: 500px;
    width: 300px;
    display: inline;
    margin-top: 100px;
    margin-left: 200px;
  }
  .d1{
    margin-top: 100px;
    height: 350px;
    background: rgba(255, 255, 255, .3);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
    width: 300px;

    float:left;
    border-radius:10px;
    border:1px solid #ffffff;
    margin-left: 200px;
    /*opacity: 0.8;*/
  }
  .d3{
    background-color: #ca30b1;
  }
  .d2{
    margin-top: 20px;
    background-color: darkturquoise;
    height: 400px;
    display: inline;float:right;
    width: 700px;
    margin-right: 200px;
    /*opacity: 0.8;*/
  }
</style>
