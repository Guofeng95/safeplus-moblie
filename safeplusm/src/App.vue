<template>
  <div id="app">
        <drawer :show="drawerShow" 
          :pos="pos" 
          :tran="tran"
          @change-show="changeDrawerShow"
          @on-hide="onHide"
          @on-show="onShow">
          <div class="layout" slot="drawer" >
           <div @click="onHide" v-if='loginis==false'><a href="#/login" style="margin-right:10px;">登录</a> | <a href="#/reset" style="margin-left:10px;">注册</a></div>  
           <div v-else><img style="height:28px;width:28px;border-radius: 100%;display:block;padding-top:6px;margin:0 auto;" :src="userurl "></div>
           <div @click="onHide"><a href="#/">安全头条</a></div>
           <div @click="onHide"><a href="#/recommend">推荐</a></div>
           <div @click="onHide"><a href="http://zhishi.secjia.com/">安全知识</a></div>
           <div @click="onHide" v-if='loginis'><a href="http://top.sunliangliang.com/#/usercenter">个人中心</a></div>
           <div @click="setout" v-if='loginis'><a style="cursor:pointer" >退出登录</a></div>
          </div>
          <div class="totop" id="topall">
            <div class="itop">
              <img class="img"  src="/static/img/logo.gif" @click="indexgo">
              <a class="logofont" href="#/">安全加</a>
              <a class="logobeat" href="#/">beta</a>
                <div class="search">
                  <el-input 
                    id="searchinput"
                    placeholder="搜索安全信息"
                    suffix-icon="el-icon-search"
                    v-model="search"
                    @focus="focussearch"
                    @blur="blursearch"
                    @change="keysearch">
                  </el-input>
                  <span class="span1" @click="gosearch"></span>
                </div>
                <div class="searchmind" v-show="mindis">
                  <p v-for="(item,index) in mind" :key="index" @click="mindsearch(item)">
                    {{item}}
                  </p>
                </div>
                <a v-on:click="drawerToggle">
                  <img src="/static/img/topnav.png"  style="top:8px;right:8px;">
                </a>
             </div> 
          </div>
          <router-view/>
          
        </drawer>
        <!-- <a href="#/login" v-if="loginis==false">
          <img style="height:28px;width:28px;top:8px;right:14px; " src="/static/img/login.png">
        </a>-->
     
  </div>
</template>

<script>
import Drawer from '@/components/drawer'
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'app',
  components: { Drawer },
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
      pos: 'right',
      tran: 'overlay',
      drawerShow: false,
      mind:[],
      mindis:false
    }
  },
  mounted(){
    var vm=this;
   axios({
        method:'post',
        url:vm.baseurl+'/user/ping',
    }).then(function(response){
        if(response.data.status==1){
          vm.$store.state.loginis=true;
          // if(response.data.verified==1){
          //   vm.$store.state.userstatus="未认证"
          // }else if(response.data.verified==2){
          //   vm.$store.state.userstatus="待确认"
          // }else if(response.data.verified==3){
          //   vm.$store.state.userstatus="已认证"
          // }
          vm.$store.state.userurl=response.data.avatar;
        }else{
          vm.$store.state.loginis=false;
        }
      })
  },
   methods:{
     drawerToggle() {
       this.drawerShow=!this.drawerShow;
       var id=document.getElementById("vue-all")
       if(this.drawerShow==false){
        id.style.overflow = 'auto';
        console.log("a")
       }else{
        console.log("o")
        id.style.overflow = 'hidden';
       }
     },
     onHide() {
      this.drawerShow=false;
       var id=document.getElementById("vue-all");
       id.style.overflow = 'auto';
       //console.log('hide');
     },
     changeDrawerShow(state) {
      this.drawerShow=state;
      var id=document.getElementById("vue-all")
      if(this.drawerShow==false){
        id.style.overflow = 'auto';
        //console.log("a")
       }else{
        //console.log("o")
        id.style.overflow = 'hidden';
       }
      //console.log('drawer was changed from components');
    },
    onShow() {
     //console.log('show');
   },
   focussearch(){
    var vm=this;
    var id=document.querySelector(".search input");
      //console.log(this.search)
    id.onkeyup=function(e){
      if(e.keyCode!=13 && vm.search!=''){
        var date={};
        date.query=vm.search;
        axios({
          method:'post',
          data:qs.stringify(date),
          url:vm.baseurl+'/article/list_autocomplete',
      }).then(function(response){
          if(response.data.status==1){
            //console.log(response.data.suggestions)
            if(response.data.suggestions.length>0){
              vm.mind=[];
              vm.mind=response.data.suggestions;
              // response.data.suggestions.forEach( function(element, index) {
              //   vm.mindarr.push(element);
              // });
              vm.mindis=true;
            }else{
              vm.mind=[];
              vm.mindis=false;
            }
            
          }
        })
      }
    }
  
   },
   blursearch(){
    this.mindis=false;
   },
   mindsearch(item){
    this.search=item;
    this.gosearch();
   },
    keysearch(){
      var vm=this;
      var id=document.querySelector(".search input");
      //console.log(this.search)
      id.onkeydown=function(e){
        if(e.keyCode==13){
          vm.gosearch();
        }
      }
    },
    indexgo(){
      window.location.href="#/"
    },
    setout(){
      var con=confirm("是否退出登录？")
      if(con){
        this.removein();
        this.onHide();
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
html {
    
  }
  /*body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }*/
  #app {
    height: 100vh;
    width: 100vw;
    /*max-width: 600px;*/
    font-family: Source Sans Pro, Helvetica, sans-serif;
    /*background-color: #eee*/
  }
  .layout{
    width: 160px;
    height: 100%;
    background: #3c3c44;
    color: #fff;
    font-size: 14px;
  }
  .layout div{
    width: 160px;
    height: 40px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    border-bottom: 1px dashed #666;
  }
  .layout div:hover{

  }
  .layout a{
    color: #fff;
  }
  #searchinput{
    background: #f2f2f2;
    height: 30px;
    margin-top:5px;
  }
  .totop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5;
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
  .itop .img{
    height:auto;
    width:36px;
    top:12px;
    left:2px; 
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
.searchmind{
  width: 142px;
  max-height:200px;
  background: #fff;
  position: absolute;
  border:1px solid #ccc;
  right: 50px;
  top: 50px; 
  border-radius: 4px;
}
.searchmind p{
  height: 30px;
  line-height: 30px;
  width: 122px;
  padding:0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
/*.searchmind p:hover{
  background: rgb(113, 179, 79);
  color: #fff;
}*/
.search .span1{
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  right: 0;
  top: 0;
}
.logofont{
  font-size: 16px;
  color: #6fba2c;
  font-weight: bold;
  padding-top: 20px;
  margin-left:41px; 
  position: relative;
  top: 10px;
}
.logobeat{
  font-size: 14px;
  font-weight: bold;
  position: relative;
  top: 10px;
}
@media screen and (min-width: 768px) {
  .itop .img{
    height:auto;width:36px;top:12px;left:2px; 
  }
}
</style>
