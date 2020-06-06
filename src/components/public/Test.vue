<template>
    <div>
<!--&lt;!&ndash;      {{commentData[0].child}}&ndash;&gt;-->
<!--      <ul style="margin:0 auto">-->
<!--        <li class="d1" v-for="i in commentData">-->
<!--          <span>{{i.date}}</span>-->
<!--          <span>{{i.name}}:</span>-->
<!--          <span>{{i.content}}</span>-->
<!--          <p style="margin-left: 200px" v-for="ii in i.child">-->
<!--            <span>{{ii.date}}</span>-->
<!--            <span>{{ii.name}}</span>-->
<!--            <span>{{ii.content}}</span>-->
<!--          </p>-->
<!--        </li>-->
<!--      </ul>-->
    </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "Test",
      data(){
          return{
            commentData:[],
          }
      },
      created() {
          // this.getCommit(1);
      },
      methods:{
        getCommit(params){
          let para={qid:params}
          axios.get("/getComments",{params:para}).then(res=>{
            console.log(res.data)
            this.commentData=res.data
          })
        }
      }
    }
</script>

<style scoped>

</style>
