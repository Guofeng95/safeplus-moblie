<template>
  <div class="index">
    <div class="left">
     <div class="leftcontent" v-if="indexdata.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag1)">{{tag1}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata2.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata2" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag2)">{{tag2}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata3.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata3" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2">
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag3)">{{tag3}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata4.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata4" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2" >
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag4)">{{tag4}}</span>
       </div>
     </div> 
     <div class="leftcontent" v-if="indexdata5.length>0">
       <div style="width:100%;"  v-for="(item,index) in indexdata5" :key="index">
         <div class="out" v-if="index==0">
          <img class="oneimg" :src="item.thumbnail">
           <span class="onespan" @click="article(item.id)">{{item.title}}</span>
         </div>
         <div class="out1" v-else>
           <span class="ospan" @click="article(item.id)">{{item.title}}</span>
           <img class="oimg" :src="item.thumbnail">
         </div>
       </div>
       <div class="out2">
          <span style="margin-left:20px;"></span>查看更多内容请点击<span class="wbtn" @click="scripe(tag5)">{{tag5}}</span>
       </div>
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
  name: 'recommend',
  computed:{
    ...mapGetters({
      loginis:'loginnow'
    })
  },
  data () {
    return {
      activeurl:[
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},
        {"url":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg"},

      ],
      newcontentis:true,
      indexdata:[
          {"imgurl":"http://img1.imgtn.bdimg.com/it/u=2365282747,3105404302&fm=27&gp=0.jpg","title":"CNNVD关于Windows SMBLoris关键词1情况的通报CNNVD关于Windows"}
      ],
      indexdata2:[],
      indexdata3:[],
      indexdata4:[],
      indexdata5:[],
      baseurl:Url.baseurl,
      tag1:'',
      tag2:'',
      tag3:'',
      tag4:'',
      tag5:'',
      activeis:false
    }
  },
  mounted(){
    this.userdataget();
  },
  methods:{
      scripe(name){
        sessionStorage.setItem("subscripe", name);
        window.location.href="#/insubscripe"
      },
     article(id){
        window.location.href='#/article?topid='+id;
      },
      userdataget(){
        var vm=this;
          axios({
              method:'post',
              url:vm.baseurl + '/article/news_topic_list',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function(response){
              if(response.data.status==1){
                  var arr=response.data.topic_data;
                  var l=arr.length;
                  for(var i=0;i<l;i++){
                    if(i==0){
                      vm.tag1=arr[i].keyword;
                      vm.indexdata=arr[i].news_data;
                    }else if(i==1){
                      vm.tag2=arr[i].keyword;
                      vm.indexdata2=arr[i].news_data;
                    }else if(i==2){
                      vm.tag3=arr[i].keyword;
                      vm.indexdata3=arr[i].news_data;
                    }else if(i==3){
                      vm.tag4=arr[i].keyword;
                      vm.indexdata4=arr[i].news_data;
                    }else if(i==4){
                      vm.tag5=arr[i].keyword;
                      vm.indexdata5=arr[i].news_data;
                    }
                  }
              }
          })
      },
      newcon(){
        this.newcontentis=false;
      }
      
  }

}
</script>

<style scoped>
.demonstration{
  position: absolute;
  background:rgba(255,118,0,0.8);
  color: #fff;
  height: 40px;
  width: 900px;
  display: block;
  top:300px;
  line-height: 40px;
  text-align: center;
}
.aside .inputcheck{
  position: relative;
  margin-bottom: 40px;
}
.aside .inputcheck span{
  display: block;
  font-size: 12px;
  margin-left: 0px;
  color: red;
}
.index{
  width: 100%;
  overflow: hidden;
}
.left{
  width: 100%;
  margin-right:22px;
  border-right: 1px solid #d7d7d7;
}

.left .leftcontent{
  width: 100%;
  font-size: 14px;
  border: 1px solid #ebebeb;
}
.out{
  position: relative;
  width: 100%;
  height: auto;
  border:1px solid #d7d7d7;
}
.out .oneimg{
  width: 100%;
  min-height: 250px;
}
.out .onespan{
  position: absolute;
  cursor: pointer;
  bottom: 0;
  left: 0;
  width:calc( 100% - 40px);
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  color:#fff; 
  padding:0 20px;
  background-color: #ff8a00;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.out1,.out2{
  width: 100%;
  height: 130px;
  border-bottom: 1px dashed #ccc;
  position: relative;
}
.out2{
  height: 35px;
  color:#A1A1A1;
  font-size: 14px;
  padding-top: 10px;
  border-bottom: 1px solid #ccc;
}
.out2 .wbtn{
  background: #ff8a00;
  color: #fff;
  border-radius: 4px;
  padding: 4px 6px;
  margin-left: 14px;
  margin-top: 16px;
  cursor: pointer;
}
.out1 .ospan{
  cursor: pointer;
  display: block;
  width: 54%;
  padding-left: 20px;
  height: 130px;
  margin-top: 20px;
  font-size: 16px;
  overflow: hidden;
  /*ext-overflow: ellipsis;
   white-space: nowrap;*/
  line-height: 30px;
}
.out1 .ospan:hover{
  color: #ff8a00;
}

.out1 .oimg{
  position: absolute;
  right:20px;
  top: 20px;
  width: 120px;
  height: 67px;
}
.news {
  border-bottom: 2px dashed #f2f2f2;
  overflow: hidden;
  padding-top: 5px;
  padding-bottom: 10px;
  position: relative;
}
.news h4{
  font-size: 18px;
}
.news p{
  font-size: 14px;
}
.newsone img{
  display: block;
  width: 320px;
  height: 180px;
  float: left;
  margin-right:10px; 
}
.newsone p{
  margin-top: 20px;
  margin-bottom: 40px;
}
.icon{
  position: absolute;
  right: 0;
  bottom: 10px;
  color: #aeaeae;
}
.newstwo img{
  display: block;
  width: 220px;
  height: 120px;
  float: left;
  margin-left: 28px;
  margin-top: 12px;
  margin-bottom: 40px;
}
.newsthree p{
  margin-top: 40px;
  margin-bottom: 40px;
}
.conbot{
  color: #fff;
  text-align: center;
  height: 30px;
  font-size: 14px;
  line-height: 30px;
  margin: 10px 0;
  border-radius: 6px;
  background:rgba(111, 186, 44, 1);
  cursor: pointer;
}
.aside{
    width: 326px;
    background:rgba(251, 251, 251, 1);
    border:1px solid  rgba(242, 242, 242, 1);
    padding:0 15px;
    padding-top: 26px;
    padding-right: 10px;
    overflow: hidden;
  }
  .aside h4{
    margin-bottom: 30px;
    margin-left: 10px;
    font-size: 18px;
  }
  .aside .span{
    width: 20px;
    display: block;
    float: left;
    text-align: center;
    line-height: 20px;
    height: 20px;
    font-size: 14px;
    background: #aeaeae;
    border-radius: 100%;
    color: white;
    margin-top: 5px;
    margin-right: 10px;
    margin-left: 10px;
  }
  .aside div{
    width: 290px;
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
  }
  .aside div p{
    width: 210px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    float: left;
  }
  .aside .form{
    height: 34px;
    width: 260px;
    margin-top: 4px;
  }
  .aside .btn{
    display: block;
    height: 36px;
    width: 260px;
    border-radius: 4px;
    background: #ff0000;
    color: #fff;
    line-height: 36px;
    text-align: center;
    position: relative;
    cursor: pointer;
    margin-top: 10px;
    font-size: 14px;
  }
  .aside .btn img{
    position: absolute;
    left: 60px;
    top: 4px;
  }
  .aside .btna a{
    width: 80px;
    height: 32px;
    border-radius: 6px;
    display: block;
    float: left;
    margin-top: 14px;
    color: #fff;
    line-height: 32px;
  }
  .aside div a img{
    display: block;
    float: left;
  }
  .aside div{
    clear: both;
  }
  .aside div p{
    width: 90px;
    float: left;
  }
  .aside .ahref{
    padding-top: 10px;
  }
  .aside .ahref a{
    display: block;
    float:left;
    color: #3399d6;
    font-size: 14px;
    text-decoration: none;
    line-height: 30px;
    margin-left: 10px;
  }
  .aside .ahref .forgot{
    margin-left: 70px;
  }
  .app{
    display: block;
    margin-bottom: 20px;
  }
  .more{
    position: relative;
  }
  .more span{
    display: block;
    width: 40px;
    height: 20px;
    position: absolute;
    right: 20px;
    top: 50px;
    cursor: pointer;
  }
  .more .tu{
    cursor: pointer;
    width: 90px;
    height: 90px;
    left: 24px;
    top: 80px;
  }
   .aside .diva{
    width: 120px;
    float: left;
    clear: none;
    margin-left: 10px;
  }
  .aside .diva a{
    text-decoration: none;
    color: #333;
  }
  #reset{
    width: 270px;
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
 .aside .verify{
    width: 196px;
  }
  .background .aside  .form{
    margin-top: 20px;

  }
  .background .aside .btn{
    margin-top: 20px;
  }
</style>
