<template>
  <div id="login">
      <header id="login-header">
        <div class="logo-top">
          <!-- <img src="../../assets/imgs/login/loginlogo.png" @click="goIndex"/>          -->
          <img :src="logoUrl" alt="这是logo图片" @click="goIndex">      
        </div>
      </header>
      <section id="section">
        <div class="content w-1200">        
          <div class="loginBox">
              <h3 class="login-box-msg">用户登录</h3>
              <div v-if="error" class="errorBox">
                <h4 style="margin: 10px 15px;color:red;"><i class="fa fa-exclamation-triangle"></i> {{errorMsg}}</h4>
              </div>
              <div class="input" @click="hideErrorBox">
                  <Input v-model="mobile" 
                  icon="ios-person-outline" 
                  placeholder="账号" 
                  style="width: 250px" 
                  :maxlength="11" 
                  title="账号长度不超过11位"></Input>
              </div>
              <div class="input" @click="hideErrorBox">
                  <Input v-model="pwd" 
                  icon="lock-combination" 
                  type="password" 
                  placeholder="密码" 
                  style="width: 250px" 
                  :maxlength="16" 
                  title="密码长度不超过16位"></Input>
              </div>
              <div class="more-operate">
                  <router-link class="left" to="/Register/">免费注册</router-link>
                  <router-link class="right" to="/ForgetPassword">忘记密码</router-link>
              </div>
              <Button type="primary" long @click="login">登录</Button>
          </div>         
        </div>
      </section>
      <footer id="footer">
        <div class="footer">
          <span>主管：教育局</span>
          <span>承办：深圳市异度信息产业有限公司</span>
          <span>技术支持：深圳市异度信息产业有限公司</span>
        </div>
      </footer>
  </div>
</template>
<script>
export default {
    name:'Login',
    data(){
      return {
          single:'',
          error:false,
          errorMsg:'',
          mobile:'',
          pwd:'',
          logoUrl:'',
      }
    },
    methods:{
      getLogo(){
        this.$http.post('web/space/logo.do')
          .then((res)=>{
          if(res.data.status==0){
              this.logoUrl=res.data.data.logoPath
          }else{
              this.$Message.error(res.data.message);
          }
          })
          .catch((err)=>{
              alert(err);
          })
      },
      goIndex(){
        this.$router.push({path:'/'});
      },
      login(){
        let userName=this.mobile;
        let password=this.$md5(this.pwd);
        let url=this.$router.history.current.query.redirect || '/';
        this.$http.post('/web/user/login',this.$qs.stringify({
            skey:new Date().getTime(),
            mobile:userName,
            pwd:password
          }))
          .then((res)=>{
            // console.log(res.data); 
            if(res.data.status==0){
            this.$storage.setStorage("token",res.data.data.token);
            this.$storage.setStorage("vipStatus",res.data.data.user.vipStatus);
            this.$storage.setStorage("userInfo",res.data.data.user);
            this.$router.push({path:decodeURIComponent(url)});
            }else{
              this.error=true;
              this.errorMsg=res.data.message;
            }
          })
          .catch((err)=>{
            alert(err);
          })
      },
      hideErrorBox(){
        // console.log(111)
        this.error=false;
      }
    },
    created(){
      this.getLogo();
    }
}
</script>
<style scoped>
#login{
    width: 100%;        
    background-size: 100% 100%;
}
#login-header{
    position: fixed;
    z-index: 999;
    width: 100%;  
} 
.logo-top{
    width: 1200px;
    margin: 0 auto;    
    /*padding-top: 10px;*/
    padding-left: 20px;
}
#section{
  position: absolute;
  top: 120px;
  right: 0;
  left: 0;
  bottom: 80px;
  background: #fff url('../../assets/imgs/login/loginbg.png') no-repeat center;
  background-size: 100% 100%;
}
.content{
  position: relative;
  /*margin-top: 120px;*/
}
.loginBox{
    width: 333px;
    position: absolute;
    right: 1%;
    top: 130px;
    padding: 20px 40px 30px;
    background: #fff;
    border-radius: 5px;
}
@media screen and (max-width: 1366px) {
    .loginBox{
        width: 300px;
        top: 100px;
    }
}
.login-box-msg{
  margin-bottom: 35px;
  text-align: center;
  color: #409eff;
  font-size: 24px;
  font-family: inherit;
  font-weight: normal;
}
.input{
  margin-bottom: 30px;
}
.ivu-input{
  border:none;
}
.more-operate{
  margin-bottom: 20px;
  overflow: hidden;
}
.more-operate a{
  cursor: pointer;
  font-size: 14px;
  color: #333;
}
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  color: #999;
  width: 100%;
  padding-bottom: 34px;
  font-size: 14px;
}
.footer{
    width: 1200px;
    margin: 0 auto; 
    overflow: hidden;
    text-align: center;
}
.footer span{    
    margin-right: 30px;
}
</style>


