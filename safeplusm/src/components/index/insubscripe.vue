<template>
  <div class="toutiao">
       <h4 class="top">{{subscripe}}<span>{{'共'+tota+'篇文章'}}</span></h4>
       <div class="dybtnd">
          <el-button class="dybtn" type="success" @click="subscr('new')" v-if="subis">我要订阅</el-button>
          <el-button class="dybtn" type="success" @click="subscr('old')" v-if="subis==false">已订阅</el-button>
       </div>

      <div class="news" v-for="(item,index) in indexdata" :key="index" >
        <div class="newsone" v-if="item.form==1" @click="article(item.id)">
          <img :src="item.url[0]" >
          <p>{{item.title}}</p>
          <div style="clear:both;" ></div>
          <div class="icon">
            <span style="margin-top:4px;"><i class="el-icon-time"></i>{{item.time}}</span>
            <div>
              <span>赞（{{item.good}}）</span>
              <span>阅读（{{item.read}}）</span>
              <span>评论（{{item.comment}}）</span>
            </div>
          </div>
        </div>
        <div class="newsthree" v-else-if="item.form==3">
          <h4  @click="article(item.id)">{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span style="margin-top:4px;"><i class="el-icon-time"></i>{{item.time}}</span>
            <div>
              <span>赞（{{item.good}}）</span>
              <span>阅读（{{item.read}}）</span>
              <span>评论（{{item.comment}}）</span>
            </div>
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
      tota:0,
      subscripe:'',
      subis:true,
    }
  },
  beforeDestroy: function () {
    console.log('清除')
    clearInterval(this.timer)
  },
   mounted(){
    var vm=this;
    this.subscripe=decodeURIComponent(window.location.href.split("keyword?")[1],"utf8");;
    this.indexdata=[];
    this.indexdataget(7,"first");
     
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
        window.location.href='#/article?topid='+id;
      },
      indexdataget(limit,times){
        var vm=this;
        var date={};
          date.limit=limit;
          date.keyword=this.subscripe;
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
                  vm.tota=response.data.total_count;
                  vm.notice=response.data.prev_notice;
                  if(limit==response.data.data.length){
                    vm.conbotis=true;
                  }else{
                    vm.conbotis=false;
                  }
                  if(response.data.subscribed==0){
                    vm.subis=true;
                  }else{
                     vm.subis=false;
                  }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.good=element.like_count;
                    obj.read=element.read_count;
                    obj.comment=element.comment_count;
                    obj.time=element.publish_time.split(" ")[0];
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
                alert(response.data.msg);
              }
          });
      },
       newcon(){
        this.indexdata=[];
        this.indexdataget(7,"first");
        this.newcontentis=false;
      },
      subscr(name){
        var vm=this;
        var date={};
        date.keyword=this.subscripe;

        if(name=="new"){
           date.do_cancel=0;
        }else{
          date.do_cancel=1;
        }
        axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/news_subscribe_keyword',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.subis=!vm.subis;
              }else{
                vm.$message.warning(response.data.msg);
              }

          })

      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dybtnd{
  float: right;
  margin-right: 10px;
  font-size: 14px;
  margin-top: 10px;
}
.dybtn{
  width: 100px;
}
.top{
  padding-left: 10px;
  font-size: 30px;
  padding: 4px 0;
  width: 60%;
  height: 50px;
  float: left;
  margin-left: 10px;
  position: relative;
}
.top span{
  padding:0 10px;
  display: inline-block;
  height: 26px;
  font-size: 16px;
  color: #a1a1a1;
  border:1px solid #d7d7d7;
  text-align: center;
  border-radius: 4px;
  line-height: 26px;
  margin-left: 20px;
}
 .toutiao{
    width: 100vw;
    width: 100%;
  }
.newcontent{
  width: 94%;
  height: 30px;
  margin: 10px auto;
  background: #fff9ed;
  text-align: center;
  line-height: 30px;
  color: #ff8a00;
  font-size: 14px;
  cursor: pointer;
}

.news {
  border-top: 1px solid #dcdfe6;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
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
  font-size: 16px;
  color: #333;
  width: 90%;
  font-weight: bold;
  margin:0 auto;
  padding-bottom: 10px;
}
.newsone img{
  display: block;
  width: 30%;
  margin-left: 4%;
  float: left;
  height: auto;
  cursor: pointer;
}
.newsone p{
  width: 60%;
  float: left;
  margin-left: 3%;
  margin-bottom: 10px;

}
.icon{
  width: 90%;
  margin: 0 auto;
  clear: both;
  color: #d9d9d9;
  font-size: 12px;
  height: 20px;
  margin-top: 10px;
}
.icon span{
  display: block;
  float: left;
}
.icon div{
  font-size: 12px;
  float: right;
}
.newstwo{
  padding-left: 16px;
}
.newstwo img{
  display: block;
  width: 30%;
  height:auto;
  float: left;
  margin-left: 10px;
  margin-top: 12px;
  margin-bottom: 20px;
  cursor: pointer;
}
.newsthree p{
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden;  
  padding-bottom: 0;

}
.dashline{
  clear: both;
  border-top: 1px solid #dcdfe6;
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
