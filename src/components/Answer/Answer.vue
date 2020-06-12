<template>
  <div>
    <div style="font-size: 20px">
      <p>题库名称:<span v-text="ruleForm.name" style="margin:0 auto "></span></p>
      <p>试卷名称:<span v-text="ruleForm.paperName"></span></p>
      <div style=" border: solid 1px;">
        <p style="float: left;margin-right: 50px">
          <span>共</span><i class="content_lit" v-text="wor.length"></i><span>题，</span><span>合计</span><i
          class="content_fs" v-text="ruleForm.totalScore">60</i><span>分</span>
        </p>
        <p style="float: left;margin-right: 50px">考生名字:<span v-text="exams.name"> </span></p>
        <p style="float: left">考试时间:<span v-text="ruleForm.time+'分钟'"></span></p>
      </div>
      <p v-show="flag2">分数:<span v-text="exams.score+'分'" style="color: red;font-size: 23px"></span></p>
      <p highlight-current-row v-loading="loading"
         style="padding:7px;font-size: 25px; border: solid 1px;float: right;color: red;letter-spacing:3px;font-weight:bold;">
        {{minute}}:{{second}}</p>
    </div>
    <br>
    <br>
    <br>
    <ul>
      <li id="qu_0_0" highlight-current-row v-loading="loading" v-for="(wor1, index) in wor" :key="index"
          border element-loading-text="拼命加载中">

        <div class="test_content_nr_tt">
          <h3 v-text="" style="margin-left: -1200px">单选题</h3>
          <i v-text="index+1"></i> <span v-text="wor1.question">在生产管理信息系统中，下列操作步骤能正确将工单推进流程的是（  ）</span>
        </div>
        <div class="test_content_nr_main">
          <ul>
            <li class="option">
              <input type="radio" v-model="wor1.options" v-bind:value="'A'" >
              <label>
                A.
                <p class="ue" style="display: inline;" v-text="wor1.optionA">在工具栏中点击“workflow”标签</p>
              </label>
            </li>

            <li class="option">

              <input type="radio" v-model="wor1.options" v-bind:value="'B'">
              <label>
                B.
                <p class="ue" style="display: inline;" v-text="wor1.optionB">在缺陷单界面中点击“推进流程”按钮</p>
              </label>
            </li>

            <li class="option">

              <input type="radio" v-model="wor1.options" v-bind:value="'C'">
              <label>
                C.
                <p class="ue" style="display: inline;" v-text="wor1.optionC">在缺陷单界面中点击“提交”按钮</p>
              </label>
            </li>

            <li class="option">

              <input type="radio" v-model="wor1.options" v-bind:value="'D'">
              <label>
                D.
                <p class="ue" style="display: inline;" v-text="wor1.optionD">后台启动流程推进</p>
              </label>
              <div v-show="falg">
                <br>
                <div style="font-size: 17px;border: solid 1px red;">
                  <div v-if="(wor1.answer)==(wor1.options)" style="color: green;font-weight:bold;font-size: 20px "
                       v-text="'正确'"></div>
                  <div v-if="(wor1.answer)!=(wor1.options)" style="color: red;font-weight:bold;font-size: 20px"
                       v-text="'错误'"></div>
                  正确答案:<span v-text="wor1.answer"></span> 你的答案:<span v-text="wor1.options"></span></div>
              </div>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <br>
    <br>
    <el-link href="/answer/Answer_index" type="primary" icon="el-icon-back" style="float: left;font-size: 17px">返回考试中心
    </el-link>
      <el-tooltip placement="bottom" effect="light">
        <div slot="content" v-text="app"></div>
        <el-button type="primary" style="float: right" @click="tijiao" :disabled="flag">提交</el-button>
      </el-tooltip>
    <br>
    <br>
  </div>
</template>

<script>
  import {findAllAnswer, findOne, save,save1} from '@/api/Answer'

  export default {
    name: "Answer",
    data() {
      return {
        app: '只能提交一次',
        minutes: 1,
        seconds: 0,
        flag2: false,
        flag1: true,
        flag: false,
        falg: false,
        loading: false,
        wor: [{
          options: 'A',
          questions: '多选',
          question: '题目内容',
          answer: 'D',
          status: '启动',
          optionA: 'A',
          optionB: 'B',
          optionC: 'C',
          optionD: 'D',
        },],
        ruleForm: {
          id:2,
          totalScore: '',
          time: '',
          name: '',
          status: '',
          paperNum: '',
          paperName: ''
        },
        exams: {
          bankId:1,
          name: '',
          username: '',
          paperName: '',
          score: '',
          status: '',
          uid:4
        },
      }
    },
    methods: {
      num: function (n) {
        return n < 10 ? '0' + n : '' + n
      },
      add: function () {
        var _this = this;
        var time = window.setInterval(function () {
          if (_this.seconds === 0 && _this.minutes !== 0) {
            _this.seconds = 59;
            _this.minutes -= 1
          } else if (_this.minutes === 0 && _this.seconds === 0) {
            _this.seconds = 0;
            _this.minutes = 0;
            window.clearInterval(time);
            if (_this.flag1 == true) {
              _this.$alert('测试时间已到,点击查看答案', '消息', {
                confirmButtonText: '确定',
                center: true,
                showClose: false,
                callback: action => {
                  _this.tijiao();
                }
              })
            }
          } else {
            _this.seconds -= 1
          }
        }, 1000)
      },
      tijiao() {
        this.flag2 = true;
        this.flag = true;
        let j = 0;
        for (let i = 0; i < this.wor.length; i++) {
          if (this.wor[i].options == this.wor[i].answer) {
            // console.log("正确")
            j++;
          } else {
            // console.log("错误")
          }
          this.seconds = 0;
          this.minutes = 0;
          this.flag1 = false;
        }
        this.exams.paperName = this.ruleForm.paperName;
        this.exams.score = (this.ruleForm.totalScore) / this.wor.length * j;
        console.log(this.exams.score);
        this.falg = true;
        save(this.exams).then(res => {
          // console.log(res.data);
          if (res.data == 'update') {
            this.$alert('此试卷你已经已经有分数了,点击确定刷新分数', '消息', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {
                // this.$router.push("/Answer/Answer_index");
              }
            })
          } else {
            this.$alert('测试成功,点击查看答案', '消息', {
              confirmButtonText: '确定',
              showClose: false,
              callback: action => {

              }
            })
          }
        });
        // console.log(this.wor);
        // let wor = JSON.stringify(this.wor);
        // let score = JSON.stringify(this.exams.score);
        // console.log(this.wor);
        // console.log(this.exams.score);
        // this.wor.score=this.exams.score;
        console.log(this.wor);
        console.log(this.exams.uid);
        save1(this.exams.uid,this.ruleForm.id,this.wor).then(res=>{
           console.log(res.data)
        })
        // sessionStorage.setItem(this.exams.username+this.ruleForm.paperName, wor);
        // window.localStorage.setItem(this.exams.username + this.ruleForm.paperName, wor);
        // window.localStorage.setItem(this.exams.username + this.ruleForm.paperName + '1', score);
      },
      findAll(paperNum,bankId) {
        this.loading = true;

        if (paperNum) {
          this.ruleForm.paperNum = paperNum;

        }
        if (bankId){
          this.ruleForm.bankId= bankId;
          console.log(this.ruleForm.bankId);
        }
        findAllAnswer(this.ruleForm.paperNum,this.ruleForm.bankId).then(res => {
          this.loading = false;
          this.wor = res.data.wors;
          // console.log(res.data);
        })
      },
    },
    created() {
      this.loading = true;
      // console.log(this.$route.query.row);
      findOne(this.$route.query.id).then(res => {
        this.loading = false;
        this.add();
        console.log(res.data);
        this.ruleForm = res.data;
        this.wor.name = this.ruleForm.paperName;
        this.minutes = res.data.time;
        this.findAll(res.data.paperNum,res.data.bankId)
      })

      var user = JSON.parse(sessionStorage.getItem("user"));
      // console.log(user);
      this.exams.username = user.username;
      this.exams.name = user.name;
      this.exams.uid=user.id;
    },
    mounted() {

      // this.add();
    },
    watch: {
      second: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      }

    },
    computed: {
      second: function () {
        return this.num(this.seconds)
      },
      minute: function () {
        return this.num(this.minutes)
      }
    }
  }
</script>

<style scoped>
  #logo {

  }

  li {
    list-style: none;
  }

  .test_title p {
    padding: 0 20px;
    display: block;
    float: left;
  }

  .test_time i {
    font-size: 20px;
    height: 45px;
    line-height: 40px;
    display: block;
    float: left
  }

  .test_time b {
    font-size: 16px;
    height: 45px;
    display: block;
    float: left;
    margin-left: 10px;
  }

  .test_dtk i {
    font-size: 22px;
    height: 45px;
    line-height: 45px;
    display: block;
    float: left;
    color: #389fc3;
  }

  .test_dtk span {
    font-size: 14px;
    height: 45px;
    display: block;
    float: left;
    margin-left: 10px;
  }

  .test_title font {
    width: 80px;
    height: 45px;
    display: block;
    float: right;
    text-align: center;
  }

  .test_title font input {
    background: #389fc3;
    border: none;
    display: block;
    width: 80px;
    height: 45px;
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  .test_title font input:active {
    background: #79aef0;
  }

  .test_content_title h2 {
    padding: 0 30px;
    font-size: 16px;
    font-weight: normal;
    display: block;
    float: left
  }

  .test_content_title p {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    background: #389fc3;
    color: #fff;
    border-radius: 30px;
    display: block;
    float: left;
    margin-top: 5px;
  }

  .test_content_nr > ul > li {
    width: 100%;
    border-bottom: 5px solid #efefef;
    padding-top: 10px;
  }

  .test_content_nr_tt {
    width: 85%;
    height: auto;
    line-height: 32px;
    margin: 0 auto;
    border-bottom: 1px solid #e4e4e4;
  }

  .test_content_nr_tt i {
    width: 25px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    display: block;
    float: left;
    background: #5d9cec;
    border-radius: 50%;
    margin-left: -50px;
    color: #fff;
    margin-top: 8px;
    font-size: 16px;
  }

  .test_content_nr_tt span {
    float: left;
    display: block;
  }

  .test_content_nr_tt font {
    font-size: 14px
  }

  .test_content_nr_main {
    width: 85%;
    margin: 0 auto;
    padding: 10px 0;
    height: auto;
  }

  .option {
    line-height: 32px;
    display: block;
    background: #fff;
    color: #666;
    padding-top: 50px;
  }


  .option input {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
    margin: 10px 10px 0 0;
  }

  .option label {
    margin: 0;
  }

  .test_click a {
    color: #fff;
  }


  .rt_nr1_title h1 {
    width: 130px;
    height: 45px;
    background: #389fc3;
    text-align: center;
    font-size: 14px;
    display: block;
    float: left;
    color: #fff;
  }

  .rt_nr1_title h1 i {
    padding: 0 5px;
    font-size: 14px;
    font-weight: normal;
  }

  .rt_nr1_title p {
    width: 141px;
    height: 43px;
    padding-right: 8px;
    border: 1px solid #e4e4e4;
    border-left: 0;
    display: block;
    float: right;
  }

  .rt_nr1_title p i {
    margin-left: 10px;
  }

  .rt_content_tt h2 {
    width: 150px;
    font-size: 14px;
    display: inline-block;
  }

  .rt_content_tt p {
    width: 100px;
    display: inline-block;
  }

  .answerSheet ul {
    padding: 10px;
    text-align: left;
  }

  .answerSheet li {
    display: inline-block;
    margin-bottom: 5px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
  }

  .answerSheet li a {
    display: block;
  }

  .answerSheet li:hover {
    color: #389fc3;
    border-color: #389fc3;
  }

  .rt_more_tt h2 {
    width: 150px;
    font-size: 14px;
    display: inline-block;
  }

  .rt_more_tt p {
    width: 100px;
    display: inline-block;
  }

  .rt_more_nr ul {
    padding: 10px;
    text-align: left;
  }

  .rt_more_nr ul li {
    display: inline-block;
    margin: 5px;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #e4e4e4;
  }

</style>
