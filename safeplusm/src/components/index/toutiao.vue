<template>
  <div class="toutiao">
      <div class="newcontent" v-show="newcontentis">
        <span @click="newcon">有新的文章发布啦,刷新一下,查看新内容！</span>
      </div>
      <div class="news" v-for="(item,index) in indexdata" :key="index" >
        <div class="newsone" v-if="item.form==1">
          <h4  @click="article(item.id)" >{{item.title}}</h4>
          <img :src="item.url[0]" @click="article(item.id)">
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
        <!-- <div class="newstwo" v-else-if="item.form==2">
          <h4  @click="article(item.id)">{{item.title}}</h4>
          <div>
            <img  @click="article(item.id)" style="margin-left:0;" :src="item.url[0]">
            <img  @click="article(item.id)" :src="item.url[1]">
            <img  @click="article(item.id)" :src="item.url[2]">
          </div>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div> -->
        <div class="newsthree" v-else-if="item.form==3">
          <h4  @click="article(item.id)">{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>赞（{{item.good}}）</span>
            <span>阅读（{{item.read}}）</span>
            <span>评论（{{item.comment}}）</span>
          </div>
        </div>
      </div>
      <div class="dashline"></div>
      <div class="conbot" v-show="conbotis" @click="indexdataget(10)">
        查看更多 精彩文章
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
      nextnotice:'',
      timer:'',
      conbotis:false,
      notice:'',
      baseurl:Url.baseurl,
      newcontentis:false,
      indexdata:[],
    }
  },
  beforeDestroy: function () {
    console.log('清除')
    clearInterval(this.timer)
  },
   mounted(){
    var vm=this;
    this.indexdata=[];
    this.indexdataget(7,"first");
    this.timer=setInterval(function(){
          var date={};
          date.notice=vm.nextnotice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_check_new',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
            if(response.data.status==1){
              vm.newcontentis=true;
            }else{
              vm.newcontentis=false;
            }
          })
    },10000);
     
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

      //文档的总高度

      function getScrollHeight(){
      　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      　　if(document.body){
      　　　　bodyScrollHeight = document.body.scrollHeight;
      　　}
      　　if(document.documentElement){
      　　　　documentScrollHeight = document.documentElement.scrollHeight;
      　　}
      　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      　　return scrollHeight;
      }

      //浏览器视口的高度

      function getWindowHeight(){
      　　var windowHeight = 0;
      　　if(document.compatMode == "CSS1Compat"){
      　　　　windowHeight = document.documentElement.clientHeight;
      　　}else{
      　　　　windowHeight = document.body.clientHeight;
      　　}
      　　return windowHeight;
      }

      window.onscroll = function(){
      　　if(getScrollTop() + getWindowHeight() == getScrollHeight()){
      　　　 if(vm.conbotis==true){
                vm.indexdataget(10);
            }
      　　}
      };
    
  },
  methods:{
    article(id){
      console.log(id)
        //window.location.href='/article?topid='+id;
      },
      indexdataget(limit,times){
        var vm=this;
        var date={};
          date.limit=limit;
          date.notice=this.notice;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                  if(times=="first"){
                    vm.nextnotice=response.data.next_notice;
                  }
                  vm.notice=response.data.prev_notice;
                  if(limit==response.data.data.length){
                    vm.conbotis=true;
                  }else{
                    vm.conbotis=false;
                  }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.good=element.like_count;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time;
                    obj.url=element.images;
                    var l=element.images.length;
                    if(l==0){
                      obj.form=3
                    }else {
                      obj.form=1;
                    }
                    vm.indexdata.push(obj);
                  });
              }else{
                vm.$message.warning('拉取失败!');
              }
          });
      },
       newcon(){
        this.indexdata=[];
        this.indexdataget(7,"first");
        this.newcontentis=false;
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toutiao{
    width: 100vw;
    width: 100%;
  }
  .newcontent{
  width: 903px;
  height: 34px;
  background: #fff9ed;
  text-align: center;
  line-height: 34px;
  margin-bottom: 18px;
}
.newcontent span{
  color: #ff8a00;
  font-size: 14px;
  cursor: pointer;
}
.news {
  border-top: 1px dashed #d3d3d3;
  overflow: hidden;
  padding-top: 24px;
  padding-bottom: 24px;
  position: relative;
  width: 100%;
}
.news h4{
  width: 90%;
  margin:0 auto;
  font-size: 18px;
  cursor: pointer;
  height: 50px;
  overflow: hidden;
  font-size: 17px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden;  /** 隐藏超出的内容 **/
}

.news p{
  font-size: 14px;
  color: #777777;
}
.newsone img{
  margin:0 auto;
  display: block;
  width: 320px;
  height: 200px;
  cursor: pointer;
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 40px;
}
.icon{
  position: absolute;
  right: 0;
  bottom: 24px;
  color: #aaaaaa;
  font-size: 12px;
}
.newstwo img{
  display: block;
  width: 288px;
  height: 180px;
  float: left;
  margin-left: 14px;
  margin-top: 12px;
  margin-bottom: 40px;
  cursor: pointer;
}
.newsthree p{
  margin-top: 40px;
  margin-bottom: 40px;
}
.dashline{
  border-top: 1px dashed #d3d3d3;
}
.conbot{
  color: #fff;
  text-align: center;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 0;
  border-radius: 0px;
  background:rgba(111, 186, 44, 1);
  cursor: pointer;
}
</style>
