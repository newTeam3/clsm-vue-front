<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  @select="handleSelect">
    <div class="logobox">
      <img class="logoimg" src="../../assets/logo1.png" alt="">
    </div>
    <el-menu-item index="1">
      <template slot="title">
      <i class="el-icon-s-home"></i><span slot="title">首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-s-order"></i><span slot="title">我的日周报</span>
      </template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>

    <el-submenu index="3">

      <template slot="title">

      <i class="el-icon-s-comment"></i>

        <span slot="title"> <el-badge :value="200" :max="99" class="item">消息中心</el-badge></span>
      </template>

      <el-menu-item index="3-1">
        <el-badge :value="1" :max="99" class="item">
          系统通知
        </el-badge>
      </el-menu-item>
      <el-menu-item index="3-2">
        <el-badge :value="1" :max="99" class="item">
        我的消息
        </el-badge>
      </el-menu-item>

    </el-submenu>

    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-reading"></i><span slot="title">文章</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
    </el-submenu>
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-edit-outline"></i><span slot="title">答疑</span>
      </template>
      <el-menu-item index="3-1">选项1</el-menu-item>
      <el-menu-item index="3-2">选项2</el-menu-item>
      <el-menu-item index="3-3">选项3</el-menu-item>
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
      <el-menu-item index="7-2">签到</el-menu-item>
    </el-submenu>
    <div class="search">
      <el-form >
        <el-input size="small" placeholder="请输入名称"
                  suffix-icon="el-icon-search"></el-input>
      </el-form>
    </div>
    <el-menu-item index="6" style="float: right;">
    <template>
      <div class="demo-type">
        <div>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="45" ></el-avatar>

        </div>
      </div>
    </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
  import { getUser } from '../../api/User'
    export default {
        name: "Topnav",
      data() {
        return {
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
                console.log(res.data.img);
                let par = JSON.stringify(res.data)
                sessionStorage.setItem('user', par)
                this.userData = res.data
              }
            })
        }
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

  }

</style>
