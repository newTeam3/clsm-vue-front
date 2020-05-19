<template>

  <el-container style="height: 100vh;background-color: #f5f5f5;">
    <el-header><Topnav></Topnav></el-header>
    <el-main style="padding-top: 10px">
      <div class="main">
        <router-view></router-view>
      </div>
    </el-main>
    <el-footer>
      <div class="footer">
      <Foot></Foot>
      </div>
    </el-footer>
  </el-container>

</template>

<script>
  import Topnav from "./public/Topnav";
  import Test from "./public/Test";
  import Foot from "./public/Foot";
    export default {
        name: "Index",
      components: {Foot, Test, Topnav}
    }
</script>

<style scoped>
  .el-footer{
    margin-top: -10px;
    padding-top: 0px;
  }
  .main{
    background-color: white;
    height: 100%;
  }
  .footer{
    height: 100%;
    background-color: #222c3a;
  }
  /*.el-header, .el-footer {*/
  /*  background-color: #f5f5f5;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 60px;*/
  /*}*/

  /*.el-aside {*/
  /*  background-color: #D3DCE6;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 200px;*/
  /*}*/

  /*.el-main {*/
  /*  margin-top: 10px;*/
  /*  background-color: white;*/
  /*  color: #333;*/
  /*  text-align: center;*/
  /*  line-height: 160px;*/
  /*  height: 650px;*/
  /*}*/

  /*body > .el-container {*/
  /*  margin-bottom: 40px;*/
  /*}*/

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
  /*  line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
  /*  line-height: 320px;*/
  /*}*/
</style>
