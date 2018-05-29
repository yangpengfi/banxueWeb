<template>
    <div>
        <div class="register-content">
            <div class="common-title">
                <span>账号设置</span>
                <span class="active">填写个人信息</span>
            </div>
            <p>
                <span><i style="color:red;">*</i> 姓名：</span>
                <input type="text" v-model="trueName" placeholder="请输入姓名" maxlength="15" title="姓名长度不超过15位">
            </p>
            <p>
                <span><i style="color:red;">*</i> 性别：</span>
                 <RadioGroup v-model="sex">
                    <Radio label="1">
                        男
                    </Radio>
                    <Radio label="2">
                        女
                    </Radio>
                </RadioGroup>
            </p>
            <p class="level">
                <span><i style="color:red;">*</i> 年级：</span>
                <select v-model="gradeId">
                    <option value='0'>请选择年级</option>
                    <option v-for="item in gradeList" :value="item.id" :key="item.id">{{item.name}}</option>
                </select>
            </p>
            <p>
                <span>民族：</span>
                <input type="text" placeholder="请输入民族" v-model="nation" maxlength="5" title="长度不超过5位">
            </p>
            <p>
                <span>身份证号：</span>
                <input type="text" placeholder="请输入身份证号" v-model="idCard" maxlength="18" title="长度不超过18位">
            </p>
            <p>
                <span>出生日期：</span>
                <DatePicker type="date" placeholder="请选择出生日期" style="width: 400px" size="large" v-model="birthDate" format="yyyy-MM-dd" @on-change="birthDate=$event"></DatePicker>
            </p>
            <p>
                <span>地址：</span> 
                <input type="text" placeholder="请输入地址" v-model="address" maxlength="80" title="长度不超过80位">
            </p>
            <button type="button" id="next-btn" @click="registerStudent">确认注册</button>
        </div>
    </div>
</template>
<script>
import global_ from '@/components/Global'; 
export default {
    name:'StudentRegisterTwo',
    data(){
        return {
           trueName:'',
           gradeId:0,
           sex:'1',
           idCard:'',
           nation:'',
           birthDate:'',
           address:'',
           gradeList:global_.gradeList,
           datas:this.$storage.getSession('postData')           
        }
    },
    methods:{
        toLogin(){
            this.$router.push({
                path:'/Login'
            });
        },
        registerStudent(){
            if(!this.trueName){
                this.$Message.warning({
                    content: '请输入真实姓名！',
                    duration: 2
                });
                return;
            }else if(!this.gradeId){
                this.$Message.warning({
                    content: '请选择年级！',
                    duration: 2
                });
                return;
            }
            this.$http.post(' /web/user/registerStudent.do',this.$qs.stringify({
                skey:new Date().getTime(),
                mobile:this.datas.mobile,
                validateCode:this.datas.validateCode,
                pwd:this.$md5(this.datas.pwd),
                trueName:this.trueName,
                gradeId:this.gradeId,
                sex:this.sex,
                idCard:this.idCard,
                nation:this.nation,
                birthDate:this.birthDate,
                address:this.address
            }))
            .then((res)=>{
            if(res.data.status==0){
                this.$Message.warning({
                    content: '注册成功，3秒后将跳转至登录界面！',
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
    .register-content p.level select{
        width: 400px;
        height: 36px;
        line-height: 36px;
        padding-left: 10px;
        border:1px solid #dfe4e9;
        border-radius: 4px;
    }
    .verify-btn button{
        width: 100px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        border:none;
        background-color: #37b1ef;
        cursor: pointer;
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
    }
    #next-btn{
        margin-left: 320px;
        width: 160px;
        height: 36px;
        line-height: 36px;
        background-color: #37b1ef;
        border-radius: 5px;
        color: #fff;
        text-align: center;
        border:none;
        font-size: 14px;
        cursor: pointer;
    }    
</style>


