<template>
	<div class="right-container">
		<div v-show="!addGroup">
			<p class="title">
				<a href="javascript:void(0);">任教信息</a> 
				<span class="addClass" @click="addClass">加入班级</span>
			</p>
			<ul class="teacherMessage">
				<li v-for="item of teachList">
					<p>
						<span>{{item.className}}</span>
						<span v-show="item.schoolId">{{item.schoolName}} 
							<Icon type="ios-checkmark-outline" color='#19be6b' size="20"></Icon>
						</span>
						<span class="ml30" v-show="item.schoolId">班级机顶盒账号:<b>{{item.code}}</b></span>
						<span class="ml30" v-show="!item.schoolId">班级码:<b>{{item.code}}</b></span>
						<span class="ml30" v-show="item.schoolId">班级密码:<b>{{item.password}}</b></span>
					</p>
					<p>
						<span>任教学科:</span>
						<span>{{item.subjectName}}</span>
					</p>
					<div class="edit" v-if="!item.schoolId">
						<p class="edit-title">
							<span>编辑</span> 
							<Icon type="arrow-down-b" color="#1caaf1"></Icon>
						</p>
						<div class="edit-content">
							<span @click="addGroupFun(item.classId)">学生分组</span>
							<span @click="editClass(item)">编辑</span>
							<span v-show="item.userId==item.masterId" @click="upgradeClass(item.classId)">升级</span>
							<span v-show="item.userId==item.masterId" @click="transferClass(item.classId)">转让</span>
							<span v-show="item.userId==item.masterId" @click="dismissClass(item.classId)">解散</span>
							<Poptip v-show="item.userId!=item.masterId"
						        confirm
						        title="是否要退出该班级?"
						        @on-ok="sureDel(item.classId)"
						        @on-cancel="cancelDel">
								<span class="editSpan">退出</span>
							</Poptip>
						</div>
					</div>
					<div class="edit" v-else>
						<p class="edit-title">
							<span>编辑</span> 
							<Icon type="arrow-down-b" color="#1caaf1"></Icon>
						</p>
						<div class="edit-content">
							<span @click="addGroupFun(item.classId)">学生分组</span>
							<span @click="updatePwd(item.classId)" v-show="item.userId==item.masterId">修改班级密码</span>
						</div>
					</div>
				</li>
			</ul>
			<Modal
	        v-model="modal"
	        title="加入班级"
	        @on-ok="ok"
	        @on-cancel="cancel">
		        <div class="editBox">
		        	<p class="marginB">
			        	<span>班级码:</span>
		        		<input type="text" placeholder="请输入班级码！" maxlength="15" v-model="classCode" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}">
		        	</p>
		        	<p>
			        	<span class="absolute"><i style="color:red">*</i> 任教学科:</span>
			        	<ul>
			        		<li v-for="item in classNameAndSubject.subjects">
			        			<span>{{item.subjectName}}</span>&nbsp;
			        			<span @click="delSubject(item.subjectId)">
			        				<Icon type="ios-minus" size="20px" color="red"></Icon>
			        			</span>
			        		</li>
			        	</ul>
		        	</p>
		        	<p class="addBtn" @click="addSubject()">继续添加</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="ok">保存</button>
		        </div>
	        </Modal>
			<Modal
	        v-model="modal1"
	        title="修改班级密码"
	        @on-ok="ok1"
	        @on-cancel="cancel">
		        <div class="modalBox">
		        	<input type="text" placeholder="请输入新密码！" maxlength="15" v-model="password">
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="ok1">保存</button>
		        </div>
		    </Modal>
			<Modal
	        v-model="edit"
	        title="编辑"
	        @on-ok="editOk"
	        @on-cancel="cancel">
		        <div class="editBox">
		        	<p v-show='userInfo.id==classNameAndSubject.masterId' class="marginB">
			        	<span>班级名称:</span>
			        	<input type="text" placeholder="请输入班级名称！" maxlength="30" v-model="classNameAndSubject.className">
		        	</p>
		        	<p>
			        	<span class="absolute">任教学科:</span>
			        	<ul>
			        		<li v-for="item in classNameAndSubject.subjects">
			        			<span>{{item.subjectName}}</span>&nbsp;
			        			<span @click="delSubject(item.subjectId)">
			        				<Icon type="ios-minus" size="20px" color="red"></Icon>
			        			</span>
			        		</li>
			        	</ul>
		        	</p>
		        	<p class="addBtn" @click="addSubject(classNameAndSubject.classId)">添加</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="editOk">保存</button>
		        </div>
		    </Modal>
			<Modal
	        v-model="add"
	        title="添加"
	        @on-ok="addOk"
	        @on-cancel="cancel">
		        <div class="modalBox">
		        	<p class="marginB">
		        		<span>所授学科</span>
		        		<select v-model="subjectId">
		        			<option v-for="item in subjectList" :value="item.subjectId">{{item.subjectName}}</option>
		        		</select>
		        	</p>
		        	<p class="marginB">
		        		<span>任教教材</span>
		        		<select v-model="versionId">
		        			<option v-for="item in versionList" :value="item.id">{{item.name}}</option>
		        		</select>
		        	</p>
		        	<p>
		        		<span>任教册别</span>
		        		<select v-model="textbookId">
		        			<option v-for="item in textbookList" :value="item.id">{{item.name}}</option>
		        		</select>
		        	</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="addOk">保存</button>
		        </div>
		    </Modal>
			<Modal
	        v-model="upgrade"
	        title="提示"
	        @on-ok="upgradeOk"
	        @on-cancel="cancel">
		        <div class="dismissBox">
		        	<p>是否升级该班级？升级后不可降级</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="upgradeOk">确定</button>
		        </div>
		    </Modal>
			<Modal
	        v-model="transfer"
	        title="转让"
	        @on-ok="transferOk"
	        @on-cancel="transfercancel">
		        <div class="dismissBox">
		        	 <Table highlight-row border @on-current-change="selectRow" ref="currentRowTable" :columns="columns" :data="classTeacher"></Table>
		        </div>
		        <div slot="footer" style="text-align:center">
		        	<Poptip v-show="toUserId"
				        confirm
				        :title="toUserTip"
				        @on-ok="transferOk"
				        @on-cancel="cancelDel">
						<button class="saveBtn">确定</button>
					</Poptip>
		        </div>
		    </Modal>
			<Modal
	        v-model="dismiss"
	        title="提示"
	        @on-ok="dismissOk"
	        @on-cancel="cancel">
		        <div class="dismissBox">
		        	<h4>确认解散该班级？</h4>
		        	<p>解散班级将解除班级所有成员关系，作业、错题、资源等学习记录保留!</p>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="dismissOk">确定</button>
		        </div>
		    </Modal>
	    </div>
	    <div v-show="addGroup">
	    	<p class="groupTitle">
	    		<span>所授学科：</span>
	    		<select v-model="subjectsTaughtId">
	    			<option v-for="item in classNameAndSubject.subjects" :value="item.subjectId">{{item.subjectName}}</option>
	    		</select>
	    		<span @click="back" class="backBtn">返回</span>
	    	</p>
    		<span class="addGroupBtn" @click="addClassGroup">添加分组</span>
	    	
	    	<ul class="groupList">
	    		<li v-for="item in groupList">
	    			<span>{{item.groupName}}</span>
	    			<span>{{item.userName}}</span>
	    			<span class="groupBtn">
	    				<span class="mr20" @click="editClassGroup(item.groupId)">编辑</span>
	    				<span @click="delClassGroup(item.groupId)">删除</span>
	    			</span>
	    		</li>
	    	</ul>
	    	<Modal
	        v-model="addGroupModal"
	        title="添加分组"
	        @on-ok="addGroupOk"
	        @on-cancel="cancel">
		        <div class="modalBox">
		        	<p class="marginB">
			        	<span>分组名称:</span>
			        	<input type="text" placeholder="请输入分组名称！" maxlength="30" v-model="classGroupInfo.groupName">
		        	</p>
		        	<Transfer
		        		:titles="['选择学生', '已选学生']"
				        :data="notInGroupList"
				        :target-keys="userIds"
				        @on-change="handleChange2"></Transfer>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="addGroupOk">确定</button>
		        </div>
		    </Modal>
	    	<Modal
	        v-model="editGroupModal"
	        title="编辑"
	        @on-ok="editGroupOk"
	        @on-cancel="cancel">
		        <div class="modalBox">
		        	<p class="marginB">
			        	<span>分组名称:</span>
			        	<input type="text" placeholder="请输入分组名称！" maxlength="30" v-model="classGroupInfo.groupName">
		        	</p>
		        	<Transfer
		        		:titles="['选择学生', '已选学生']"
				        :data="notInGroupList"
				        :target-keys="userIds"
				        @on-change="handleChange2"></Transfer>
		        </div>
		        <div slot="footer" style="text-align:center">
		            <button class="saveBtn" @click="editGroupOk">确定</button>
		        </div>
		    </Modal>
	    </div>
	</div>
</template>
<script>
export default {
	name:'TeacherMessage',
	data(){
		return{
			teachList:[],
			classNameAndSubject:{},
			classTeacher:[],
			columns:[
				{
                    type: 'index',
                    width: 80,
                    align: 'center',
                    title:"序号"
                },
                {
                    title: '老师',
                    key: 'userName',
                    align: 'center'
                },
                {
                    title: '任教学科',
                    key: 'subject',
                    align: 'center'
                }
			],
			userInfo:this.$storage.getStorage("userInfo"),
			token:this.$storage.getStorage("token") ,
            isMaster:false,
            modal:false,
            modal1:false,
            edit:false,
            add:false,
            upgrade:false,
            transfer:false,
            dismiss:false,
            classCode:'',
            password:'',
            toUserId:0,
            toUserTip:'',
            classId:0,
            subjectId:0,
            subjectList:[],
            versionId:0,
            versionList:[],
            textbookId:0,
            textbookList:[],
            addGroup:false,
            groupList:[],
            notInGroupList:[],
            userIds:[],
            classGroupInfo:{},
            subjectsTaughtId:0,
            addGroupModal:false,
            editGroupModal:false,
            groupId:0,
		}
	},
    watch:{
        subjectId: 'filterVer', //获取对应学科的下拉列表
        versionId:'filterText',
        subjectsTaughtId:'filterTaugh',
        classCode:'clearList',
    },
	methods:{
		filterVer(){
			this.versionId=0;
            this.versionList=[];
            this.textbookId=0;
            this.textbookList=[];
			if(this.subjectId!=0){
				this.getVersionList(this.subjectId);
			}
		},
		filterText(){
            this.textbookId=0;
            this.textbookList=[];
			if(this.versionId!=0){
				this.getTextbookList(this.subjectId,this.versionId);
			}
		},
		filterTaugh(){
			this.userIds=[];
            this.getClassGroupList();
		},
		clearList(news,olds){
			if(!news){
				this.classNameAndSubject={};
			}
		},
		ok(){
			if(!this.classCode){
                this.$Message.warning({
                    content: '请输入班级邀请码！',
                    duration: 2
                });
                return;
            }else if(!this.classNameAndSubject.subjects){
            	this.$Message.warning({
                    content: '请选择所授学科！',
                    duration: 2
                });
                return;
            }
            console.log(this.classNameAndSubject)
            this.$http.post('/web/class/a/inviteToClass.do',this.$qs.stringify({
            	token:this.token,
            	classCode:this.classCode,
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
		ok1(){
			if(!this.password){
                this.$Message.warning({
                    content: '请输入新密码！',
                    duration: 2
                });
                return;
            }
            this.$http.post('web/class/a/updateClassPwd.do',this.$qs.stringify({
            	token:this.token,
            	password:this.password,
            	classId:this.classId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.modal1 = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		editOk(){
			if(!this.classNameAndSubject.className){
                this.$Message.warning({
                    content: '请输入班级名称！',
                    duration: 2
                });
                return;
            }
            this.$http.post('web/class/a/updateClassName.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId,
            	className:this.classNameAndSubject.className,
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.edit = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		addOk(){
			if(!this.subjectId){
                this.$Message.warning({
                    content: '请选择学科！',
                    duration: 2
                });
                return;
            }else if(!this.versionId){
            	this.$Message.warning({
                    content: '请选择版本！',
                    duration: 2
                });
                return;
            }else if(!this.textbookId){
            	this.$Message.warning({
                    content: '请选择册别！',
                    duration: 2
                });
                return;
            }
            this.$http.post('web/class/a/addTeachSubject.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId,
            	subjectId:this.subjectId,
            	versionId:this.versionId,
            	textbookId:this.textbookId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassNameAndSubject(this.classId);
	                this.add = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		upgradeOk(){
            this.$http.post('web/class/a/upgradeClass.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.upgrade = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		transferOk(){
            this.$http.post('web/class/a/transferClass.do',this.$qs.stringify({
            	token:this.token,
            	toUserId:this.toUserId,
            	classId:this.classId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.transfer = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		dismissOk(){
            this.$http.post('web/class/a/deleteClass.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassList();
	                this.dismiss = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		addGroupOk(){
			if(!this.classGroupInfo.groupName){
                this.$Message.warning({
                    content: '请输入分组名称！',
                    duration: 2
                });
                return;
            }
            var _versionId=this.classNameAndSubject.svtJson[this.subjectsTaughtId].versionId;
            var _textbookId=this.classNameAndSubject.svtJson[this.subjectsTaughtId].textbookId;
            this.$http.post('web/class/a/createClassGroup.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId,
            	subjectId:this.subjectsTaughtId,
            	versionId:_versionId,
            	textbookId:_textbookId,
            	groupName:this.classGroupInfo.groupName,
            	userIds:JSON.stringify(this.userIds),
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassGroupList();
	                this.addGroupModal = false;
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
		},
		editGroupOk(){
			if(!this.classGroupInfo.groupName){
                this.$Message.warning({
                    content: '请输入分组名称！',
                    duration: 2
                });
                return;
            }
            this.$http.post('web/class/a/updateClassGroup.do',this.$qs.stringify({
            	token:this.token,
            	groupId:this.groupId,
            	groupName:this.classGroupInfo.groupName,
            	userIds:JSON.stringify(this.userIds),
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassGroupList();
	                this.editGroupModal = false;
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
		transfercancel() {
			this.$refs.currentRowTable.clearCurrentRow();
        	this.getClassList();
        },
        addClass(){
        	this.modal = true;
        	this.classCode = "";
        	this.classNameAndSubject={}
        },
        updatePwd(classId){//修改班级密码
        	this.classId=classId;
        	this.modal1 = true;
        	this.password = "";
        },
        editClass(item){//编辑班级
        	this.classId=item.classId;
        	this.edit = true;
        	this.getClassNameAndSubject(item.classId);
        },
        addSubject(classId){//添加学科
        	if(!classId){
        		this.getClassId();
        	}else{
    			this.subjectId=0;
	        	this.classId=classId;
	        	this.add = true;
	        	this.getSubjectList(classId);
        	}
        },
        upgradeClass(classId){//升级班级
        	this.classId=classId;
        	this.upgrade = true;
        },
        transferClass(classId){//转让班级
        	this.classId=classId;
        	this.transfer = true;
        	this.getClassTeacher(classId);
        },
        selectRow(currentRow,oldCurrentRow){
        	if(currentRow){
	        	this.toUserId=currentRow.userId;
	        	this.toUserTip='确认将该班级转让给'+currentRow.userName+'？转让后'+currentRow.userName+'将成为班主任';
        	}else{
        		this.toUserId=0;
        		this.toUserTip='';
        	}
        },
        dismissClass(classId){//解散班级
        	this.classId=classId;
        	this.dismiss = true;
        },
		getClassId(){
			this.$http.post('web/class/a/getByClassCode.do',this.$qs.stringify({
			  token:this.token,
              classCode:this.classCode
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	this.subjectId=0;
              	this.classId=result.data.classId;
              	this.getSubjectList(this.classId);
              	this.getClassNameAndSubject(this.classId);
	        	this.add = true;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
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
                        this.teachList = result.data.list;
                    }else{
                        this.teachList = [];
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
		getSubjectList(cId){
			this.$http.post('web/class/listSubject.do',this.$qs.stringify({
              classId:cId||0
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data instanceof Array && result.data.length>0){
                        this.subjectList = result.data;
                    }else{
                        this.subjectList = [];
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
		getVersionList(sId){
			this.$http.post('web/class/listVersion.do',this.$qs.stringify({
              classId:this.classId,
              subjectId:sId,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data instanceof Array && result.data.length>0){
                        this.versionList = result.data;
                    }else{
                        this.versionList = [];
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
		getTextbookList(sId,vId){
			this.$http.post('web/class/listTextbook.do',this.$qs.stringify({
              classId:this.classId,
              subjectId:sId,
              versionId:vId,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data instanceof Array && result.data.length>0){
                        this.textbookList = result.data;
                    }else{
                        this.textbookList = [];
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
		getClassTeacher(cId){
			this.$http.post('/web/class/a/listTeacherByClassId.do',this.$qs.stringify({
              token:this.token,
              classId:cId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data.list instanceof Array && result.data.list.length>0){
                        this.classTeacher = result.data.list;
                    }else{
                        this.classTeacher = [];
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
		getClassNameAndSubject(cId){
			this.$http.post('web/class/a/getClassNameAndSubject.do',this.$qs.stringify({
              token:this.token,
              classId:cId
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.classNameAndSubject = result.data;
                if(result.data.subjects instanceof Array && result.data.subjects.length>0){
                    this.subjectsTaughtId=result.data.subjects[0].subjectId;
                }else{
                    this.subjectsTaughtId = 0;
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
        cancelDel(){},
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
        delSubject(sId){
        	this.$http.post('web/class/a/removeTeachSubject.do',this.$qs.stringify({
            	token:this.token,
            	classId:this.classId,
            	id:sId
            }))
            .then((res)=>{
	            if(res.data.status==0){
	                this.$Message.success({
	                    content: res.data.message,
	                    duration: 2
	                });
	                this.getClassNameAndSubject(this.classId);
	            }else{
	            	this.$Message.error(res.data.message);
	            }
            })
            .catch((err)=>{
                alert(err);
            })
        },
        addGroupFun(classId){
        	this.classId=classId;
        	this.addGroup=true;
        	this.getClassGroupList(classId);
        	this.getClassNameAndSubject(classId);
        },
        getClassGroupList(cId){
			this.$http.post('/web/class/a/listClassGroup.do',this.$qs.stringify({
              token:this.token,
              subjectId:this.subjectsTaughtId,
              classId:cId||this.classId,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data instanceof Array && result.data.length>0){
                        this.groupList = result.data;
                    }else{
                        this.groupList = [];
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
        getNotInGroupList(cId,gId){
        	 var _versionId=this.classNameAndSubject.svtJson[this.subjectsTaughtId].versionId;
            var _textbookId=this.classNameAndSubject.svtJson[this.subjectsTaughtId].textbookId;
			this.$http.post('web/class/classUserNotInGroup.do',this.$qs.stringify({
              classId:cId,
              subjectId:this.subjectsTaughtId,
              versionId:_versionId,
              textbookId:_textbookId,
              groupId:gId||0,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
              	  if(result.data instanceof Array && result.data.length>0){
              	  		for(let i=0,len=result.data.length;i<len;i++){
              	  			if(!result.data[i].label){
              	  				result.data[i].label="未知"
              	  			}
              	  		}
                        this.notInGroupList = result.data;
                        console.log(this.notInGroupList)
                    }else{
                        this.notInGroupList = [];
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
        getClassGroupInfo(gId){
			this.$http.post('/web/class/a/classGroupInfo.do',this.$qs.stringify({
              token:this.token,
              groupId:gId,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                    this.classGroupInfo = result.data;
                    this.userIds=result.data.userIds;
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		},
        delClassGroup(gId){
			this.$http.post('web/class/a/deleteClassGroup.do',this.$qs.stringify({
              token:this.token,
              groupId:gId,
            }))
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status == 0){
                this.$Message.success(result.message); 
                this.getClassGroupList(this.classId);
              }else{ 
                this.$Message.error(result.message);      
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
		},
		addClassGroup(){
			this.userIds=[];
			this.classGroupInfo.groupName='';
			this.addGroupModal=true;
			this.getNotInGroupList(this.classId);
		},
		editClassGroup(gId){
			this.userIds=[];
			this.groupId=gId;
			this.editGroupModal=true;
			this.getNotInGroupList(this.classId,gId);
			this.getClassGroupInfo(gId);
		},
		back(){
			this.addGroup=false;
		},
		handleChange2 (newTargetKeys) {
            this.userIds = newTargetKeys;
        }
	},
	created(){
		this.getClassList();
	}
}
</script>

<style scoped>
	.right-container{
        float: left;
		width: 940px;
        min-height: 560px;
		margin-left: 20px;
        padding: 40px 60px 150px 60px;
        border: 1px solid #e9e9e9;
        background-color: #fff;
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
	.ml30{
		margin-left: 50px;
	}
	.ml30 b{
		font-weight: normal;
	}
	.mr20{
		margin-right: 20px;
	}
	.teacherMessage li{
		position: relative;
		min-height: 80px;
		line-height: 40px;
		padding: 20px 40px 20px 20px;
		color: #666;
		font-size: 14px;
		border: 1px solid #e9e9e9;
		margin-top: 20px;
	}
	.teacherMessage li p{
		line-height: 24px;
	}
	.edit{
	    position: absolute;
	    right: 20px;
	    top:20px;
	}		
	 .edit-content{
	    position: absolute;
	    right: -60px;
	    top: 25px;	
	    z-index: 999;	
	    width: 150px;	
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
	.ivu-poptip{
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
		display: inline-block;
	    float: right;
	    height: 30px;
	    line-height: 30px;
	    border: 1px solid #50a7ff;
	    color: #50a7ff;
	    border-radius: 4px;
	    padding: 0 25px;
	    cursor: pointer;
	}
	.editBox{
		margin-left: 20px;
		color:#666;
		font-size: 16px;
	}
	.editBox ul{
		margin-left: 80px;
	}
	.editBox .addBtn{
		cursor: pointer;
		width: 65px;
		height: 30px;
	    line-height: 30px;
	    margin-left: 80px;
	    color: #50a7ff;
	    margin-top: 20px;
	}
	.editBox .absolute{
		position: absolute;
	}
	.modalBox,.dismissBox{
		padding: 20px;
		text-align: center;
	}
	.modalBox input,.editBox input,.modalBox select{
		width: 330px;
		height: 40px;
		padding-left: 15px;
		line-height: 40px;
		border:1px solid #e9e9e9;
		border-radius: 4px;
		color:#666;
	}
	.modalBox span{
		display: inline-block;
		width: 80px;
	}
	.modalBox .ivu-transfer{
		text-align: left;
	}
	.marginB{
		margin-bottom: 20px;
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
	.dismissBox h4{
		font-weight: normal;
		color:#333;
	}
	.dismissBox p{
		margin-top: 20px;
		color:#999;
		text-indent: 2em;
	}
	.groupTitle{
		color:#666;
	}
	.groupTitle select{
		width: 200px;
		height: 30px;
		line-height: 30px;
		border:1px solid #e9e9e9;
		border-radius: 4px;
	}
	.groupTitle .backBtn{
		display: inline-block;
		width: 65px;
		text-align: center;
		line-height: 30px;
		border-radius: 4px;
		border:1px solid #1caaf1;
		color: #1caaf1;
		float: right;
		cursor: pointer;
	}
	.addGroupBtn{
		color:#1caaf1;
		line-height: 60px;
		cursor: pointer;
		font-size: 16px;
	}
	.groupList{
		border:1px solid #e9e9e9;
	}
	.groupList li{
		width: 100%;
		border-bottom: 1px solid #e9e9e9;
	}
	.groupList li:last-child{
		border-bottom-width: 0;
	}
	.groupList li>span{
		display: inline-block;
		box-sizing: border-box;
		line-height: 40px;
		border-right:1px solid #e9e9e9;
	}
	.groupList li>span:first-child{
		width: 10%;
		text-align: center;
	}
	.groupList li>span:nth-child(2){
		width: 79%;
	}
	.groupList li>span:last-child{
		width: 10%;
		border-right-width:0;
		text-align: center;
	}
	.groupList .groupBtn{
		color:#1caaf1;
		cursor: pointer;
	}
</style>
	
