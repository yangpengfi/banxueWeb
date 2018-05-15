<template>
  <div class="w-1200 newsContent">
  	<div class="newsType left">
  		<h1>资讯导航</h1>
  		<ul>
  			<li 
  			v-for="item in newsTypeList" 
  			:class="{active:item.type==newsTypeSel}" 
  			@click="changeTyep(item)"><span></span>{{item.name}}</li>
  		</ul>
  	</div>
  	<div class="newslist right">
  		<div class="listHead">
  			<span>资讯列表</span>
  			<div class="searchBox">
  				<input type="text" v-model="search" name="search" placeholder="请输入关键词" @keyup.enter="qurey">
		        <span class="searchText" @click="qurey">搜索</span>
		    </div>
		    <div class="clear"></div>
  		</div>
  		<ul class="infoList">
  			<li v-for="item in newsInfoTitleList" @click="goDetail(item)">{{item.title}}<span>{{formatTime(item.createTime)}}</span></li>
  		</ul>
  		<div class="myPage">
  			<Page :total="totalCount" 
			:current="current" 
			:pageSize="pageSize" 
			show-elevator show-total 
			@on-change="pageChange"></Page>
  		</div>
  	</div>
  	<div class="clear"></div>
  </div>
</template>


<script>
  import global_ from '@/components/Global'; 
  export default {
  	name:'NewsList',
  	data () {
	    return {
	    	newsTypeSel:1,
	    	search:'',
	    	newsTypeList:[],
	    	newsInfoTitleList:[],
	    	totalCount:10,
            current:1,
            pageSize:10,
            formatTime:global_.formatTime
	    }
	},
	methods:{
		changeTyep(item){
			this.newsTypeSel=item.type;
			this.getNewInfoList(1,this.newsTypeSel,this.search)
		},
		qurey(){
			this.getNewInfoList(1,this.newsTypeSel,this.search)
		},
		goDetail(item){
			this.$router.push({
                path:'/NewsDetail',
                query:{newsInfoId:item.newsInfoId,selType:item.type}
          }); 
		},
		getNewsTypeList(){
			this.$http.post('web/newsInfo/getType')
			.then((res)=>{
			if(res.status != 200){
			  this.$Message.error('请求失败请重试');
			}else{
			  let result = res.data;
			  if(result.status != 0){
			    this.$Message.error('请求资源失败，请重试');
			  }else{ 
			    if(result.data instanceof Array && result.data.length>0){
			      this.newsTypeList = result.data;
			      this.getNewInfoList(1,this.newsTypeSel,this.search)
			    }else{
			      this.newsTypeList = [];
			    }           
			  }
			} 
			})
			.catch((err)=>{
				alert(err);
			})
		},
        getNewInfoList(pidx,types,querys){
          this.$http.post('web/newsInfo/list.do',this.$qs.stringify({
            pageIndex:pidx||1,
            pageSize:10,
            type:types||1,
            queryParam:querys||''
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
              	this.totalCount=result.data.totalCount;
                this.current=result.data.currPage;
                this.pageSize=result.data.pageSize;
                if(result.data.list instanceof Array && result.data.list.length>0){
                  this.newsInfoTitleList = result.data.list;
                }else{
                  this.newsInfoTitleList = [];
                }           
              }
            }
          })
          .catch((err)=>{
            alert(err);
          })
        },
        pageChange(page){
            this.getNewInfoList(page,this.newsTypeSel,this.search)
        } 
	},
	created(){
		this.getNewsTypeList();
		if(this.$router.history.current.query.selType){
			this.newsTypeSel=this.$router.history.current.query.selType;
		}
	}
  }
</script>

<style scoped>
.newsContent{
	margin-top: 40px;
	margin-bottom: 60px;
}
.newsType{
	width: 240px;
	min-height: 240px;
	margin-right: 20px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: 1px solid #f3f3f3;
	padding-bottom: 20px;
}
.newsType h1{
	padding:30px 0 10px 60px;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 40px;
	color: #333333;
	border-bottom: 1px solid #f3f3f3;
}
.newsType li{
	margin:0 20px;
	line-height: 60px;
	font-size: 16px;
	font-weight: normal;
	font-stretch: normal;
	color: #666666;
	border-bottom: 1px solid #f3f3f3;
}
.newsType li>span{
	margin-left: 10px;
	margin-right: 25px;
	border-left: 2px solid transparent;
}
.newsType li.active{
	margin:0 5px;
	color: #47a2ff;
	box-shadow: 0px 6px 6px -4px rgba(0, 0, 0, 0.1);
}
.newsType li.active>span{
	margin-left: 25px;
	border-color: #47a2ff;
}
.newslist{
	width: 940px;
	padding: 30px 60px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: 1px solid #f3f3f3;
}
.listHead{
	border-bottom: 1px solid #f3f3f3;
}
.listHead>span{
	padding:15px 0 22px;
	font-size: 20px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 32px;
	letter-spacing: 0px;
	color: #666;
	border-bottom: 1px solid #666;
}
.searchBox{
	display: inline-block;
	width: 340px;
	margin-bottom: 10PX;
	float: right;
}
.searchBox input{
	width: 260px;
	height: 40px;
	box-sizing: border-box;
	padding-left: 20px;
	line-height: 40px;
	border: 1px solid #f3f3f3;
	border-radius: 4px 0 0 4px;
	float: left;
}
.searchText{
	display: inline-block;
    width: 75px;
    text-align: center;
    font-size: 16px;
	color: #fff;
    background-color: #2ba1fc;
    line-height: 40px;
    float: left;
    border-radius:0 4px 4px 0;
}
.infoList{
	margin-top: 20px;
	min-height: 500px;
	margin-bottom: 50px;
}
.infoList li{
	cursor: default;
	line-height: 50px;
	color:#666;
	font-size: 14px;
	clear: both;
}
.infoList li span{
	color:#999;
	float: right;
	margin-right: 40px;
}
.myPage{
	text-align: center;
}
</style>