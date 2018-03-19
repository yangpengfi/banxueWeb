<template>
  <div id="footer">
      <!-- <div>Copyright © 2018 深圳市异度信息产业有限公司 保留所有版权（测试版）</div>
      <p>ICP备15117359号-2</p> -->
      <div class="w-1200">
          <span>主管：教育局</span>
          <span>承办：深圳市异度信息产业有限公司</span>
          <span>技术支持：深圳市异度信息产业有限公司</span>
      </div>
  </div>
</template>
<script>
    export default {
        name:'Footer'
    }
</script>
<style scoped>
#footer{ 
    height: 80px;
    line-height: 80px;
	background-color: #232829;
	box-shadow: inset 0px 1px 0px 0px rgba(223, 228, 233, 0.05);
    text-align: center;
}
#footer span{    
	font-family: MicrosoftYaHeiLight;
	font-size: 14px;	
    color: rgba(255, 255, 255, 0.6);
    margin-right: 150px;
}
#footer span:last-child{    	
    margin-right: 0;
}
</style>


