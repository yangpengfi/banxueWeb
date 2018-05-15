<template>
  <div>    
    <ul class="content">
        <li v-for="item in infoList">
            <div>
                <img :src="item.img0"  @click="goDetail(item)">
                <div>
                    <h2 @click="goDetail(item)">{{item.appName}}</h2>
                    <p><Rate v-model="item.score" disabled></Rate></p>
                    <p class="file-size">大小：{{item.appSize}}M</p>
                    <p v-if="item.isCharge==0"><Button type="success">免费</Button></p>
                    <p v-if="item.isCharge==1"><Button type="success">收费</Button></p>
                </div>
            </div>
            <p class="clear">{{item.appDesc}}</p>
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
    } ,
    methods:{
        goDetail(item){
            this.$router.push({
              path:'/AppDetail',
              query:{
                appId:item.appId          
              }
            });   
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
        height: 320px;
        padding: 40px 20px;
        overflow: hidden;
        border-right: 1px solid rgb(233,233,233);
        border-bottom:1px solid rgb(233,233,233);

    }
    .content li:nth-child(3){
        border-right: none;
    }
    .content li>div>img{
        width: 120px;
        height: 120px;
        border-radius: 4px;
        float: left;
        cursor: pointer;
    }
    .content li>div>div{
        float: left;
        margin-left: 20px;
    }
    .content li h2{
        font-size: 18px;
        padding-top: 5px;
        font-weight: 400;
        cursor: pointer;
    }
    .content li>p{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        height: 117px;
        overflow: hidden;
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


