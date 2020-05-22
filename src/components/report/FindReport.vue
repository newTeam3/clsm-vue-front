<template>
  <div>
    <div class="bread">
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>我的报告</el-breadcrumb-item>
  </el-breadcrumb>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick" stretch v-loading="loading" element-loading-text="拼命加载中">
      <el-tab-pane label="日报" name='0'><Day ref="day"></Day></el-tab-pane>
      <el-tab-pane label="周报" name='1'><Week ref="week"></Week></el-tab-pane>
    </el-tabs>
<!--    <div>-->
<!--      <div v-for="i in taskData">-->
<!--        {{ i.content}}-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
    import { getTask } from '../../api/Report'
    import Day from "./Day";
    import Week from "./Week";
    export default {
        name: "FindReport",
      components: {
        Day,
        Week,
      },
      data() {
        return {
          activeName: '0',
          formInline: {
            page: 1,//当前页
            rows: 6,
          },
          loading: false,
          taskData:[],
        };
      },
      created() {

      },
      mounted() {
        this.getTaskData(this.formInline);
      },
      methods: {
        handleClick(tab, event) {

          console.log(event.target.getAttribute('id'))
        },
        getTaskData(params){
          this.loading=true;
          getTask(params).then(res=>{
            if(res.status==200){
              this.loading=false;
              console.log(res.data.list)
              this.$refs.day.dayReport=res.data
              this.$refs.week.weekReport=res.data
            }

          })
        }
      }
    };
</script>

<style scoped>
.bread{
  padding-top: 12px;
  padding-left: 8px;
}
</style>
