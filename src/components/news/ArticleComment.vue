<template>
  <div>
    <div class="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>文章回复</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick" stretch v-loading="loading" element-loading-text="拼命加载中">
      <el-tab-pane label="回复我的" name='0'><ReplyItem ref="replyItem"></ReplyItem></el-tab-pane>
      <el-tab-pane label="文章评论" name='1'><CommentItem ref="commentItem"></CommentItem></el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  import Pagination from "../public/Pagination";
  import ReplyItem from "./ReplyItem";
  import CommentItem from "./CommentItem";
  export default {
    name: "ArticleComment",
    components: {CommentItem, ReplyItem, Pagination},
    data(){
      return {
        loading:false,
        activeName: '0',
      }
      },
    created() {
    },
    methods:{
      handleClick(tab, event) {

        console.log(event.target.getAttribute('id'))
      },

    }
  }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }
  .user-search {
    margin-top: 20px;
    margin-left: 150px;
  }
</style>
