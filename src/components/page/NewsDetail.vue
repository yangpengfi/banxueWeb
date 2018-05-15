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
  			<h1 :title="newsInfo.title">{{newsInfo.title}}</h1>
		    <p>
		    	<span>发布时间：{{new Date(newsInfo.createTime).Format("yyyy-M-d hh:mm:ss")}}</span>
		    	<span>栏目：{{newsInfo.typeStr}}</span>
		    	<span>来源：{{newsInfo.nFrom}}</span>
		    </p>
  		</div>
  		<p v-html="newsInfo.content"></p>
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
	    	newsTypeList:[],
	    	newsInfo:{},
            formatTime:global_.formatTime
	    }
	},
	methods:{
		changeTyep(item){
			this.newsTypeSel=item.type;
			this.$router.push({
                path:'/NewsList',
                query:{selType:item.type}
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
        getNewInfo(newsId){
          this.$http.post('/web/newsInfo/info.do',this.$qs.stringify({
            newsInfoId:newsId,
          }))
          .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
              	this.newsInfo = result.data;
              }
            }
          })
          .catch((err)=>{
            alert(err);
          })
        }
	},
	created(){
		this.getNewsTypeList();
		let newsId=this.$router.history.current.query.newsInfoId;
		this.newsTypeSel=this.$router.history.current.query.selType;
		this.getNewInfo(newsId)
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
	min-height: 673px;
	padding: 30px 60px;
	box-sizing: border-box;
	background-color: #fff;
	border-bottom: 1px solid #f3f3f3;
}
.newslist>p{
	margin-top: 20px;
	text-indent: 2em;
}
.newslist img{
	max-width: 100%;
}
.listHead{
	text-align: center;
	border-bottom: 1px solid #f3f3f3;
}
.listHead h1{
	margin:0 auto;
	max-width: 750px;
	font-size: 20px;
	font-weight: normal;
	line-height: 32px;
	color: #333333;
	overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.listHead span{
	font-size: 12px;
	font-weight: normal;
	font-stretch: normal;
	line-height: 32px;
	margin-right: 20px;
	color: #999;
}
</style>