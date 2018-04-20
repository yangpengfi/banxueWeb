<template>
  <div>    
    <ul class="content">
        <li v-for="item in infoList">
            <div>
                <img src="../../assets/imgs/app/appLogo.png">
                <div>
                    <h2>{{item.name}}</h2>
                    <p><Rate v-model="item.value"></Rate></p>
                    <p class="file-size">大小：{{item.size}}</p>
                    <p><Button type="success">免费</Button></p>
                </div>
            </div>
            <p class="clear">{{item.text}}</p>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
    name:'ApplicationInfo',
    data(){
        return {

        }
    },
    props:{
        infoList:{
            type:Array,
            required:true
        }
    }  
}
</script>
<style scoped>
    .content{
        border:1px solid rgb(233,233,233);
        border-bottom:none;
        overflow: hidden;
        background-color: #fff;
    }
    .content li{
        float: left;
        width: 33.3%;
        padding: 40px 20px;
        overflow: hidden;
        border-right: 1px solid rgb(233,233,233);
        border-bottom:1px solid rgb(233,233,233);

    }
    .content li:nth-child(3){
        border-right: none;
    }
    .content li>div>img{
        float: left;
    }
    .content li>div>div{
        float: left;
        margin-left: 20px;
    }
    .content li h2{
        font-size: 18px;
        padding-top: 5px;
        font-weight: 400;
    }
    .content li>p{
        text-indent: 2em;
        padding-top:15px;
        font-size: 14px;
        color:#999; 
    }
    .file-size{
        line-height: 24px;
        font-size: 14px;
        color:#333;
    }
</style>


