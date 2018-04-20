<template>
  <div id="login">
      <header id="login-header">
        <div class="logo-top">
          <img src="../../assets/imgs/login/logoWhite.png"/>         
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
                  title="密码长度不超过11位"></Input>
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
              <div class="input">
                  <Checkbox v-model="single">一周内自动登录</Checkbox>
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
      }
    },
    methods:{
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
        console.log(111)
        this.error=false;
      }
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
    padding-top: 40px;
    padding-left: 20px;
}
#section{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #409eff url('../../assets/imgs/login/bgimg.png') no-repeat center center;
  
}
.content{
  position: relative;
  margin-top: 120px;
}
.loginBox{
    width: 333px;
    position: absolute;
    right: 10%;
    top: 150px;
    padding: 20px 40px 30px;
    background: #fff;
    border-radius: 5px;
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
#footer{
  position: fixed;
  bottom: 0;
  left: 0;
  color: #fff;
  width: 100%;
  padding-bottom: 60px;
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


