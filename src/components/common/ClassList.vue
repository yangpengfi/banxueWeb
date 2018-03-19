<template>
    <div>
        <ul class="classes-content">
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u161.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u163.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u165.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u167.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u169.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u171.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>  
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u161.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>
            <li>
                <div class="classes-img">
                    <img src="../../assets/imgs/index/u163.png" alt="课程图片">
                    <p></p>
                </div>                
                <div class="class-price">
                    <p>备战高考 理科一轮复习课程</p>
                    <span>￥</span>
                    <b>29.00</b>
                </div>                
            </li>            
        </ul>
    </div>
</template>
<script>
export default {
    name:'ClassList'
}
</script>
<style scoped>
    .classes-content{        
        width: 100%;
        display: -webkit-flex; 
        display: flex;
        flex-direction: row ; 
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .classes-content li{      
        width: 260px;
        margin-bottom: 20px;        
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
    .class-price b{           
        font-size:20px;        
        color: #ff4242;
    }
    .classes-content li:hover{

    }
</style>


