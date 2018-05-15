<template>
    <div>
        <div class="register-content">
            <div class="common-title">
                <span class="active">账号设置</span>
                <span>填写个人信息</span>
            </div>
            <p>
                <span>手机号码：</span>
                <input type="text" v-model="mobile"
                placeholder="请输入手机号" 
                maxlength="11" 
                title="账号长度不超过11位">
            </p>
            <p class="msg-btn">
                <span>短信验证码：</span>
                <input type="text" placeholder="请输入短信验证码" v-model="messgaeCode">
                <button type="button" @click="openModal">发送验证码</button>
            </p>
            <p>
                <span>密码：</span>
                <input type="password" placeholder="请输入密码" v-model="pwd">
            </p>
            <button type="button" id="next-btn" @click="toStudentRegisterTwo">下一步</button>
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
    </div>
</template>
<script>
export default {
    name:'StudentRegisterOne',
    data(){
        return {
           modal:false,
           mobile:'',
           imageCode:'',
           messgaeCode:'',
           pwd:'',
           imgUrl:require('../../assets/imgs/login/imgCode.png')
        }
    },
    methods:{
        ok () {
            this.getValidateCode();
        },
        cancel () {
            // this.$Message.info('Clicked cancel');
        },
        openModal(){
            this.getImageCode();
            this.modal=true;
        },
        toStudentRegisterTwo(){
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
                    content: '请输入短信验证码！',
                    duration: 2
                });
                return;
            }else if(!this.pwd){
                this.$Message.warning({
                    content: '请输入密码！',
                    duration: 2
                });
                return;
            }
            let register={
              mobile:this.mobile,  
              validateCode:this.messgaeCode,  
              pwd:this.pwd
            }
            // console.log(register)
            this.$storage.setSession('postData',register)
            this.$router.push({
                path:'/Register/StudentRegisterTwo',
                query:{}
            });
        },
        getValidateCode(){
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
            }else if(!this.imageCode){
                this.$Message.warning({
                    content: '请输入图片验证码！',
                    duration: 2
                });
                return;
            }
            this.$http.post('/web/code/getValidateCode.do',this.$qs.stringify({
                skey:new Date().getTime(),
                mobile:this.mobile,
                imageCode:this.imageCode
            }))
            .then((res)=>{
            if(res.data.status==0){

            }else{

            }
            })
            .catch((err)=>{
                alert(err);
            })
        },
        getImageCode(){
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
            }
           this.$http.post('/web/code/getImageCode.do',this.$qs.stringify({
            skey:new Date().getTime(),
            mobile:this.mobile
          }))
          .then((res)=>{ 
            if(res.data.status==0){
                this.imgUrl='data:image/jpg;base64,'+res.data.data;
            }else{
                this.$Message.info(res.data.message)
            }
          })
          .catch((err)=>{
            alert(err);
          })  
        } 
    }
}
</script>
<style scoped>    
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
        border:1px solid #dfe4e9;
        border-radius: 4px;
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
        border-radius: 4px;
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


