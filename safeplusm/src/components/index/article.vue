<template>
  <div class="article">
  	<div class="top">
  		<a href="#/">首页></a>
  		<a href="#/">{{secondtit+'>'}}</a>
  		<a v-if="thirdtit">{{thirdtit}}</a>
  	</div>
    <div class="sumary">
      <h4>{{artitle}}</h4>
      <p>
        <span style="color:#0099CC;">{{artauthor}}</span>
        <span>{{'·'+arttime}}</span>
        <span v-if="thirdtit">{{'·'+thirdtit}}</span>
        <br/>
        <span>
          <span>{{'阅读('+readnum+')'}}</span>
          <span>{{'评论('+comnum+')'}}</span>
           <img style="cursor:pointer;" @click='hdpout' src="/static/img/hdp.png">
        </span>
        
      </p>
    </div>
  	<div id="articlenowok" v-html="article" style="font-size:14px;">
  	</div>
  	<div class="down" v-if="downloaddata.length!=0">
  		<h4 class="hf">文章附件</h4>
      <div class="downcontent">
          <div  style="position:relative" v-for="(item,index) in downloaddata" :key="index">
            <img class="dimg" src="/static/img/flie.png">
            <p>
              <span class="dcon">{{item.content}}</span>
              <span class="dlarge">{{item.large}}</span>
              <span class="dnum">{{'下载（'+item.num+'）'}}</span>
            </p>
          </div>
      </div>
  	</div>
  	<div class="bottom">
      <p class="pagr" v-if="lasturl!=0"><a @click="narticle(lasturl)">上一篇：{{lasttitle}}</a></p>
      <p class="pagr" v-if="nexturl!=0"><a @click="narticle(nexturl)">下一篇：{{nexttitle}}</a></p>
      <p style="margin-top:10px; color:#a1a1a1;">*文章为作者独立观点，不代表安全加立场</p>
      <div class="downcontent">
        <p>本文由：安全加发布，版权归属于原作者。 如果转载，请注明出处及本文链接： </p>
        <p>{{aurl}}</p>
        <p>如果此文章侵权，请留言，我们进行删除。</p>
      </div>
    </div>
    <div class="author">
      <img :src="artauthorurl">
      <span class="aur">作者 </span>
      <span class="aurname">{{artauthor}}</span>
      <span class="aurnum">{{'为大家奉献了'+artauthornum+'篇文章'}}</span>
    </div>
    <div class="btn">
      <button @click="like" v-if="likeis"><img src="/static/img/aok.png">{{'赞（'+zannum+'）'}}</button>
      <button @click="like('ok')" v-else><img src="/static/img/aok.png">{{'赞（'+zannum+'）'}}</button>
      <button @click="mark" v-if="markis"><img src="/static/img/astar.png">{{'收藏（'+scnum+'）'}}</button>
      <button @click="mark('ok')" v-else><img src="/static/img/astar.png">{{'收藏（'+scnum+'）'}}</button>
<!--       <button><img src="/static/img/awx.png">分享到微信</button>
      <button><img src="/static/img/awb.png">分享到微博</button>
      <button><img src="/static/img/aqq.png">分享到QQ</button> -->
    </div>
    <div class="tagzi">
      <p style="font-size:14px;color:#a1a1a1; margin-bottom:10px;">您可能对以下关键词感兴趣哟，请用鼠标点击关键词 :</p>
      <ul>
        <li v-for="(item,index) in tagdata" >
          <span style="color:#a1a1a1;" v-if="index!=0">/</span>
          <img src="/static/img/uno.png">
          <span @click="scripe(item)">{{item}}</span>
        </li>
      </ul>
    </div>
    <h4 class="hf" id="tagh4" style="clear:both;">相关文章</h4>
    <div class="articlecot">
      <div class="left" id="tagleft" v-if="tagchangedata.length>0" >
        <p v-for="(item,index) in tagchangedata" @click="narticle(item.id)" > 
         {{'('+(index+1)+')'+item.title}}
        </p>
      </div>
      <div class="left" id="tagleft" v-else>
        <p> 
          无数据
        </p>
      </div>
      <!-- <div class="left" id="tagright" v-if="tagchangedata.length>0">
        <p v-for="(item,index) in tagchangedata" v-if="(index%2)!=0"> 
          {{'('+(index+1)+')'+item.title}}
        </p>
      </div>
      <div class="left" id="tagright" v-else>
        <p> 
          无数据
        </p>
      </div> -->
    </div>
     <h4 class="hf" style="clear:both;padding-top:0px;margin-bottom:20px;">参与讨论</h4>
     <div class="context">
        <el-input
        type="textarea"
        :rows="6"
        placeholder="请输入内容"
        v-model="textarea"
        resize="none"
        class="text"
        @change="compleng">
      </el-input>
      <span class="num"></span>
      <span class="tbtn" @click="newcomment">发表评论</span>
      <!-- <span class="topt" @click="gotop"><img src="/static/img/atopgo.png"></span> -->
     </div>
    <div class="comment">
      <div class="comt" v-for="(item,index) in comdata" :id="'c'+item.id">
        <img :src="item.url">
        <span class="comname">{{item.name}}<span class="comtime">{{"·"+item.time}}</span></span>
        
        <p class="comcontent">{{item.content}}</p>
      </div>
     <el-button class="combtn" type="success" v-show="combtnis" @click="comment"  :loading="false">查看更多评论</el-button>
    </div>
    <div class="bigimg" v-show="bigimgis">
      <div>
        <img class="imges" :src="nowbig">
        <span class="imgleft" @click="bigchange('left')"><img style="width:30px;" src="/static/img/imgleft.png"></span>
        <span class="imgright" @click="bigchange('right')"><img img style="width:30px;" src="/static/img/imgright.png"></span>
        <span class="imgno"  @click="hdpout('no')"><img src="/static/img/imgno.png"></span>
      </div>
    </div>


  </div>
</template>
<script>
import {mapGetters} from "vuex"
import axios from 'axios'
import qs from 'qs'
import * as Url from '@/components/url.js'
export default {
  computed:{
    ...mapGetters({
      loginis:'loginnow',
      userurl:'urlnow',
      userstatus:'statusnow'
    })
  },
  data () {
    return {

      lasturl:"",
      lasttitle:'',
      nexttitle:'',
      nexturl:'',
      artauthorurl:'/static/img/userurl.png',
      artauthornum:1,
      markis:true,
      likeis:true,
      combtnis:false,
      offset:0,
      nowbig:'',
      nowbignum:0,
      bigimgis:false,
      zannum:0,
      scnum:0,
      baseurl:Url.baseurl,
      hdpurl:[
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/92a72a4647d1d3fa5f59189020641f4b.jpg",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/defaultAttachmentURL2.PNG",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/bf33c8b485d93a3b61fbe11420042d70.jpg",
      	// "http://7xkk1o.com1.z0.glb.clouddn.com/c895952e7031e7444a4c9fcd7afeb041.jpg"
      ],
      arttime:'',
      comnum:5454,
      readnum:4,
      artauthor:'dk',
      artitle:'wd',
      level:'',
      conleng:0,
      textarea:'',
      id:'',
      aurl:'http://toutiao.secjia.com/wannacry-2-0-protection',
      secondtit:'',
      thirdtit:'文章分类1',
      article:'<h2>wenzhang</h2>',
      downloaddata:[
      // {
      // 	"url":"djd1",
      // 	"large":"1.5m",
      // 	"content":"这里是附件文件名这里是附件文件名这里是附件文件名这里是附件文件名这里是",
      // 	"num":"6071"
      // }
      ],
      tagdata:[],
      comdata:[
              // {
              //   "url":"/static/img/userurl.png",
              //   "time":"11xiaoshi",
              //   "name":"线板吗就是",
              //   "content":"hgwhjgjheg今年上看到黄金客户就是肯定会查看回复等级考试继父回家"
              // }
      ],
      tagchangedata:[
        
      ],
      comid:''
    }
  },
  watch: {
     "$route": "reset"
      
  },
  beforeDestroy: function () {
    this.display("block");
    
  },
  mounted(){
    this.reset();
    var vm=this;
    
  },
  methods:{
    display(num){

      var id =document.getElementById("topall");
      var id1 =document.getElementById("topindex");
      var id2 =document.getElementById("topno");
      id.style.display = num 
      id1.style.display = num
      id2.style.display = num
    },
    reset(){
    var vm=this;
    document.body.scrollTop =0;
    document.documentElement.scrollTop = 0;
    this.display("none");
    this.tagchangedata=[];
    var comis=window.location.href.indexOf("comid");
    if(comis>-1){
      var arr1=window.location.href.split('?')[1].split("&");
      var arr=arr1[0].split("=");
      this.id=arr[1];
      if(arr[0]=="topid"){
        this.secondtit="安全头条"
      };
      var arr2=arr1[1].split("=")[1];
      this.comid=arr2;
      setTimeout(function() {
        var com=document.getElementById('c'+vm.comid).offsetTop;
        //console.log(com)
        document.body.scrollTop = com;
        document.documentElement.scrollTop = com;
      }, 100);
    }else{
      var arr=window.location.href.split('?')[1].split("=");
      this.id=arr[1];
      if(arr[0]=="topid"){
        this.secondtit="安全头条"
      };
    }
    
    
    var date={};
    date.id=this.id;
    date.with_doc=1
    vm.aurl=window.location.href;
    axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_content',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function(response){
        if(response.data.status==1){
          var obj=response.data.news_data
          vm.artitle=obj.title;
          vm.artauthor=response.data.author;
          vm.arttime=obj.publish_time;
          vm.readnum=obj.read_count;
          vm.comnum=obj.comment_count;
          vm.thirdtit=response.data.keywords[0];
          vm.tagdatanow(response.data.keywords[0])
          vm.article=response.data.doc;
          vm.zannum=obj.like_count;
          vm.hdpurl=obj.images;
          vm.nowbig=obj.images[0];
          vm.scnum=response.data.extra_data.mark_count;
          if(response.data.extra_data.liked==1){
            vm.likeis=false;
          }
          if(response.data.extra_data.marked==1){
            vm.markis=false;
          }
          vm.tagdata=response.data.keywords;
          vm.artauthor=response.data.author_data.name;
          vm.artauthornum=response.data.author_data.news_count;
          vm.artauthorurl=response.data.author_data.url;
          vm.lasturl=response.data.related_data.older_news.id;
          vm.lasttitle=response.data.related_data.older_news.title;
          vm.nexturl=response.data.related_data.newer_news.id;
          vm.nexttitle=response.data.related_data.newer_news.title;

          setTimeout(function(){
            var article=document.getElementById("articlenowok")
            var imgsl=article.getElementsByTagName('img');
            console.log(imgsl)
            var l=imgsl.length;
            for(var i=0;i<l;i++){
              // alert(document.body.clientWidth)
              // alert(imgsl[i].width)
              if( imgsl[i].width > document.body.clientWidth){
                var height = (imgsl[i].height/imgsl[i].width).toFixed(2)*90;
                //console.log(height)
                imgsl[i].style.width = '90vw';
                imgsl[i].style.height = height+'vw';
              }
              
            }
            
          }, 100)
          
        }else{
          alert(response.data.msg);
        }
    });
    this.comment();
    function getScrollTop(){
      　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      　　if(document.body){
      　　　　bodyScrollTop = document.body.scrollTop;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollTop = document.documentElement.scrollTop;
      　　}
      　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      　　return scrollTop;
      }
      setTimeout(function(){
        window.onscroll=function(){
        var sco=getScrollTop();
          if(sco==0){
            vm.display("block");
          }
        }
      }, 500)
      
    },
    narticle(id){
        window.location.href='#/article?topid='+id;
      },
    tagdatanow(name){
      var vm=this;
      var date={};
      date.limit=5;
      date.notice='';
      date.keyword=name;
      axios({
          method:'post',
          data:qs.stringify(date),
          url:vm.baseurl + '/article/news_list',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(response){
        if(response.data.status==1){
            if(response.data.data.length>0){
              response.data.data.forEach( function(element, index) {
                var obj={};
                obj.id=element.id;
                obj.title=element.summary;
                vm.tagchangedata.push(obj);
              });
            }
        }

      })
    },
    tagover(name){
      var vm=this;
      vm.tagchangedata=[];
      var h4=document.getElementById("tagh4");
      var tl=document.getElementById("tagleft");
      var tr=document.getElementById("tagright");
      h4.style.color = 'rgb(0,153,0)';
      tl.style.borderColor = 'rgb(0,153,0)';
      tr.style.borderColor = 'rgb(0,153,0)'; 
      vm.tagdatanow(name);
    },
    tagout(name){
      var h4=document.getElementById("tagh4");
      var tl=document.getElementById("tagleft");
      var tr=document.getElementById("tagright");
      h4.style.color = '#a1a1a1';
      tl.style.borderColor = '#d7d7d7';
      tr.style.borderColor = '#d7d7d7';
    },
    scripe(name){
      //sessionStorage.setItem("subscripe", name);
      window.location.href="#/keyword?"+encodeURIComponent(name);
    },
  	bigchange(lr){
  		if(lr=='left'){
  			if(this.nowbignum>0){
  				
  				this.nowbignum=this.nowbignum-1;
  				//alert(this.nowbignum)
  				this.nowbig=this.hdpurl[this.nowbignum];
  			}
  		}else{
  			var l=this.hdpurl.length-1;
  			if(this.nowbignum<l){
  				this.nowbignum=this.nowbignum+1;
  				//alert(this.nowbignum)
  				this.nowbig=this.hdpurl[this.nowbignum];
  			}
  		}

  	},
  	hdpout(no){
       var id=document.getElementById("vue-all");
  		if(no=="no"){
  			this.bigimgis=false;
  			this.nowbignum=0;
  			this.nowbig=this.hdpurl[0];
         id.style.overflow = 'auto';
  		}else{
  			this.bigimgis=true;
        id.style.overflow = 'hidden';
  		}
  		
  	},
  	like(ab){
  		var vm=this;
  		//if(ab!="ok"){
  			  
	      var date={};
        if(ab=="ok"){
          date.do_cancel=1
        }else{
          date.do_cancel=0
        }
		    date.news_id=this.id;
			  axios({
		        method:'post',
		        data:qs.stringify(date),
		        url:vm.baseurl + '/article/news_like',
		       headers: {
		          'Content-Type': 'application/x-www-form-urlencoded'
		        }
		   		 }).then(function(response){
		        if(response.data.status==1){
              if(ab=="ok"){
                vm.zannum=vm.zannum-1;
                vm.likeis=true;
              }else{
                vm.zannum=vm.zannum+1;
                vm.likeis=false;
              }
		        	
		        }else{
              if(vm.$store.state.loginis){
                 alert(response.data.msg)
              }else{
                alert("您还未登录哦，点击右上角图标登录哦！");
                 window.location.href="#/login"
              }
		         
		        }
			   });
   		// }else{
   		// 	alert("您已经点赞了哦！")
   		// }
  	  
  	},
  	mark(ab){
  	 var vm=this;
      var date={};
      if(ab=="ok"){
      	date.do_cancel=1
      }else{
      	date.do_cancel=0
      }
      date.news_id=this.id;
	  axios({
        method:'post',
        data:qs.stringify(date),
        url:vm.baseurl + '/article/news_mark',
       headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
   		 }).then(function(response){
        if(response.data.status==1){
        	if(ab=="ok"){
        		vm.scnum=vm.scnum-1;
   	        	vm.markis=true;
        	}else{
        		vm.scnum=vm.scnum+1;
   	        	vm.markis=false;
        	}
        	
        }else{
          if(vm.$store.state.loginis){
             alert(response.data.msg)
          }else{
            alert("您还未登录哦，点击右上角图标登录哦！");
            window.location.href="#/login"
          }
        }
	   });
  	},
  	newcomment(){
  	  var vm=this;
      var date={};
      date.news_id=this.id;
      date.content=this.textarea;
      if(vm.$store.state.loginis){
        if(this.textarea!="" && this.textarea.length<=300){
        		axios({
  	        method:'post',
  	        data:qs.stringify(date),
  	        url:vm.baseurl + '/article/news_new_comment',
  	       headers: {
  	          'Content-Type': 'application/x-www-form-urlencoded'
  	      }
  	    }).then(function(response){
  	        if(response.data.status==1){
  	        	alert("发送成功！")
  	   	        vm.textarea='';
  	   	        vm.comment("new");
  	        }else{
  	          alert(response.data.msg)
  	        }
  	    });
        }else{
        		alert("请输入1-300个字！")
        }
      }else{
         alert("您还未登录哦，点击右上角图标登录哦！");
          window.location.href="#/login";
      }
  	},
    compleng(){
      console.log(this.textarea)
      this.conleng=this.textarea.length;
    },
    gotop(){
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    comment(ab){
      var vm=this;
      var date={};
      date.news_id=this.id;
      if(ab=="new"){
      	this.comdata=[];
      	this.offset=0;
      }
      date.offset=this.offset;
      date.limit=10;
      axios({
	        method:'post',
	        data:qs.stringify(date),
	        url:vm.baseurl + '/article/news_comments',
	       headers: {
	          'Content-Type': 'application/x-www-form-urlencoded'
	      }
	    }).then(function(response){
	        if(response.data.status==1){
	        	
	          	var arr = response.data.data;
	          	if(arr.length<10){
                vm.combtnis=false;
	          	}else{
	          		vm.combtnis=true;
	          		vm.offset=vm.offset+1;
	          	}
	          	arr.forEach( function(element, index) {
	          		var obj={};
	          		obj.url=element.user_url;
	          		obj.name=element.user_name;
	          		obj.time=element.comment_time;
	          		obj.content=element.comment_content;
	          		obj.id=element.comment_id;
	          		vm.comdata.push(obj)
	          	});
	          	

	        }else{
	          alert(response.data.msg)
	        }
	    });
     }
  },

}
</script>
<style scoped>
 .article{
 	width: 96%;
 	margin:0 auto;
  padding-bottom: 10px;
 }
 .top{
 	padding-top: 10px;
  font-size: 14px;
  line-height: 30px;
  height: 30px;
 	padding-bottom: 10px;
 }
 .top a{
 	text-decoration: none;
 	color: #3a9e00;
 	font-size: 14px;
 }
 .hf{
  color: #a1a1a1;
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.downcontent{
  width: 90%;
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  position: relative;
}
.downcontent div{
  padding: 10px 5px;
}

.dimg{
  display: block;
}
.dcon{
  
  width: 800px;
  position: absolute;
  height: 30px;
  top: 10px;
  left: 58px;
  color: #333;
}
.dlarge{
  font-size: 14px;
  color: #a1a1a1;
  position: absolute;
  left: 58px;
  top: 40px;
}
.dnum{
  font-size: 14px;
  color: #a1a1a1;
  position: absolute;
  left: 108px;
  top: 40px;
}
.bottom p{
  font-size: 14px;
}
.author{
  width: 270px;
  margin:30px auto;
  height: 80px;
  position: relative;
}
.author img{
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
.author span{
  position: absolute;
  display: block;
}
.author .aur{
  color: #ff9966;
  width: 60px;
  height: 24px;
  border:1px solid #ff9966;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  border-radius: 4px;
  top: 10px;
  left: 100px;
}
.author .aurname{
  font-size: 20px;
  top: 12px;
  left: 176px;
}
.author .aurnum{
  font-size: 14px;
  color: #a1a1a1;
  left: 100px;
  top: 58px;
}
.btn{
  width: 290px;
  margin: 0 auto;
  font-size: 14px;
  padding-bottom: 10px;
}
.btn button{
  width: 120px;
  height: 40px;
  color: #fff;
  border-radius: 4px;
  border:none;
  background: #6fba2c;
  line-height: 40px;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
}
.btn button img{
  display: block;
  float: left;
  margin-top:10px;
  margin-left: 10px;

}
.tagzi ul li{
  display: block;
  float: left;
  margin-left: 10px;
  font-size: 14px;
  color: rgb(0,153,204);
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.tagzi ul li img{
  margin-left: 4px;
  display: inline-block;
  margin-top: 14px;
}
.tagzi ul li:hover {
  color: rgb(255,102,0)
}
.articlecot div{
  width: 90%;
  padding: 10px 10px;
  padding-bottom: 0;
  display: block;
  margin: 0 auto;
  border:1px solid #d7d7d7;
  border-radius: 6px;
  background: #fcfcfc;
}
.articlecot .left{
  margin-right: 10px;
  height: 157px;
}
.articlecot div p{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  margin-bottom: 10px;
}
.context{
  width: 94%;
  margin: 0 auto;
  position: relative;
}
.text{
  width: 100%;
}
.context .num{
  color: #a1a1a1;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 110px;
}
.context .tbtn{
  width: 100px;
  height: 30px;
  display: block;
  background: #61a326;
  text-align: center;
  color: #fff;
  border-radius: 6px;
  line-height: 30px;
  font-size: 14px;
  margin-top: 20px;
  cursor: pointer;
}
.context .topt{
  display: block;
  right: -60px;
  cursor: pointer;
  top: 40px;
  position: absolute;
  width: 44px;
  height: 38px;
  background: #61a326;
  padding-top: 6px;
  border-radius: 4px;
}
.context .topt img{
  display: block;
  margin-left: 7px;
}
.comment{
  margin-top: 30px;
}
.comt{
  padding: 10px 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px dashed #f7f7f7;
}
.comt img{
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: block;
  float: left;

}
.comt .comname{
  position: absolute;
  top:10px;
  left: 50px;
  color:#91baf8;
  font-size: 14px; 
}
.comt .comtime{
  color:#dedcda;
  font-size: 14px;
}
.comt .comcontent{
  width: 700px;
  padding-top:20px;
  margin-left: 50px;
  font-size: 14px;
  color: #333;
}
.combtn{
  margin:30px auto;
  display: block;
}
.sumary h4{
  font-size: 24px;
  width: 100%;
  font-weight: normal;
  margin-bottom: 10px;
}
.sumary p{
  margin-bottom: 30px;
  font-size: 12px;
  position: relative;
}
.sumary img{
  display: block;
  float: left;
  margin-top: 3px;
}
.sumary p span{
  font-size: 14px;
  color:#AEAEAE;
}
.sumary p span span{
  display: block;
  float: left;
  margin-right: 8px;
}
.bigimg{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  top: 0;
  z-index: 100;
  left: 0;
}
.bigimg div{
  width: 90%;
  height: auto;
  position: absolute;
  border:4px solid #fff;
  border-radius: 8px;
  top: 30%;
  left: 5%;
}
.bigimg .imges{
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
}
.bigimg span{
  display: block;
  width: 30px;
  height: 30px;
  padding: 2px;
  cursor: pointer;
  border-radius: 100%;
  background: #ccc;
  position: absolute;
  top: 40%;
}
.bigimg .imgleft{
  left: 10%;
}
.bigimg .imgright{
right: 10%;
}
.bigimg .imgno{
	top: -50px;
	width: 30px;
  height: 30px;
  padding-top: 10px;
  padding-left: 10px;
}
.pagr{
  margin-top: 20px;
  margin-left: 30px;
  cursor: pointer;
}
.pagr a{
  text-decoration: none;
  color: #c3864d;
}
@media screen and (orientation:landscape) {
  .bigimg div{
    width: auto;
    height: 80%;
    position: relative;
    border:none;
    border-radius: 0px;
    top: 15%;
    left: 0;
    margin:0 auto;
  }
  .bigimg .imges{
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
  }
}

</style>