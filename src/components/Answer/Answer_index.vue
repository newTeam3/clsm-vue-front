<template>
  <el-container style="height: 96vh;background-color: #f5f5f5;">
    <el-header>
      <Topnav></Topnav>
    </el-header>
    <el-main style="padding-top:10px">
      <div class="main">
        <div class="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>考试中心</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <el-table
          :data="papers.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          highlight-current-row v-loading="loading"
          border element-loading-text="拼命加载中"
          style="width: 100%">
          <el-table-column
            label="试卷名称"
            prop="paperName"
            v-model="papers.paperName">
          </el-table-column>
          <el-table-column
            label="分数"
            prop="totalScore"
            v-model="papers.totalScore">
          </el-table-column>
          <el-table-column
            label="考试时间"
            prop="time"
            v-model="papers.time">
          </el-table-column>
          <el-table-column
            label="题库名称"
            prop="name"
            v-model="papers.name">
          </el-table-column>
          <el-table-column
            align="left" width="220px">
            <template slot="header" slot-scope="scope">
              <div align="center">操作</div>
            </template>
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="ToAnswer(scope.row)">前往测验
              </el-button>
            </template>
          </el-table-column>
        </el-table>
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
  import {findAllPaper}  from '@/api/Answer'
  export default {
    name: "Answer_index",
    components: {Foot, Topnav},
    data() {
      return {
        papers: [{
          totalScore: '100',
          time: '40',
          name: 'C语言',
          status: '状态',
          paperNum: '1,2',
          paperName: 'c1111'
        }, {
          totalScore: '100',
          time: '40',
          name: 'C语言',
          status: '状态',
          paperNum: '1,2',
          paperName: 'c1111'
        }, {
          totalScore: '100',
          time: '40',
          name: 'C语言',
          status: '状态',
          paperNum: '1,2',
          paperName: 'c1111'
        }],
        loading: false,
        page: 1,
        rows: 4,
        size:4,
        totalPage: 0,
        totals: 0,
        search: '',
        username:''
      }
    },
    methods:{
      handleSizeChange(size){
        this.size = size;
        this.findAll(this.page,size);
      },
      findPage(page) {
        this.page = page;
        this.findAll(page,this.size);
      },
      findAll(page) {
        this.loading = true;
        // console.log(this.page);
         findAllPaper(this.page,this.size).then(res =>{
          this.loading = false;
          // console.log(res.data);
          this.papers = res.data.papers;
          this.page = res.data.page;
          this.totalPage = res.data.totalPage;
          this.totals = res.data.totals;
        })
      },
      ToAnswer(row){
        // console.log(row);
        this.$router.push({
          path: '/Answer/Answer',
          query: {
            id:row.id

          }
        });
      }
    },
    created() {
      this.findAll()
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
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
</style>
