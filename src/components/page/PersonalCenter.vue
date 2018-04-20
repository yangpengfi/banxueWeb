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
                {title:'修改密码',path:'/MySpace/PersonalCenter/ChangePassword',id:'changePassword'},   
                {title:'任教信息',path:'/MySpace/PersonalCenter/TeacherMessage',id:'teacherMessage'},   
                {title:'申请成为认证老师',path:'/MySpace/PersonalCenter/Teacher',id:'teacher'},   
                {title:'访问权限',path:'/MySpace/PersonalCenter/Authority',id:'authority'}
            ],
            nowId:'personInfo'
        }
    },
    methods:{
        changeTitle(item){  
            this.nowId=item.id; 			
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


