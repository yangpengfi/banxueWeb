<template>
  <div id="app">
      <div class="banner">
        <img src="../../assets/imgs/app/banner.png">
      </div>
      <div id="app-content" class="w-1200">
        <div>
            <div class="section-box">
                <span class="section-title">智慧教学</span>
            </div>
            <ul class="content">
              <li v-for="item in appInfos">
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
        <div>
            <div class="section-box">
                <span class="section-title">智慧管理</span>
            </div>
            <ul class="content">
              <li v-for="item in appInfos">
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
      </div>
      <div class="clear"></div>
  </div>
</template>
<script>
export default {
    data () {
        return {
            appInfos:[
            {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},{name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},{name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'}
      ]
        }
    }
}
</script>
<style scoped>
.banner{
  text-align: center;
}
.banner img{
  width: 100%;
}
#app-content>div{
  margin-top: 20px;
}
.content{
  border:1px solid rgb(233,233,233);
  overflow: hidden;
  background-color: #fff;
}
.content li{
  float: left;
  width: 33.3%;
  padding: 40px 20px;
  overflow: hidden;
  border-right: 1px solid rgb(233,233,233);
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
#app>.clear{
  margin-bottom: 80px;
}
</style>


