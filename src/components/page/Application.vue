<template>
  <div id="app">
      <div class="banner">
        <img src="../../assets/imgs/app/myappbg.jpg">
      </div>
      <div id="app-content" class="w-1200">
        <div v-for="item in appList" v-if="item.children.length>0">
            <div class="section-box">
                <span class="section-title">{{item.name}}</span>
            </div>
            <ApplicationInfo :infoList="item.children"></ApplicationInfo>           
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
            appList:[]
        }
    },
    methods:{
      getAppList(){
        this.$http.post('web/appInfo/listByType',this.$qs.stringify({
            pageSize:3
        }))
        .then((res)=>{
        if(res.status != 200){
          this.$Message.error('请求失败请重试');
        }else{
          let result = res.data;
          if(result.status != 0){
            this.$Message.error('请求资源失败，请重试');
          }else{ 
            console.log(result)
            if(result.data instanceof Array && result.data.length>0){
              this.appList = result.data;
            }else{
              this.appList = [];
            }           
          }
        } 
        })
        .catch((err)=>{
            alert(err);
        })
      }
    },
    created(){
        this.getAppList();
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


