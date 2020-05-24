<template>
  <el-container style="height: 96vh;background-color: #f5f5f5;">
    <el-header>
      <Topnav></Topnav>
    </el-header>
    <el-main style="padding-top: 1px">
      <div class="main">
        <h2>我的测试</h2>
        <el-table
          :data="exams.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          highlight-current-row v-loading="loading"
          border element-loading-text="拼命加载中"
          style="width: 100% ">
          <el-table-column
            label="姓名"
            prop="username"
            v-model="exams.username">
          </el-table-column>
          <el-table-column
            label="试卷名称"
            prop="paperName"
            v-model="exams.paperName">
          </el-table-column>
          <el-table-column
            label="分数"
            prop="score"
            v-model="exams.score">
          </el-table-column>
          <el-table-column
                           align="center">
            <template slot="header" slot-scope="scope">
              <div align="center">操作</div>
            </template>
            <template slot-scope="scope">
              <el-button
                type="success" size="small"
                @click="handle(scope.row)" >查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row>
          <el-col :span="10" :offset="6">
            <el-pagination
              background
              layout="total,prev, pager, next, jumper, sizes"
              prev-text="上一页"
              next-text="下一页"
              :current-page="page"
              :page-size="size"
              :page-sizes="[2, 4, 6, 8,10]"
              @current-change="findPage"
              @size-change="handleSizeChange"
              :total="totals">
            </el-pagination>
          </el-col>
        </el-row>
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
  import Topnav from "../public/Topnav";
  import Foot from "../public/Foot";
  import {findAllExam}  from '@/api/Answer'
  export default {
    name: "Answer_index",
    components: {Foot, Topnav},
    data() {
      return {
        exams: [{
          username: '张三',
          paperName: 'C语言测试1',
          score: '90',
          status: ''
        }, {
          username: '张三',
          paperName: 'C语言测试1',
          score: '90',
          status: ''
        }, {
          username: '张三',
          paperName: 'C语言测试1',
          score: '90',
          status: ''
        }],
        page: 1,
        rows: 4,
        size:4,
        totalPage: 0,
        totals: 0,
        search: '',
        exam: {
          name: '',
          score: ''
        },
        loading: false,
      }

    },
    methods:{
      handle(row){
        // console.log(row);
        this.$router.push({
          path: '/Answer/Answer_My_detail',
          query: {
            id: row.paperid
          }
        });
      },
      handleSizeChange(size){
        this.size = size;
        this.search1(this.page,size);
      },
      findPage(page) {
        this.page = page;
        this.search1(page,this.size);
      },
      search1(page) {
        this.loading = true;
        findAllExam(this.page ,this.size,this.exam.username,this.exam.name).then(res => {
          this.loading = false;
          console.log(res.data)
          this.exams = res.data.exams;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        });
      }

    },
    created() {
      var user = JSON.parse(sessionStorage.getItem("user"));
      this.exam.name = user.name;
      this.exam.username = user.username;
      this.search1();
    }
  }
</script>

<style scoped>
  .main {
    background-color: white;
    height: 96%;
  }

  .footer {
    height: 100%;
    background-color: #222c3a;
  }
</style>
