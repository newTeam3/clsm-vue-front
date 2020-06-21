<template>
<div>
  <div class="bread">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/test/test' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div style="margin-top: 20px;margin-bottom: 20px;margin-left: 450px">
  <el-button size="small" type="primary" icon="el-icon-edit" @click="handleEdit">编辑资料</el-button>
  <el-button size="small" type="warning" icon="el-icon-upload2" @click="handleEdit2" >上传头像</el-button>
  </div>
    <div class="d1">
<ul class="ul1" style="list-style: none;text-align: left;">
  <li>
    <el-avatar style="margin-left:70px " :src="userData.img" :size="80"></el-avatar>
  </li>
  <li>
    用户ID：{{userData.username}}
  </li>
  <li>
    昵称：{{userData.name}}
  </li>
  <li>
    性别：<span v-if="userData.sex==1">男</span>
    <span v-if="userData.sex==0">女</span>
  </li>
  <li>
    手机号：<span>{{userData.phone}}</span>
  </li>
  <li>
    所属学院：<span >{{userData.coidName}}</span>
  </li>
  <li>
    专业班级：<span >{{userData.cidName}}</span>
  </li>
  <li>
    所属小组：<span>{{userData.gidName}}</span>
  </li>
  <li>
    职务：<span>{{userData.pidName}}</span>
  </li>
  <li>
    角色：<span v-for="i in userData.roles">
            {{i.roleName}}&nbsp;
          </span>
  </li>
</ul>
  </div>
  <div class="d2">
  <ul class="ul2" style="list-style: none">
    <li>
      <h1>个人概览</h1>
    </li>
    <li>
      您的账号创建时间：{{userData.created}}
    </li>
    <li>
      您的报告提交总数：<strong>3</strong>
    </li>
    <li>
      您的文章发布总数：<strong>3</strong>
    </li>
    <li>
      您的文章总阅读数：<strong>3</strong>
    </li>
    <li>
      您的文章评价总数：<strong>3</strong>
    </li>
    <li>
      您的提问发布总数：<strong>3</strong>
    </li>
    <li>
      您的评价总条数：<strong>3</strong>
    </li>
  </ul>
  </div>
  <el-dialog title="编辑资料" :visible.sync="editFormVisible" width="30%" @click="closeDialog" center>
    <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
      <el-form-item label="手机号" prop="phone">
        <el-input size="small"  auto-complete="off" v-model="editForm.phone" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input size="small"  auto-complete="off" v-model="editForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="editForm.sex" clearable placeholder="请选择性别" size="small">
          <el-option
            label="男"
            :value="1">
          </el-option>
          <el-option
            label="女"
            :value="0">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头像"   label-width="120px">
        <el-upload
          class="avatar-uploader img"
          action="http://localhost:8080/filesystem/upload"
          name="file"
          :headers="token"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="editForm.img" :src="editForm.img" class="avatar" height="160" width="180">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="所属学院" prop="coid">
        <el-select v-model="editForm.coid" clearable placeholder="请选择所属学院" size="small" @change="currentSel">
          <el-option
            v-for="(item,index) in selectData.college"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属班级" prop="cid">
        <el-select v-model="editForm.cid" clearable placeholder="请选择所属班级" size="small">
          <el-option
            v-for="(item,index) in selectData.class"
            v-if="item.college.id==editForm.coid"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small"
                 type="primary"
                 :loading="loading"
                 class="title"
                 @click="updateData">保存</el-button>
    </div>
  </el-dialog>

  <el-dialog title="上传头像" :visible.sync="editFormVisible2" width="30%" @click="closeDialog" center>
    <el-form label-width="120px" :model="editForm"  ref="editForm">
      <el-form-item label="头像" >
        <el-upload
          class="avatar-upload img"
          action="http://localhost:8080/filesystem/upload"
          name="file"
          :auto-upload="false"
          :headers="token"
          :show-file-list="true"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
<!--          <el-button size="small" type="primary">点击上传</el-button>-->
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

      </el-form-item>
      <img width="80px" height="80px" :src="dialogImageUrl" alt="">
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog">取消</el-button>
      <el-button size="small"
                 type="primary"
                 :loading="loading"
                 class="title"
                 @click="createData">保存</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import { findUserByID,getSearchData,updateUser } from '../../api/User'
    export default {
        name: "Personal",
      data(){
          return{
            token: {
              Authorization:"Bearer "+sessionStorage.getItem("token")  //从cookie里获取token，并赋值  Authorization ，而不是token
            },
            dialogImageUrl:'',
            addForm:{},
            imageUrl:'',
            loading:false,
            selectData:[],
            userData:[],
            editFormVisible:false,
            editFormVisible2:false,
            editForm: {
              id:'',
              phone: '',
              sex:'',
              name: '',
              coid:'',
              cid:'',
              img:'',
            },
          rules: {

                coid: [
                  { required: true, message: '请选择学院', trigger: 'blur' }
                ],
                cid: [
                  { required: true, message: '请选择班级', trigger: 'blur' }
                ],
                name: [
                  { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                phone: [
                  { required: true, message: "请输入手机号", trigger: "blur" },
                  // 这个只能验证手机号
                  // { pattern:/^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/, message: "请输入合法手机号", trigger: "blur" }
                  { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/, message: "请输入合法手机号/电话号", trigger: "blur" }
                ],



            },
          }
      },
      created() {
        let userId = JSON.parse(sessionStorage.getItem("user"))
        let param={id:userId.id}
        this.getData(param)
        this.getSearch()
      },
      methods:{
        currentSel(){
          this.editForm.cid=''
        },
         async getData(param){
           findUserByID(param).then(res=>{
              if(res.status==200){
                this.userData=res.data
                // console.log("user"+JSON.stringify(this.userData))
              }
           })
          },
        async getSearch(){
          getSearchData().then(res=>{
            if(res.status==200){
              this.selectData=res.data
            }

          })
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;

        },
        handleAvatarSuccess(res,file){
          this.imageUrl=URL.createObjectURL(file.raw)
          this.editForm.img=URL.createObjectURL(file.raw)
          this.addForm.img = "http://120.79.195.245/"+res.fileId;
          this.editForm.img = "http://120.79.195.245/"+res.fileId;
          console.log("vv"+this.editForm.img)
        },
        beforeAvatarUpload(file){
          const isJPG = file.type === 'image/jpeg'
          const isLt1M = file.size / 1024 / 1024 < 1

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!')
          }
          if (!isLt1M) {
            this.$message.error('上传头像图片大小不能超过 1MB!')
          }
          return isJPG && isLt1M
        },
        updateData () {
           // console.log(this.editForm.img);
          this.$refs.editForm.validate(valid => {
            if (valid) {
              this.$confirm("确认修改吗?", "提示", {}).then(() => {
                let para = {
                  id:this.editForm.id,
                  name:this.editForm.name,
                  phone:this.editForm.phone,
                  sex:this.editForm.sex,
                  cid:this.editForm.cid,
                  coid:this.editForm.coid,
                  img:this.editForm.img,
                  };
                console.log(para)
                // para.birth = !para.birth || para.birth == "" ? "" : date.formatDate.format(new Date(para.birth), "yyyy-MM-dd");
                updateUser(para).then(res => {
                  console.log(JSON.stringify(res))
                  if(res.status==200){
                    this.$message({
                      message: "提交成功",
                      type: "success"
                    });
                    // location. reload()
                    location. reload()
                    this.$refs["editForm"].resetFields();
                    this.editFormVisible = false;
                    let param={id:this.editForm.id}
                    this.getData(param);
                    // console.log("success")
                  }else{
                    this.$message({
                      message: "提交失败",
                      type: "error"
                    });
                  }

                })
              }).catch(err => {
                console.log(err)
              })
            }
          })
        },
      createData(){

      },

        handleEdit() {
          this.editFormVisible = true
          this.editForm.id = this.userData.id
          this.editForm.img = this.userData.img
          this.editForm.name = this.userData.name
          this.editForm.cid=this.userData.cid
          this.editForm.coid=this.userData.coid
          this.editForm.sex=this.userData.sex
          this.editForm.phone=this.userData.phone
        },
        handleEdit2() {
          this.editFormVisible2 = true

        },
        closeDialog() {
          this.editFormVisible = false
          this.editFormVisible2=false
        },
      }
    }
</script>

<style scoped>
  .bread{
    padding-top: 12px;
    padding-left: 8px;
  }

  .ul1 li{
    padding-top: 20px;
  }
  .ul2 li{
    padding-top: 20px;
  }
  .d1{
    height: 500px;
    background-color: #cac6c6;
    width: 300px;
    display: inline;
    float:left;
    margin-left: 400px;
    opacity: 0.8;
  }
  .d2{
    background-color: darkturquoise;
    height: 500px;
    display: inline;float:right;
    width: 300px;
    margin-right: 400px;
    opacity: 0.8;
     }

</style>
