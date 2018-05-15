<template>
  <div id="footer">
      <div class="w-1200">
        <div class="footLeft left">
          <h1>友情链接</h1>
          <p class="links">
            <a href="http://www.moe.edu.cn/">中华人民共和国教育部</a>
            <a href="http://emic.moe.edu.cn/edoas2/emic/index.jsp">教育部教育管理信息中心</a>
            <a href="http://www.ncet.edu.cn/">中央电化教育馆</a>
            <a href="http://www.ict.edu.cn/">中国教育信息化网</a>
          </p>
          <p class="call">平台提供：深圳市异度信息产业有限公司 <br/>
          服务热线：0755-26606739 
          <span></span>联系邮箱：partners@eddue.com
          </p>
        </div>
        <div class="footRight left">
          <img src="../../assets/imgs/index/cool.jpg">
          <p>异度品牌官网-微信公众号</p>
        </div>
        <div class="clear"></div>
      </div>
      <div class="copy">
          <p class="w-1200">
            <span>Copyright@ 2016</span>
            <span>深圳市异度信息产业有限公司</span>
            <span>保留所有版权（测试版）</span>   
            <span class="icp">ICP备15117359号</span>
          </p>
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
    width: 100%;
    height: 280px;
    /*line-height: 80px;*/
	  background-color: #232829;
	  box-shadow: inset 0px 1px 0px 0px rgba(223, 228, 233, 0.05);
}
.footLeft{
  box-sizing: border-box;
  padding-left: 20px;
  width: 920px;
  text-align: left;
}
.footLeft h1{
  font-size: 20px;
  font-weight: normal;
  line-height: 40px;
  padding: 25px 0;
  color: #008fd5;
}
.links a{
  font-size: 14px;
  line-height: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-right: 60px;
}
.call{
  margin-top: 40px;
  margin-bottom: 15px;
  font-size: 14px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.6);
}
.call span{
  margin-right: 60px;
}
.footRight{
  width: 280px;
  text-align: center;
}
.footRight img{
  width: 120px;
  height: 120px;
  margin-top: 40px;
}
.footRight p{
  font-size: 14px;
  line-height: 50px;
  color: rgba(255, 255, 255, 0.6);
}
.copy{
  box-shadow: inset 0px 1px 0px 0px 
    rgba(223, 228, 233, 0.05);
    line-height: 60px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 14px;
}
.copy p{
  padding-left: 200px;
}
.copy span{ 
    margin-right: 20px;
}
.icp{
  margin-left: 35px;
}
</style>


