<template>
  <div class="aside1">

      <h4>快速登录<span class="gobackbtn"><a href="#/">返回</a></span></h4>
      <div class="inputcheck">
        <el-input class='form' v-model="username" placeholder="请填写手机号或邮箱"></el-input>
        <span  v-show="usernameis" >手机号或邮箱不存在</span>
      </div>
      <div class="inputcheck" style="margin-bottom:10px;">
       <el-input type="password" class='form' v-model="password" placeholder="请输入密码"></el-input>
       <span  v-show="passwordis" >密码错误请重新输入</span>
      </div>
      <div style="clear:both"></div>
      <a class="btn" @click="sublogin">立即登录</a>
      <!-- <div class="btna">
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
        <p>还没有账号？</p>
        <a href="#/reset">注册</a>
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
      baseurl:Url.baseurl,
      username:'',
      password:'',
      usernameis:false,
      passwordis:false,
    }
  },
   computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  beforeRouteEnter (to, from, next){
    if(from.path=="/article"){
      console.log(from)
      sessionStorage.setItem("urlgo",from.fullPath);
    }
    next();
  },
  methods:{
    sublogin(){
      var vm=this;
      if(this.username!='' && this.password!=""){
          var date={};
          date.username=this.username;
          date.password=this.password;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/user/login',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                //console.log(response.data)
                  // if(response.data.verified==1){
                  //   vm.$store.state.userstatus="未认证"
                  // }else if(response.data.verified==2){
                  //   vm.$store.state.userstatus="待确认"
                  // }else if(response.data.verified==3){
                  //   vm.$store.state.userstatus="已认证"
                  // }
                vm.$store.state.userurl=response.data.avatar;
                vm.$store.state.loginis=true;
                var urlgo=sessionStorage.getItem('urlgo');
                if(urlgo){
                  window.location.href="#"+urlgo;
                  sessionStorage.removeItem('urlgo');
                }else{
                  window.location.href="#/";
                }
                

              }else{
                alert("账号密码错误");
              }
          });
          

      }else{
        alert('请填写信息');
      }
      
    },
  }

  }

</script>
<style scoped="scoped">
.aside1{
  position: relative;
  z-index: 1000;
}
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
.aside1 .inputcheck{
  position: relative;
  margin-bottom: 40px;
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
    width: 60px;
    height: 38px;
    text-align: center;
    padding-left:0;
    padding-right:0;
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