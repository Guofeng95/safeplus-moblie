<template>
  <div class="index">
  	<div class="itop">
  		<img style="height:29px;width:170px;top:8px;left:4px; " src="/static/img/logo.png">
  		<a href="#/login"><img style="height:28px;width:28px;top:8px;right:14px; " src="/static/img/login.png"></a>
  		<img style="height:28px;width:28px;top:8px;right:64px; " src="/static/img/search.png">
  	</div>
  	<div class="nav">
  		<a href="#" style="width:40px;">推 荐</a>
  		<a href="#">安全头条</a>
  		<a href="#">用户中心</a>
  	</div>
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
      userlevel:'userlevelnow'
    })
  },
  data () {
    return {
      status: '1'
    }
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
	.nav a:hover{
		color: #71b34f;
	}
</style>
