<template>
<div>
<div>
  <ul style="margin:0 auto">
    <li class="d1" v-show="i.sort==0" v-for="i in dayReport.list">
     <h4>{{i.content}}</h4>
     <p>开始时间:{{i.createTime}}</p>
      <p>截止时间:{{i.deadline}}</p>
      <p v-if="currentTime>i.deadline">当前状态：已过期</p>
      <p v-if="currentTime<i.deadline">当前状态：进行中</p>
      <p style="float: right;margin-right: 20px"><el-button type="primary" @click="editReport(i.id,i.sort)" :disabled="currentTime>i.deadline" size="small">查看</el-button></p>
    </li>
  </ul>
</div>
<!--{{dayReport.list[1].content}}-->
</div>
</template>

<script>
  import { checkTask } from '../../api/Report'
    export default {
        name: "Day",
      data() {
        return {
          dayReport:[],
          currentTime: '',
        };
      },
      created() {
        this.currentTime = this.format(new Date(), "yyyy-MM-dd HH:mm:ss");
      },
      methods:{
        editReport(params,sort){

          var userId = JSON.parse(sessionStorage.getItem("user"));
          let para={uid:userId.id,
                    tid:params}
          checkTask(para).then(res=>{
            if(res.data){
              this.$message({
                type: 'error',
                message: "你已经提交过了，不可重复提交"
              })
            }else {
              console.log(sort)
              this.$router.push({ name: 'commit',query:{tid:params,sort:sort,uid:userId.id} });
            }
          })
        },

        format(date, fmt) {
          let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
          };
          if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
          for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
          return fmt;
        },


      }
    }
</script>

<style scoped>
.d1{
  height: 220px;
  width: 250px;
  text-align: left;
  padding-left: 5px;
  float: left;
  list-style-type: none;
  margin-left: 40px;
  border: 2px solid #e1e1e1;
  font-size: 14px;
  /*border-bottom: 0;*/
}
</style>
