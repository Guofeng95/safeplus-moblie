<template>
  <div class="index">
  	<div class="itop">
  		<img style="height:29px;width:170px;top:8px;left:4px; " src="/static/img/logo.png">
  		<a href="#/login" v-if="loginis==false">
        <img style="height:28px;width:28px;top:8px;right:14px; " src="/static/img/login.png">
      </a>
      <a href="#" v-else @click="setout">
        <img style="height:28px;width:28px;top:8px;right:14px; border-radius: 100%;" :src="baseurl+userurl">
      </a>
      <!-- <span v-if="loginis" style="height:28px;width:28px;top:8px;right:14px;" @click="removein">退出</span> -->
      <!-- <span v-else style="height:28px;width:28px;top:8px;right:14px;"><a href="#/login">登录</a></span> -->
  		<img style="height:28px;width:28px;top:8px;right:64px; " src="/static/img/search.png">
  	</div>
  	<div class="nav">
  		<a href="#/recommend" style="width:40px;" id="recommend">推 荐</a>
  		<a href="#/" style="color: #71b34f;" id="toutiao">安全头条</a>
  		<a href="#">用户中心</a>
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
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped="scoped">
	.itop{
		height: 45px;
		width: 100vw;
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
	/*.nav a:hover{
		
	}*/
</style>
