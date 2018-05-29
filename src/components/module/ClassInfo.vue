<template>
	<div class="right-container">
		<p class="title">
			<a href="javascript:void(0);">班级信息</a> 
		</p>
		<ul class="teacherMessage">
			<li v-for="item of classList">
				<span>{{item.className}}</span>
				<span v-show="item.schoolId">{{item.schoolName}} 
					<Icon type="ios-checkmark-outline" color='#19be6b' size="20"></Icon>
				</span>
				<div class="edit" v-if="!item.schoolId">
					<p class="edit-title">
						<span>编辑</span> 
						<Icon type="arrow-down-b" color="#1caaf1"></Icon>
					</p>
					<div class="edit-content">
						<Poptip
					        confirm
					        title="是否要退出该班级?"
					        @on-ok="sureDel(item.classId)"
					        @on-cancel="cancelDel">
							<span class="editSpan">退出</span>
						</Poptip>
					</div>
				</div>
				<div class="edit font9" v-else>
					<p class="edit-title">
						<span>编辑</span> 
						<Icon type="arrow-down-b" color="#1caaf1"></Icon>
					</p>
				</div>
			</li>
		</ul>
		<p  class="addClass">
			<span @click="addClass">加入班级</span>
		</p>
		<Modal
        v-model="modal"
        title="加入班级"
        @on-ok="ok"
        @on-cancel="cancel">
        <div class="modalBox">
        	<input type="text" placeholder="请输入班级邀请码！" maxlength="15" v-model="classCode" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
        </div>
        <div slot="footer" style="text-align:center">
            <button class="saveBtn" @click="ok">保存</button>
        </div>
    </Modal>
	</div>
</template>
<script>
import global_ from '@/components/Global';
export default {
  	name:'ClassInfo',
    data () {
        return {
            token:this.$storage.getStorage("token") ,
            classList:[],
            modal:false,
            classCode:''
        }
	},
	methods:{
		ok(){
			if(!this.classCode){
                this.$Message.warning({
                    content: '请输入班级邀请码！',
                    duration: 2
                });
                return;
            }
            this.$http.post('/web/class/a/inviteToClass.do',this.$qs.stringify({
            	token:this.token,
            	classCode:this.classCode
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.modal = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		cancel() {
        	this.getClassList();
        },
        addClass(){
        	this.modal = true;
        	this.classCode = '';
        },
		getClassList(){
			this.$http.post('web/class/a/listMyJoinClass.do',this.$qs.stringify({
              token:this.token
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data.list instanceof Array && result.data.list.length>0){
                        this.classList = result.data.list;
                    }else{
                        this.classList = [ {
					        "masterId": 11249,
					        "code": "1568251830",
					        "password":'123456',
					        "gradeId": 12,
					        "period": 1,
					        "schoolId": 251830,
					        "userId": 11249,
					        "classId": 568,
					        "schoolName": "XX市第二十中学",
					        "className": "2019级高三16"
					      }];
                    }
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		}, 
        cancelDel(){

        },
		sureDel(item){
    		this.exitClass(item);
        },
        exitClass (cId) {
        	this.$http.post("web/class/a/exitClass.do",this.$qs.stringify({
              token:this.token,
              classId:cId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.getClassList(this.nowId);
              	this.$Message.success(result.message);  
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
	},
	created(){
		this.getClassList()
	}
}
</script>
<style scoped>
	.right-container{
        float: left;
		width: 940px;
        min-height: 560px;
		margin-left: 20px;
        padding: 40px 60px 40px 60px;
		background-color: #fff;
        border: 1px solid #e9e9e9;
	}
	.right-container .title{
		border-bottom: 1px solid #e9e9e9; 
	}
	.right-container .title a{
		display: inline-block;
		text-decoration: none;
		font-size: 20px;
		color: #666666;
		padding-bottom: 20px;
		border-bottom: 1px solid #000; 
	}
	.teacherMessage li:first-child{
		margin-top: 40px;
	}
	.teacherMessage li{
		position: relative;
		height: 80px;
		line-height: 40px;
		padding: 20px 40px 20px 20px;
		color: #666;
		font-size: 14px;
		border: 1px solid #e9e9e9;
		margin-top: 20px;
		border-radius: 4px;
	}
	
 .edit{
    position: absolute;
    right: 20px;
    top:20px;
}		
 .edit-content{
    position: absolute;
    right: -40px;
    top: 40px;	
    z-index: 999;	
    width: 120px;	
    padding: 0 10px;	
    background-color: #fff;
    border: 1px solid #e9e9e9;
    box-shadow: 0px 5px 7px 0px rgba(51,59,67,.1);
    text-align: center;	
    color: #50a7ff;	
    display: none;
}
.font9{
	color:#999!important;
}
.edit-content .ivu-poptip{
    text-align: left;
}
 .edit-content>span,.editSpan{
    display: block;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
    padding: 0px 20px;
    border-bottom:1px solid #e9e9e9!important;		
}
 .edit-content span:last-child{
    border:none;		
}
 .edit:hover .edit-content{
    display: block;
}
.addClass{
	margin-top: 30px;
	margin-left: 20px;
}
.addClass span{
	font-size: 14px;
	line-height: 24px;
	color: #50a7ff;
	cursor: pointer;
}
.modalBox{
	padding: 20px;
	text-align: center;
}
.modalBox input{
	width: 350px;
	height: 40px;
	padding-left: 15px;
	line-height: 40px;
	border:1px solid #e9e9e9;
	border-radius: 4px;
}
.saveBtn{
	width: 160px;
	height: 40px;
	line-height: 40px;
	background-color: #50a7ff;
	border-radius: 5px;
	font-size: 16px;
	color:#fff;
	outline: none;
	border:none;
}
</style>

