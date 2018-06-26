<template>
    <div class="content">
        <Left :leftList="personInfoList"></Left> 
		<router-view></router-view>
    </div>
</template>
<script>
import Left from '@/components/common/Left.vue';
export default {
	name:'PersonalCenter',
	components:{
		Left
    },
    data(){
        return {
            personInfoList:[
                {title:'个人资料',path:'/MySpace/PersonalCenter/',id:'personInfo'},   
                {title:'修改密码',path:'/MySpace/PersonalCenter/ChangePassword',id:'ChangePassword'},   
                {title:'任教信息',path:'/MySpace/PersonalCenter/TeacherMessage',id:'TeacherMessage'},   
                {title:'申请成为认证老师',path:'/MySpace/PersonalCenter/Teacher',id:'Teacher'},   
                {title:'访问权限',path:'/MySpace/PersonalCenter/Authority',id:'Authority'}
            ]
        }
    },
    created(){
        let userType=this.$storage.getStorage('userInfo').type;
        if(userType==2){
            this.personInfoList=[
                {title:'个人资料',path:'/MySpace/PersonalCenter/PersonInfoStudent',id:'PersonInfoStudent'},   
                {title:'班级信息',path:'/MySpace/PersonalCenter/ClassInfo',id:'ClassInfo'},   
                {title:'修改密码',path:'/MySpace/PersonalCenter/ChangePassword',id:'ChangePassword'},   
                {title:'访问权限',path:'/MySpace/PersonalCenter/Authority',id:'Authority'}
            ]
        }
    }    
}
</script>
<style scoped>
    .content{
		width: 1200px;		
		padding-top: 30px;
		margin: auto;
		overflow: hidden;
		margin-bottom: 60px;
	}	
</style>


