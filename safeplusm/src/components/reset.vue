<template>
  <div class="aside1">
      <h4>快速注册<span class="gobackbtn"><a href="#/">返回</a></span></h4>
      <div class="demo-input-suffix">
          <el-input class="verify" @change="check('remail')" v-model="remail" placeholder="请填写邮箱地址"></el-input>
           <el-button class="btn1"  type="success" @click="emalicode">验证码</el-button>
           <span  v-show="remailis" style="display:block;margin-top:6px;font-size: 12px;margin-left: 20px;color: red;">请填写正确的邮箱格式，不能为空</span>
        </div>
        <div class="inputcheck" style="padding-top:38px;">
          <el-input class='form' @change="check('rverify')" v-model="rverify" placeholder="请填写邮箱收到的验证码"></el-input>
          <span v-show="rverifyis">请填写验证码</span>
        </div>
        <div class="inputcheck">
          <el-input class='form' @change="check('rpassword')" v-model="rpassword" placeholder="请设置密码,6-14位字符"></el-input>
          <span  v-show="rpasswordis" >密码应为数字、字母、英文标点符号，长度为6-14位</span>
        </div>
        <div class="inputcheck" style="margin-bottom:10px;">
           <el-input class='form' @change="check('rtwopwd')" v-model="rtwopwd" placeholder="请再次输入刚才的密码"></el-input>
           <span  v-show="rtwopwdis" >两次密码不统一</span>
        </div>
        <div style="clear:both"></div>
        <a class="btn" @click="resetgo">立即注册</a>
       <!--  <div class="btna">
          <a style="background:#00cc33">
            <img style="margin-top:4px;margin-left:6px;margin-right:2px;" src="/static/img/wx.png">微信
          </a>
          <a style="background:#ff0000;margin-left:10px;margin-right:10px;">
            <img style="margin-left:6px;" src="/static/img/wb.png">微博
          </a>
          <a style="background:#00ccff;line-height:34px;">
            <img style="margin-left:8px;margin-top:2px;margin-right:3px;" src="/static/img/qq.png">QQ
          </a>
        </div> -->
      <div class="ahref">
        <p>已有账号？</p>
        <a href="#/login">登录</a>
        <!-- <a @click="login" class="forgot" href="/forget">忘记密码</a> -->
      </div>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"
  import axios from 'axios'
  import qs from 'qs'
  import * as Url from '@/components/url.js'
  export default {
    name:'login',
    data () {
    return {
      munuis:false,
      emalicodeis:false,
      baseurl:Url.baseurl,
      search: '',
      logis:true,
      resetis:false,
      remail:'',
      rverify:'',
      rpassword:'',
      rtwopwd:'',
      username:'',
      password:'',
      rpasswordis:false,
      rtwopwdis:false,
      remailis:false,
      rverifyis:false,
      usernameis:false,
      passwordis:false,
    }
  },
  methods:{
    emalicode(){
      var vm=this;
      if(this.remail !='' && this.remailis==false){
          var date= {};
          date.email=this.remail;
          date.for="register"
              var date1= {};
              date1.email=this.remail;
              date1.for="query"
              axios({
                method:'post',
                  data:qs.stringify(date1),
                  url:vm.baseurl + '/user/verify_email',
                 headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then(function(response){
                  if(response.data.status!=1){
                      axios({
                          method:'post',
                          data:qs.stringify(date),
                          url:vm.baseurl + '/user/verify_email',
                         headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                      }).then(function(response){
                          if(response.data.status==1){
                            alert('验证码已发送');
                            vm.emalicodeis=true;
                          }else if(response.data.status==0){
                            alert(response.data.msg);
                            vm.emalicodeis=true;
                          }else{
                            alert(response.data.msg);
                          }
                      });


                  }else{
                    alert("此邮箱已经注册");
                  }
              });
      // console.log(date) 
      }else{
        this.check('remail');

      }

    },
    resetgo(){
      var vm=this;
      if(this.rpasswordis==false && this.rverifyis==false && this.remailis==false && this.rtwopwdis==false){
        if(this.rpassword!="" && this.rverify!='' && this.remail!='' && this.rtwopwd!=''){
            if(this.emalicodeis==true){
              var nickname="社区用户";
              axios({
                  method:'post',
                  data:qs.stringify({"verification_code":this.rverify,"username":this.remail,"password":this.rpassword,"password1":this.rtwopwd,"nickname":nickname}),
                  url:vm.baseurl + '/user/register',
              }).then(function(response){
                  if(response.data.status==1){
                    alert('注册成功');
                    window.location.href="#/"
                  }else{
                    alert(response.data.msg);
                  }
              });
            }else{
              alert('请获取验证码');
            }
        }else{
          alert('请填写信息');
        }
      }
    },
    check(style){
      if(style=="remail"){
        var isok=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.remail);
        if(isok){
          this.remailis=false;
        }else{
          this.remailis=true;
          this.emalicodeis=false;
        }
      }
      if(style=="rverify"){
        if( this.rverify==''){
          this.rverifyis=true;
        }else{
          this.rverifyis=false;
        }
      }

      if(style=="rpassword"){
        var isok=/^[a-zA-Z0-9,.'"]{6,14}$/.test(this.rpassword);
        if(isok){
          this.rpasswordis=false;
        }else{
          this.rpasswordis=true;
        }
      }
      if(style=="rtwopwd"){
        if(this.rtwopwd==this.rpassword){
          this.rtwopwdis=false;
        }else{
          this.rtwopwdis=true;
        }
      }
    },
  }

  }

</script>
<style scoped="scoped">
.gobackbtn{
  display: block;
  float: right;
  width: 60px;
  height: 24px;
  font-size: 16px;
  background: #fff;
  margin-right: 30px;
  border-radius: 4px;
  background: #f5f5f5;
  text-align: center;
  border: 1px solid #d7d7d7;
}
.aside1{
  position: relative;
  z-index: 1000;
}
.aside1 .inputcheck{
  position: relative;
  margin-bottom: 56px;
}
.aside1 .inputcheck span{
  display: block;
  font-size: 12px;
  margin-left: 0px;
  color: red;
}
  .aside1 h4{
    margin-bottom: 30px;
    margin-top: 30px;
    margin-left: 40px;
    font-size: 18px;
  }
.aside1{
    width: 100vw;
    background:rgba(251, 251, 251, 1);
    background: url('/static/img/resetback.png') no-repeat left bottom;
    background-size: cover;
    height: 100vh;
    overflow: hidden;
  }
.aside1 div{
    width: 260px;
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    margin: 0 auto;
    margin-bottom: 10px;
  }
  .aside1 div p{
    width: 210px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .aside1 .form{
    height: 34px;
    width: 260px;
    margin-top: 4px;
  }
  .aside1 .btn{
    display: block;
    height: 36px;
    width: 260px;
    border-radius: 4px;
    background: #71b34f;
    color: #fff;
    line-height: 36px;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin:0 auto;
    margin-top: 10px;
    font-size: 14px;
  }
  .aside1 .btn img{
    position: absolute;
    left: 60px;
    top: 4px;
  }
  .aside1 .btna a{
    width: 80px;
    height: 32px;
    border-radius: 6px;
    display: block;
    float: left;
    margin-top: 14px;
    color: #fff;
    line-height: 32px;
  }
  .aside1 div a img{
    display: block;
    float: left;
  }
  .aside1 div{
    clear: both;
  }
  .aside1 div p{
    width: 90px;
    float: left;
  }
  .aside1 .ahref{
    padding-top: 10px;
  }
  .aside1 .ahref a{
    display: block;
    float:left;
    color: #3399d6;
    font-size: 14px;
    text-decoration: none;
    line-height: 30px;
    margin-left: 10px;
  }
  .aside1 .ahref .forgot{
    margin-left: 70px;
  }
  .app{
    display: block;
    margin-bottom: 20px;
  }
  .more{
    position: relative;
  }
  
   .aside1 .diva{
    width: 120px;
    float: left;
    clear: none;
    margin-left: 10px;
  }
  .aside1 .diva a{
    text-decoration: none;
    color: #333;
  }
  #reset,#log{
    position: absolute;
    left: 50%;
    top: 180px;
    margin-left: -145px;
  }
  .background{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 6;
  }
  .cha{
    display: block;
    position: absolute;
    right: 26px;
    cursor: pointer;
    top: 26px;
  }
  .btn1{
    width: 58px;
    height: 38px;
    text-align: center;
    padding-left:0;
    padding-right:0;
    background: #71b34f;
  }
  button span{
    color: #fff;
  }
 .aside1 .verify{
    width: 196px;
  }
  .background .aside  .form{
    margin-top: 20px;

  }
  .background .aside .btn{
    margin-top: 20px;
  }
  .munu1{
    float: left;
    top: 54px;
    right: 50px;
    width: 130px;
    border-radius: 4px;
    box-shadow:2px 2px 7px #ccc;
    padding-left: 3px;
    padding-right: 3px;
     position: absolute;
     background: #fff;
     z-index: 1000;
  }
  .munu1 div{
    width: 120px;
    margin:0 auto;
    height: 28px;
    line-height: 28px;
    margin-top: 4px;
  }
  .munu1 div img{
    display: block;
    float: left;
  }
  .munu1 .one{
    border-bottom:1px solid #f2f2f2; 
  }
  .munu1 div a{
    font-size: 14px;
    text-decoration: none;
    color: #333;
    margin: 0;
    font-weight: normal;
  }
</style>