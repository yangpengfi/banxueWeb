<template>
    <div id="register">
            <div id="header-container">
                <div id="header" class="w-1200">    
                    <div class="left">
                        <div class="logo">
                            <img :src="logoUrl" alt="这是logo图片"  @click="toLogin">
                        </div>        
                        <div class="title">
                            <div>伴学网教育云平台</div>
                            <p>专注中小学个性化教育</p>
                        </div>
                        <h2 class="find-password">找回密码</h2>
                    </div> 
                </div>
            </div> 
            <section id="section" class="w-1200">
                <p class="find-password-title">
                    <span>找回密码</span>
                </p>    
                <div class="register-content">                   
                    <p>
                        <span>手机号码：</span>
                        <input type="text" v-model="mobile"
                        placeholder="请输入手机号" 
                        :maxlength="11" 
                        title="账号长度不超过11位">
                    </p>
                    <p class="msg-btn">
                        <span>短信验证码：</span>
                        <input type="text" placeholder="请输入短信验证码" v-model="messgaeCode">
                        <button type="button" @click="openModal">发送验证码</button>
                    </p>
                    <p>
                        <span>新密码：</span>
                        <input type="password" placeholder="请输入新密码" v-model="newPwd">
                    </p>
                    <p>
                        <span>确认新密码：</span>
                        <input type="password" placeholder="请再次输入新密码" v-model="surePwd">
                    </p>
                    <button type="button" id="next-btn" @click="resetPwd">确认</button>
                </div>  
                <Modal
                v-model="modal" 
                title="图片验证码"
                @on-ok="ok"
                @on-cancel="cancel">
                <p class="verify-btn">
                    <span>验证码：</span>
                    <input type="text" placeholder="请输入验证码" maxlength="6" v-model="imageCode">
                    <img :src="imgUrl" @click="getImageCode">
                </p>
                </Modal>         
            </section>
            
            <v-foot></v-foot>
    </div>
</template>
<script>
import vFoot from '@/components/common/Footer'; 
export default {
    name:'ForgetPassword',
    components:{
        vFoot
    },
    data(){
        return {
           modal:false,
           mobile:'',
           imageCode:'',
           messgaeCode:'',
           newPwd:'',
           surePwd:'',
           logoUrl:'',
           imgUrl:require('../../assets/imgs/login/imgCode.png')
        }
    },
    methods:{
        ok () {
                this.getValidateCode();
        },
        cancel () {
                
        },
        openModal(){
            this.getImageCode();
            this.imageCode=''
        },
        toLogin(){
            this.$router.push({
                path:'/Login'
            });
        },
        getLogo(){
            this.$http.post('web/space/logo.do')
            .then((res)=>{
            if(res.data.status==0){
              this.logoUrl=res.data.data.logoPath
            }else{
              this.$Message.error(res.data.message);
            }
            })
             
        },
        resetPwd(){
            let telReg=/^1[0-9]{10}$/;
            if(!this.mobile){
                this.$Message.warning({
                    content: '手机号码不能为空！',
                    duration: 2
                });
                return;
            }else if(!telReg.test(this.mobile)){
                this.$Message.warning({
                    content: '请输入正确的手机号码！',
                    duration: 2
                });
                return;
            }else if(!this.messgaeCode){
                this.$Message.warning({
                    content: '验证码不能为空！',
                    duration: 2
                });
                return;
            }else if(!this.newPwd){
                this.$Message.warning({
                    content: '请输入新密码！',
                    duration: 2
                });
                return;
            }else if(!this.surePwd){
                this.$Message.warning({
                    content: '请输入确认密码！',
                    duration: 2
                });
                return;
            }else if(this.newPwd!=this.surePwd){
                this.$Message.warning({
                    content: '密码输入不一致！',
                    duration: 2
                });
                return;
            }
            this.$http.post('/web/user/resetPwd.do',this.$qs.stringify({
                skey:new Date().getTime(),
                mobile:this.mobile,
                validateCode:this.messgaeCode,
                pwd:this.$md5(this.surePwd)
            }))
            .then((res)=>{
            if(res.data.status==0){
                this.$Message.warning({
                    content: '密码修改成功，3秒后将跳转至登录界面！',
                    duration: 2
                });
                setTimeout(()=>{
                    this.toLogin();
                }, 3000);
            }else{
                this.$Message.error({
                    content: res.data.message,
                    duration: 2
                });
            }
            })         
        },
        getValidateCode(){
            let telReg=/^1[0-9]{10}$/;
            if(!this.mobile){
                this.$Message.warning({
                    content: '手机号码不能为空！',
                    duration: 2
                });
                return false;
            }else if(!telReg.test(this.mobile)){
                this.$Message.warning({
                    content: '请输入正确的手机号码！',
                    duration: 2
                });
                return false;
            }else if(!this.imageCode){
                this.$Message.warning({
                    content: '请输入图片验证码！',
                    duration: 2
                });
                return false;
            }
            this.$http.post('/web/code/getValidateCode.do',this.$qs.stringify({
                skey:new Date().getTime(),
                mobile:this.mobile,
                imageCode:this.imageCode
            }))
            .then((res)=>{
            if(res.data.status==0){

            }else{
                this.$Message.error({
                    content: res.data.message,
                    duration: 2
                });
            }
            })        
             },
        getImageCode(){
            let telReg=/^1[0-9]{10}$/;
            if(!this.mobile){
                this.$Message.warning({
                    content: '手机号码不能为空！',
                    duration: 2
                });
                return false;
            }else if(!telReg.test(this.mobile)){
                this.$Message.warning({
                    content: '请输入正确的手机号码！',
                    duration: 2
                });
                return false;
            }
           this.$http.post('/web/code/getImageCode.do',this.$qs.stringify({
            skey:new Date().getTime(),
            mobile:this.mobile
          }))
          .then((res)=>{ 
            if(res.data.status==0){
                this.modal=true;
                this.imgUrl='data:image/jpg;base64,'+res.data.data;
            }else{
                this.$Message.error({
                    content: res.data.message,
                    duration: 2
                });
            }
          })   
        } 
    },
    created(){
      this.getLogo();
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
    /*padding-top: 34px; */
    }
    #header>div.left{
    overflow: hidden;  
    /*height: 53px;*/
    }
    #header>.left>div{
    float: left;
    }
    .logo{
    margin-right: 10px;
    }
    .logo img{
    height: 120px;
    }
    .title{
    text-align: center;
    padding-right: 25px;
    margin-top: 34px;
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
    .find-password{
        float: left;
        height: 40px;
        padding-left: 20px;
        margin-left: 55px;
        margin-top: 44px;
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
    .find-password-title{
        height: 40px;
        margin-bottom: 40px;
        border-bottom:1px solid #dfe4e9;
        font-size: 20px;
        color: #666;
    }
    .find-password-title span{  
        display: inline-block;
        padding-bottom: 9px;      
        margin-right: 40px;
        cursor: pointer;
    }    
    .common-title{
        height: 50px;
        margin-bottom: 38px;
        padding-top: 14px;
        text-align: center;
        background: url('../../assets/imgs/register/registerStep.png') no-repeat center top;
    }
    .common-title span{
        margin-right: 60px;
        margin-left: 80px;
        font-size: 16px;
        color: #666;
    }
    .common-title span.active{
        color: #37b1ef;
    }
    .register-content p{
        width: 520px;
        margin: auto;
        margin-bottom: 30px;
    }
    .register-content p span{
        display: inline-block;
        width: 90px;
        margin-right: 20px;
        text-align: right;
        color: #7b8085;
        font-size: 14px;
    }
    .register-content p input{
        width: 400px;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        border-radius: 4px;
        border:1px solid #dfe4e9;
    }   
    p.verify-btn input{
        width: 290px;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        margin-right: 5px;
        border-radius: 4px;
        border:1px solid #dfe4e9;
    }
    .register-content p.msg-btn input{
        width: 290px;
        margin-right: 5px;
    }   
    .verify-btn img{
        width: 100px;
        height: 36px;
        vertical-align: middle;
        cursor: pointer;
        border-radius: 4px;
    } 
    .msg-btn button{
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #f8f8f8;
        border:none;
        background-color: #b7b7b7;
        cursor: pointer;
        border-radius: 4px;
    }
    #next-btn{
        margin-left: 320px;
        width: 160px;
        height: 40px;
        line-height: 40px;
        background-color: #37b1ef;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        border:none;
        font-size: 14px;
        cursor: pointer;
    }
</style>


