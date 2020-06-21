import Vue from 'vue'
import Router from 'vue-router'
import Topnav from "../components/public/Topnav";

import Index from "../components/Index";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import Test from "../components/public/Test";
//考试
import Answer_index from "../components/Answer/Answer_index";
import Answer_My from "../components/Answer/Answer_My";
import Answer from "../components/Answer/Answer";
import Answer_My_detail from "../components/Answer/Answer_My_detail";


import FindReport from "../components/report/FindReport";
import Commit from "../components/report/Commit";
//公告
import Notice from "../components/notice/Notice";
import Questions from "../components/questions/Questions";
import QuestionItem from "../components/questions/QuestionItem";
//文章
import AllArticle from "../components/article/AllArticle";
import addArticle from "../components/article/addArticle";
import ArticleItem from "../components/article/ArticleItem";
//报告数据
import DayReport from "../components/reportData/DayReport";
import WeekReport from "../components/reportData/WeekReport";
//个人中心
import Personal from "../components/user/Personal";
import ReportItem from "../components/reportData/ReportItem";
import ChangePwd from "../components/user/ChangePwd";
Vue.use(Router);

export default new Router({
    mode:'history',
  routes:[

    {
      path:'/index',
      name:'Index',
      component:Index,
      meta:{
        requireAuth: true
      },
      children:[
        //如果要使用props传参的方式，要添加props:true
        //用户菜单
        {path:'/test/test',name:'test',component:Test},
        {path:'/report/findReport',component:FindReport},
        {path:'/report/commit',name:'commit',component:Commit,props:true},
        {path:'/notice/notice',name:'Notice',component:Notice},
        {path:'/questions/questions',component:Questions},
        {path:'/questions/questionItem',name:'questionItem',component:QuestionItem,props:true},
        {path:'/article/allArticle',component:AllArticle},
        {path:'/article/addArticle',name:'addArticle',component:addArticle},
        {path:'/article/ArticleItem',name:'ArticleItem',component:ArticleItem},
        {path:'/reportData/dayReport',name:'DayReport',component:DayReport},
        {path:'/reportData/weekReport',name:'WeekReport',component:WeekReport},
        {path:'/user/personal',name:'Personal',component:Personal},
        {path:'/reportData/reportItem',name:'ReportItem',component:ReportItem},
        {path:'/user/changePwd',name:'ChangePwd',component:ChangePwd},
        {
          path:'/Answer/Answer',
          component:Answer
        },
        {
          path:'/Answer/Answer_My_detail',
          component:Answer_My_detail
        },
      ]

    },
    {
      path:'/login',
      name:'login',
      component:Login,

    },
    {
      path:'/Topnav',
      name:'Topnav',
      component:Topnav,

    },
    //重定向
    {
      path:'/goHome',
      name:'goHome',
      redirect: Index
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      component: Login
    },
    //考试
    {
      path:'/Answer/Answer_index',
      component:Answer_index
    },
    {
      path:'/Answer/Answer_My',
      component:Answer_My
    },
    // {
    //   path:'/Answer/Answer',
    //   component:Answer
    // },
    // {
    //   path:'/Answer/Answer_My_detail',
    //   component:Answer_My_detail
    // },
  ]
});
