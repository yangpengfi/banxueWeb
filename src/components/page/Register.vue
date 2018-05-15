<template>
    <div id="register">
        <div id="header-container">
            <div id="header" class="w-1200">    
                <div class="left">
                    <div class="logo">
                        <img src="../../assets/imgs/index/u124.png" alt="这是logo图片">
                    </div>        
                    <div class="title">
                        <div>伴学网教育云平台</div>
                        <p>专注中小学个性化教育</p>
                    </div>
                    <h2 class="free-register">免费注册</h2>
                </div> 
            </div>
        </div> 
        <section id="section" class="w-1200">
            <p class="register-title">
                <span v-for="item of titleList" @click="changeTitle(item)" :class="{active:item.id==localTitle}">{{item.title}}</span>
            </p>
            <router-view></router-view>
        </section>
        <v-foot></v-foot>
  </div>
</template>
<script>
import vFoot from '@/components/common/Footer'; 
export default {
    name:'Register',
    components:{
        vFoot
    },
    data(){
        return {
            localTitle:1,
            titleList:[
                {id:1,title:'我是老师',path:'/Register/'},
                {id:2,title:'我是学生',path:'/Register/StudentRegisterOne'}
            ]
        }
    },
    methods:{
        changeTitle(item){
            this.localTitle = item.id;
            this.$router.push({
                path:item.path,
				query:{}
            });
        }
    }
}
</script>
<style scoped>
#header-container{
  width: 100%;
  background-color: #fff;
}
#header{  
  height:120px;
  margin: auto;  
  overflow: hidden;
  padding-top: 34px; 
}
#header>div.left{
  overflow: hidden;  
height: 53px;
}
#header>.left>div{
  float: left;
}
.logo{
  margin-right: 10px;
}
.logo img{
  height: 53px;
}
.title{
  text-align: center;
  padding-right: 25px;
}
.title div{
  font-family: FZZXHJW--GB1-0;
	font-size: 20px;
	color: #333;
}
.title p{  
	font-family: MicrosoftYaHei;
	font-size: 14px;	
	color: #999;
}
.free-register{
    float: left;
    height: 40px;
    padding-left: 20px;
    margin-left: 55px;
    margin-top: 10px;
    font-weight: normal;
    border-left:1px solid #e9e9e9;
    font-size: 20px;
    color: #666;
}
#section{
    min-height: 600px;
    padding: 40px 130px;
    margin-top: 40px;
    margin-bottom: 80px;
    background-color: #fff;
    border:1px solid #dfe4e9;
}
.register-title{
    height: 40px;
    margin-bottom: 40px;
    border-bottom:1px solid #dfe4e9;
    font-size: 20px;
    color: #666;
}
.register-title span{  
    display: inline-block;
    padding-bottom: 9px;      
    margin-right: 40px;
    cursor: pointer;
}
.register-title span.active{        
    color: #37b1ef;
    border-bottom:1px solid #37b1ef;
}
</style>


