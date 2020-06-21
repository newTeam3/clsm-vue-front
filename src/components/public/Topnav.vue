<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect">
    <div class="logobox">
      <img class="logoimg" src="../../assets/logo1.png" alt="">
    </div>
    <el-menu-item index="1">
      <template slot="title">
      <i class="el-icon-s-home"></i><span slot="title"><router-link to="/test/test">首页</router-link></span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-order"></i><span slot="title">我的日周报</span>
      </template>
<!--      <el-menu-item index="2-1">-->
<!--        <router-link to="/reportData/dayReport">日报</router-link>-->
<!--      </el-menu-item>-->
      <el-menu-item index="2-1">
        <router-link to="/reportData/weekReport">我的报告</router-link>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="3">

      <template slot="title">

      <i class="el-icon-s-comment"></i>

        <span slot="title"> 消息中心</span>
      </template>

      <el-menu-item index="3-1">
        <router-link to="/notice/notice">公告</router-link>
      </el-menu-item>
      <el-menu-item index="3-2">
        文章回复
      </el-menu-item>
      <el-menu-item index="3-3">
        答疑回复
      </el-menu-item>

    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-reading"></i><span slot="title">文章</span>
      </template>
      <el-menu-item index="4-1">
        <router-link to="/article/allArticle">全部文章</router-link>
      </el-menu-item>
      <el-menu-item index="4-2">
        <router-link to="/article/addArticle">发布文章</router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-edit-outline"></i><span slot="title">答疑</span>
      </template>
      <el-menu-item index="5-1">
        <router-link to="/questions/questions">所有提问</router-link>
      </el-menu-item>
<!--      <el-menu-item index="5-2">-->
<!--        <router-link to="/questions/myQuestions">我的提问</router-link>-->
<!--      </el-menu-item>-->

    </el-submenu>
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-s-flag"></i><span slot="title">考试</span>
      </template>
      <el-menu-item index="6-1">
        <router-link to="/answer/Answer_index">考试中心</router-link>
      </el-menu-item>
      <el-menu-item index="6-1">
        <router-link to="/answer/Answer_My">我的考试</router-link>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-s-flag"></i><span slot="title">任务</span>
      </template>
      <el-menu-item index="7-1">
        <router-link to="/report/findReport">报告</router-link>
      </el-menu-item>
      <el-menu-item index="7-2">
      <router-link to="/notice/notice">公告</router-link>
      </el-menu-item>
    </el-submenu>
<!--    <div class="search">-->
<!--      <el-form >-->
<!--        <el-input size="small" placeholder="请输入名称"-->
<!--                  suffix-icon="el-icon-search"></el-input>-->
<!--      </el-form>-->
<!--    </div>-->
    <el-submenu index="8" style="float: right;">
      <template slot="title">
            <el-avatar :src="userData.img" :size="45" ></el-avatar>
      </template>
    <el-menu-item index="8-1" >
      <router-link to="/user/personal">个人中心</router-link>
    </el-menu-item>
      <el-menu-item index="8-2" >
        <router-link to="/user/changePwd">修改密码</router-link>
      </el-menu-item>
      <el-menu-item index="8-3" @click="logout" >
     退出系统
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  import { getUser } from '../../api/User'
    export default {
        name: "Topnav",
      data() {
        return {
          avatarUrl:require("@/assets/img/avatar.jpg"),
          activeIndex: '1',
          activeIndex2: '1',
          userData:[]
        };
      },
      created() {
        this.getData()
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
        async  getData() {
          getUser()
            .then(res => {
              if (res.status == 200) {
                console.log(res.data);
                let par = JSON.stringify(res.data)
                sessionStorage.setItem('user', par)
                this.userData = res.data
              }
            })
        },
        logout(){
          window.sessionStorage.clear()
          this.$router.push("/login")
        },
      }
    }

</script>

<style scoped>
  .logobox {
    height: 60px;
    width: 60px;
    line-height: 61px;
    color: white;
    font-size: 20px;
    text-align: center;
    padding: 0px 0px;
    display:inline-block;
    float: left;
  }
  .logoimg {
    height: 55px;
  }
  .search{
    display: inline-block;
    line-height: 60px;
    margin-right: -250px;

  }
  .el-badge__content.is-fixed {
    position: absolute;
    top: 5px;
    right: 10px;
    -webkit-transform: translateY(-50%) translateX(100%);
    transform: translateY(-50%) translateX(100%);
  }
  a {
    text-decoration: none;
    color: #2c3e50;
  }

</style>
