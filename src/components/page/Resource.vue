<template>
  <div>
      <div id="banner">
          <div class="w-1200">            
            <div class="classes-classify">
              <p class="classify-title">
                <Icon type="navicon-round" size=24></Icon>
                <span>同步资源</span>
              </p>
              <ul class="classify-content">
                <li></li>
              </ul>              
            </div>
          </div>          
        </div>   
      <div class="classes">
      	
      </div>
  </div>
</template>
<script>
export default {
    name:'Resource'
}
</script>
<style scoped>
#banner{  
  width: 100%;
  height: 480px;
  background-color: #E0BB83;
  background: url('../../assets/imgs/resource/banner.png') no-repeat center center;
}
#banner>div{
  position: relative;
}
.classes-classify{
  position: absolute;
  left: 0;
  top: 0;
  width: 240px;
  height: 480px;  
  background-color: rgba(0, 0, 0, 0.4);
}
.classify-title{
  height:80px;
  line-height: 80px;
  padding-left: 15px;  
  font-family: MicrosoftYaHeiLight;
  background-color: rgba(0, 0, 0, 0.2);
	font-size: 20px;	
	color: #fff;
}
.classify-content{
  height: 400px;
  padding:0 20px 0 40px;
  color: #fff;
  font-size: 14px;  
}
.classify-content li{
  padding: 15px 0 10px 0;
  border-bottom: 1px solid rgba(248, 248, 248, 0.1);
}
.classify-content li:last-child{
  border-bottom: none;
}
.classify-content li>p{  
  margin-bottom: 10px;
  font-size: 16px;
}
.classify-content a{ 
  display: inline-block;
  width: 30%;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 0.8);  
}
</style>


