<template>	
	<div id="right-resource">
		<div class="right-title">
			<div>		
				<Select v-model="models.parentClass" class="left select-box" size="large" @on-change="changeClass(models.parentClass)">
					<Option value="0" selected>全部班级</Option>
					<Option v-for="item in classList" :value="item.classId" :key="item.classId">{{ item.gradeName + item.className}}</Option>
				</Select>	
				<input v-model="name" placeholder="请输入资源名称" class="left search" @keyup.enter="searchResource"/>
				<button class="left" @click="searchResource">搜索</button>
			</div>
		</div>		
		<ul class="resourceCont" v-if="resourceList.length>0">
			<li v-for="item of resourceList">
				<div>
					<img :src="item.fileSuffix | fillType"/>				
					<div class="doc-content">
						<p class="doc-title">
							<span>{{item.resourceName}}</span> 							
						</p>
						<div class="sub-title">
							<span>{{item.periodName}}</span>
							<span>{{item.subjectName}}</span>
							<span>{{item.toClassName}}</span>
							<span class="upTime">上传时间：{{item.createTime | formatTime}}</span>
						</div>						
					</div>	
				</div>									
			</li>
		</ul>
		<Page :total="totalCount" :current="params.pageIndex" show-elevator show-total v-if="resourceList.length>0" @on-change="changePage"></Page>	
	</div>
</template>
<script>
import qs from "qs"
export default {
  	name:'PushResource',
  	data(){
	  	return {
			models:{
				parentClass:'0',
			},						
			totalCount:'',
			name:'',
			params:{				
				pageIndex:1,
				pageSize:10,
				token:this.$storage.getStorage("token")
			},
			periodId:0,
			subjectId:0,			
			classList:[],
			resourceList:[],
			msg:{
				reqError:'请求失败请重试',
				resError:'请求资源失败，请重试'
			}
	  	}
	},
	filters: {
		fillType: function (value) {
			if (!value){ return ''}
			if(value == 'doc'|| value == 'docx'){
				value = './static/imgs/resource/fileDoc.png'
			}else if(value == 'ppt'|| value == 'pptx'){
				value = './static/imgs/resource/filePpt.png'
			}else if(value == 'xls' || value == 'xlsx'){
				value = './static/imgs/resource/fileXls.png'
			}else if(value == 'pdf'){
				value = './static/imgs/resource/filePdf.png'
			}else if(value == 'jpg'){
				value = './static/imgs/resource/fileJpg.png'
			}else if(value == 'png'){
				value = './static/imgs/resource/filePng.png'
			}else if(value == 'mp3'){
				value = './static/imgs/resource/fileMp3.png'
			}else if(value == 'avi'||value == 'rmvb'||value == 'mp4'){
				value = './static/imgs/resource/fileVideo.png'
			}else if(value == 'zip'){
				value = './static/imgs/resource/fileZip.png'
			}else if(value == 'rar'){
				value = './static/imgs/resource/fileRar.png'
			}else if(value == 'txt'){
				value = './static/imgs/resource/fileTxt.png'
			}else{
				value = './static/imgs/resource/fileunkonw.png'
			}
			return value;
		},
		formatTime:function (input) {
			var d = new Date(input);
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			var day = d.getDate();
			// var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
			// var hour = d.getHours();
			// var minutes = d.getMinutes();
			// var seconds = d.getSeconds();
			return  year+ '-' + month + '-' + day;
		}
	},
	methods:{
		getPushResource(){
			this.$http.post('/web/class/a/listJoinClassInfo.do',qs.stringify({
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{
						this.classList = result.data;
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
		},
		getResourceList(){
			this.$http.post('/web/coursebook/a/listResourcePushToMe.do',qs.stringify({
				name:this.name,
				classId:this.models.parentClass,
				pageIndex:this.params.pageIndex,
				pageSize:this.params.pageSize,
				token:this.params.token
			})).then(res => {	
				if(res.status != 200){
					this.$Message.error(this.msg.reqError);
				}else{
					let result = res.data;
					if(result.status != 0){
						this.$Message.error(this.msg.resError);
					}else{						
						if(result.data.list instanceof Array && result.data.list.length>0){
							this.resourceList = result.data.list;
							this.totalCount = result.data.totalCount;
						}else{
							this.resourceList = [];
						}
					}
				}			
				
			}).catch(function (error) {
				alert(error);
			});
		},
		searchResource(){	
			if(this.name.trim() == ''){
				this.name = '';
			}
			this.params.pageIndex = 1;
			this.getResourceList();
		},
		changePage(page){				
			this.params.pageIndex = page;
			this.getResourceList();
		},
		changeClass(value){
			this.models.parentClass = value;			
			this.params.pageIndex = 1;
			this.getResourceList();
		}
	},
	created:function(){  	
		this.getPushResource();	
		this.getResourceList();
    },
}
</script>
<style scoped>
#right-resource .right-title{
	border-bottom: none;
}
.select-box{
	width: 220px;
	height: 40px;
	margin-right: 10px;	
	margin-top: 2px;
}
</style>

