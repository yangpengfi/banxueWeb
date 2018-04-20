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
            <ApplicationInfo :infoList="teachList"></ApplicationInfo>           
        </div>
        <div>
            <div class="section-box">
                <span class="section-title">智慧管理</span>
            </div>
            <ApplicationInfo :infoList="manageList"></ApplicationInfo>           
        </div>
      </div>
      <div class="clear"></div>
  </div>
</template>
<script>
import ApplicationInfo from '@/components/common/ApplicationInfo'; 
export default {
    name:'Application',
    components:{
        ApplicationInfo
    },
    data () {
        return {
            teachList:[
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'}
            ],
            manageList:[
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'},
                  {name:'伴学网',size:'22M',value:4,text:'伴学网app是一款移动教学软件。软件已云课堂为中心，教师可直接在线为学生上课，可也自己录制视频供学生观看，在线进行信息发布等，让学生与老师关联更紧密。有需要的用户欢迎下载使用。'}
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

#app>.clear{
  margin-bottom: 80px;
}
</style>


