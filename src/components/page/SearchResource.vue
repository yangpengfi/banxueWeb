<template>
  <div>
      <div class="search-bg"></div>
      <div class="search-type">
          <span>类型</span>
          <button v-for="item of typeList" @click="changeType(item)" :class="{active:item.id==typeId}">{{item.title}}</button>
      </div>
      <div class="search-container">
          <div class="left">
                <p>共搜索到 <span>30</span> 个资源</p>
                <ul class="right-list">
                    <li v-for="item of resourceList">
                        <div class="file-img">
                            <img src="/static/imgs/resource/fileXls.png" alt="文档图片" @click="toDetailResource">
                        </div>
                        <div class="file-content">
                            <h5 @click="toDetailResource">{{item.title}}</h5>
                            <p>
                            <span>大小：{{item.size}}</span>
                            <span>浏览：{{item.view}}</span>
                            <span>下载：{{item.downLoad}}次</span>
                            <span>收藏：{{item.collect}}</span>
                            </p>
                            <p>贡献者：{{item.creator}}</p>
                            <p>贡献时间：{{item.date}}</p>
                        </div>
                        <div class="file-star">
                            <Rate v-model="star"></Rate>
                        </div>
                    </li>                
                </ul>
                <Page :total="totalCount" show-elevator show-total></Page>	
          </div>
          <div class="right">
               <div class="hot-list">
                   <p><span></span><b>热门搜索</b></p>
                   <ul>
                        <li v-for="item of hotSearch">
                            <img src="/static/imgs/resource/fileXls.png" alt="资源图标" @click="toDetailResource">
                            <div>
                                <p @click="toDetailResource">{{item.title}}</p>
                                <Rate v-model="item.star"></Rate>
                            </div>
                        </li>
                   </ul>
               </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'SearchResource',
    data(){
        return{
            typeList:[
                {id:1,title:'区域资源'},
                {id:2,title:'校本资源'},
                {id:3,title:'特色微课'},
                {id:4,title:'优课专区'}
            ],
            typeId:1,
            star:5,
            resourceList:[
                {title:'高考快速提分秘籍',size:'7M',view:2400,downLoad:360,collect:20,creator:'张先生',date:'2018-3-26'},
                {title:'高考快速提分秘籍',size:'7M',view:2400,downLoad:360,collect:20,creator:'张先生',date:'2018-3-26'},
                {title:'高考快速提分秘籍',size:'7M',view:2400,downLoad:360,collect:20,creator:'张先生',date:'2018-3-26'},
                {title:'高考快速提分秘籍',size:'7M',view:2400,downLoad:360,collect:20,creator:'张先生',date:'2018-3-26'},
                {title:'高考快速提分秘籍',size:'7M',view:2400,downLoad:360,collect:20,creator:'张先生',date:'2018-3-26'}
            ],
            hotSearch:[
                {title:'高考快速提分秘籍',star:3},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:5},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:3}
            ],
            totalCount:10
        }
    },
    methods:{
        changeType(item){
            this.typeId = item.id;
        },
        toDetailResource(){
            this.$router.push({
				path:'/DetailResource',
				query:{
										
				}
			});		
        }
    }
}
</script>
<style scoped>
    .search-bg{
        width: 100%;
        height: 220px;
        background-color:#1cb0ea;
        background: url('../../assets/imgs/resource/searchdebg.jpg') no-repeat center center;
    }
    .search-type{
        width: 1200px;
        margin: 30px auto;
        font-size: 14px;
    }
     .search-type span{
        margin-right: 20px;
    }
    .search-type button{
        padding: 3px 15px;
        margin-right: 30px;
        color: #666;
        cursor: pointer;
        border:none;
        background-color: transparent;
    }
    .search-type button:focus{ 
        outline: none; 
    } 
    .search-type button.active{
        color: #fff;
        background-color: #1cb0ea;
    }
    .search-container{
        width: 1200px;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 80px;
        overflow: hidden;
    }
    .search-container>.left{
        width: 820px;
        border:1px solid #e9e9e9;
        background-color: #fff;
        padding: 30px 40px;
    }
     .search-container>.left>p span{
        color: #1cb0ea;
    }
    .search-container>.right{        
        width: 360px;        
    }  
    .right-list{
        width: 100%;
    }  
    .right-list li{
        height: 180px;  
        padding-top: 40px;
        position: relative;   
        border-bottom:1px solid #f3f3f3;
    }
    .right-list li:last-child{     
        border-bottom:none;
    }   
    .file-img{
        float: left;
    }
    .file-img img{
        width: 100px;
        height: 100px;
        cursor: pointer;
    }   
    .file-content{
        float: left;
        margin-left: 90px;
        font-size: 14px;
        color: #999;
    }
    .file-content p{
        margin: 5px 0;
    }
    .file-content p span{
        margin-right: 20px;
    }
    .file-content h5{
        color: #333;
        font-size: 14px;
        cursor: pointer;
    }
    .ivu-page{
        text-align: center;
        margin-top: 25px;
    }
    .file-star{
        text-align: right;
    }
    .hot-list{
        padding: 35px 20px 0;
        background-color: #fff;
        border:1px solid #e9e9e9;
    }
    .hot-list>p{
        font-size: 20px;  
        margin-bottom: 30px;   
        height: 30px;
        line-height: 30px;  
        vertical-align: middle;   
    }
    .hot-list p span{
        float: left;
        height: 100%;
        margin-right: 20px;
        border-left: 2px solid #0098e0;
    }
    .hot-list p b{
        float: left;
        font-weight: normal;        
    }
    .search-container>.right ul li{
        overflow: hidden;
        height: 60px;
        border-bottom: 1px solid #f8f8f8;
        margin-bottom: 20px;    
    }
    .search-container>.right ul img{
        float: left;
        width: 40px;
        height: 40px;
        cursor: pointer;
    }
    .search-container>.right ul li>div{
        float: left;
        margin-left: 10px;        
    }
    .search-container>.right ul li>div p{
        cursor: pointer;      
    }
    .ivu-page{
     text-align: center;
     margin-top: 25px;
   }
</style>


