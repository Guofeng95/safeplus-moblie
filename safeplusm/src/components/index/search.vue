<template>
  <div class="toutiao">
      <h4 class="top">{{subscripe}}<span>{{message}}</span></h4>
      <div class="news" v-for="(item,index) in indexdata" :key="index" >
        <div class="newsthree" >
          <h4  @click="article(item.id)">{{item.title}}</h4>
          <p>{{item.content}}</p>
          <div class="icon">
            <span><i class="el-icon-time"></i>{{item.time}}</span>
            <span>阅读（{{item.read}}）</span>
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
  watch: {
     "$route": "reset"
      
  },
  data () {
    return {
      nextnotice:'',
      timer:'',
      conbotis:true,
      notice:'',
      baseurl:Url.baseurl,
      newcontentis:false,
      indexdata:[],
      href:'',
      message:'无符合要求数据',
      subscripe:'搜索结果',
      page:1,
      total:1,
    }
  },
   mounted(){
    var vm=this;
    this.indexdata=[];
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
                vm.page=vm.page+1;
                var num=vm.total/10+1;
                if( vm.page<=num){
                  vm.indexdataget(10);
                }
                
            }
      　　}
      };
    this.reset(); 
  },
  methods:{
    reset(){
　　　　this.href=sessionStorage.getItem("search");
        this.indexdataget();
　　},
    article(id){
        window.location.href='#/article?topid='+id;
      },
      indexdataget(){
        var vm=this;
        var date={};
          date.query=this.href;
          date.page=this.page;
          axios({
              method:'post',
              data:qs.stringify(date),
              url:vm.baseurl + '/article/full_text_search',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                vm.total=response.data.count;
                  if( response.data.data.length!=0){
                    vm.message="共"+vm.total+"个符合条件的结果"
                  }else{
                    vm.indexdata=[];
                  }
                  response.data.data.forEach( function(element, index) {
                    var obj={};
                    obj.title=element.title;
                    obj.id=element.id;
                    obj.content = element.summary;
                    obj.read=element.read_count;
                    obj.time=element.publish_time.split(" ")[0];
                    obj.url=element.images;
                    vm.indexdata.push(obj);
                  });
              }else{
                vm.indexdata=[];
                vm.message=response.data.msg;
              }
          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top{
  font-size: 24px;
  padding: 4px 0;
  line-height: 40px;
  margin-left: 10px;
  position: relative;
  height: 40px;
}
.top span{
  position: absolute;
  display: block;
  height: 26px;
  font-size: 16px;
  color: #a1a1a1;
  text-align: center;
  line-height: 26px;
  top: 14px;
  left: 130px;
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
  border-top: 1px solid #d3d3d3;
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
  font-size: 14px;
  color: #333;
  width: 90%;
  margin:0 auto;
  padding-bottom: 10px;
  border-bottom: 1px dashed #d3d3d3;
}
.newsone img{
  margin:0 auto;
  display: block;
  width: 90%;
  height: auto;
  cursor: pointer;
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 10px;

}
.icon{
  width: 90%;
  margin: 0 auto;
  color: #d9d9d9;
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
  margin-bottom: 10px;

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
