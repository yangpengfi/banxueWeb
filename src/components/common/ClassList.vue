<template>
    <div>
        <ul class="classes-content">
            <li v-for="item in classList" @click="goToInfo(item.id)">
                <div class="classes-img" v-show="item.imgUrl!=''">
                    <img :src="item.imgUrl" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price" v-show="item.imgUrl!=''">
                    <p>{{item.name}}</p>
                    <span>￥</span>
                    <b>{{(item.money)/100}}</b>
                </div> 
                <div class="classText" v-show="item.imgUrl==''">
                    <h1>{{item.name}}</h1>
                    <p class="textMid">
                        <span>{{item.gradeName+item.subjectName+item.versionName}}</span><br>
                        <span>共{{item.videoNums}}讲</span>
                    </p>
                    <p class="textFoot">
                        <span v-show="item.isFree==0">￥<b>{{(item.money)/100}}</b></span>
                        <span v-show="item.isFree==1" class="free">免费</span>
                    </p>
                </div>               
            </li>           
        </ul>
    </div>
</template>
<script>
export default {
    name:'ClassList',
    data(){
        return {

        }
    },
    props:{
        classList:{
            type:Array,
            required:true
        }
    },
    methods:{
        goToInfo(id){
            this.$router.push('/ClassDatile?courseId='+id);
        }
    }  
}
</script>
<style scoped>
    .classes-content{        
        width: 100%;
        overflow: hidden;
    }
    .classes-content li{  
        float: left;    
        margin-right: 53px;
        width: 260px;
        margin-bottom: 20px;        
    }
    .classes-content li:nth-child(4n){  
        margin-right: 0;     
    }
    .classes-content li:hover .classes-img p{      
        display: block;  
    }
    .classes-content li:hover{      
        position: relative;
        top: -10px;
    }
    .classes-img{
        width: 260px;
        height: 195px;
        position: relative;
    }    
    .classes-img img{
        width: 100%;        
	    height: 100%;        
    }
    .classes-img p{
        position: absolute;
        top: 0;
        left: 0;        
        width: 100%;        
        height: 100%;
        background-color:rgba(0,0,0,.3);
        display: none;
    }
    .class-price{        
        text-align: center;
        width: 260px;
        height: 70px;
        box-shadow: 0px 5px 7px 0px rgba(70,130,147,.2);
    }
    .class-price p{   
        padding-top: 15px;     
        font-size: 16px;        
        color: #666;
    }
    .class-price span{           
        font-size:14px;        
        color: #666;
    }
    .class-price b,.classText b,.free{           
        font-size:20px;        
        color: #ff4242;
    }  
    .classText{
        width: 260px;
        height: 265px;
        background-color: #fff;
        text-align: center;
        padding-top:55px;
        box-sizing: border-box;
        box-shadow: 0px 0px 1px 0px rgba(70,130,147,.2); 
    }  
    .classText h1{
        font-size: 20px;
        color:#333;
    }
    .textMid{
        font-size: 14px;
        color:#666;
        line-height: 20px;
        margin-top: 15px;
    }
    .textMid>span:first-child{
        display: inline-block;
        max-width: 240px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .textFoot{
        margin-top: 50px;
        border-top: 2px dashed #e9e9e9;
        width: 260px;
        height: 70px;
        line-height: 70px;
        box-sizing: border-box; 
        box-shadow: 0px 5px 7px 0px rgba(70,130,147,.2);
    }
</style>


