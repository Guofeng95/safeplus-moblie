<template>
  <div id="app">
    <div class="totop">
      <div class="itop">
        <img style="height:auto;width:36vw;top:12px;left:6px; " src="/static/img/logo.png">
        <div class="search">
          <el-input 
            id="searchinput"
            placeholder="搜索安全信息"
            suffix-icon="el-icon-search"
            v-model="search">
          </el-input>
          <span class="span1" @click="gosearch"></span>
        </div>
        <a href="#/login" v-if="loginis==false">
          <img style="height:28px;width:28px;top:8px;right:14px; " src="/static/img/login.png">
        </a>
        <a v-else @click="setout">
          <img style="height:28px;width:28px;top:8px;right:14px; border-radius: 100%;" :src="baseurl+userurl">
        </a>
      </div> 
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'app',
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow',
    })
  },
  data () {
    return {
      search: '',
      baseurl:Url.baseurl,
    }
  },
  mounted(){
    var vm=this;
    //console.log(axios)
   axios({
        method:'post',
        url:vm.baseurl+'/user/ping',
    }).then(function(response){
        if(response.data.status==1){
          vm.$store.state.loginis=true;
          if(response.data.verified==1){
            vm.$store.state.userstatus="未认证"
          }else if(response.data.verified==2){
            vm.$store.state.userstatus="待确认"
          }else if(response.data.verified==3){
            vm.$store.state.userstatus="已认证"
          }
          vm.$store.state.userurl=response.data.avatar;
        }else{
          vm.$store.state.loginis=false;
        }
      })
  },
   methods:{
    setout(){
      var con=confirm("是否退出登录？")
      if(con){
        this.removein();
      }
    },
    removein(){
        var vm=this;
        axios({
              method:'post',
              url:vm.baseurl + '/user/logout',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                
                console.log(response.data)
                vm.$store.state.loginis=false;
              }else{
                alert(response.data.msg);
              }
          });
        
      },
      gosearch(){
        sessionStorage.setItem("search",this.search)
        window.location.href="#/search?"+this.search;
      },
  }
}
</script>

<style>
  #searchinput{
    background: #f2f2f2;
    height: 30px;
    margin-top:5px;
  }
  .totop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
  }
  .itop{
    height: 45px;
    width: 100vw;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
  }
  .itop img{
    display: block;
    position: absolute;
  }
  .itop span{
    display: block;
    position: absolute;
    line-height: 28px;
    color: red;
    right: 0;
  }
  .nav{
    height: 45px;
    font-size: 16px;
    background: #f5f5f5;
    display: flex;
    justify-content:space-around;
  }
  .nav a{
    width: 64px;
    margin-top: 12px;
  }
  .search{
  width: 142px;
  height: 24px;
  top:3px;
  right:50px;
  position: absolute;
}
.search .span1{
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  right: 0;
  top: 0;
}
</style>
