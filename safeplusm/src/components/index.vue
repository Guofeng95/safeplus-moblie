<template>
  <div class="index" >
  <div class="totop" id="topindex">
    	<div class="nav">
    		<a href="#/recommend" style="width:40px;" @click="light('recommend')" id="recommend">推 荐</a>
    		<a href="#/" style="color: #71b34f;" @click="light('toutiao')" id="toutiao">安全头条</a>
    		<a href="http://top.sunliangliang.com/#/usercenter">用户中心</a>
    	</div>
    </div>
    <div class="matop"id="topno"></div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  name: 'index',
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow',
    })
  },
  data () {
    return {
      baseurl:Url.baseurl,
      search: '',
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
    gowhere(){

      if(this.$store.state.loginis){
        window.location.href="http://top.secjia.com/#/usercenter"
      }else{
         alert("您还未登录哦，点击右上角图标登录哦！")
      }
      
    },
    light(id){
      var id1 = document.getElementById('recommend');
      id1.style.color="#333";
      var id2 = document.getElementById('toutiao');
      id2.style.color="#333";
      var id3 = document.getElementById(id);
      id3.style.color="#71b34f";
    },
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">

  .matop{
    margin-top: 90px;
  }
  .totop{
    position: fixed;
    top: 46px;
    left: 0;
    z-index: 4;
  }
	
	.nav{
		height: 45px;
    width: 100vw;
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
