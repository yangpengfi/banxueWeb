<template>
    <div class="w-1200 my-application"  id="app-content">
        <div v-for="item in appList" v-if="item.children.length>0">
            <div class="section-box">
                <span class="section-title">{{item.name}}</span>
            </div>
            <ApplicationInfo :infoList="item.children"></ApplicationInfo>           
        </div>
      <div class="clear"></div> 
    </div>
</template>
<script>
import ApplicationInfo from '@/components/common/ApplicationInfo'; 
export default {
    name:'MyApplication',
    components:{
        ApplicationInfo
    },
    data () {
        return {
            token:this.$storage.getStorage("token"),
            appList:[]
        }
    },
    methods:{
      getAppList(){
        this.$http.post('web/appInfo/listByType.do',this.$qs.stringify({
            token:this.token
        }))
        .then((res)=>{
        if(res.status != 200){
          this.$Message.error('请求失败请重试');
        }else{
          let result = res.data;
          if(result.status != 0){
            this.$Message.error(result.message);
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
      }
    },
    created(){
        this.getAppList();
    }
}
</script>
<style scoped>
	.my-application{
		margin-top: 30px;
		margin-bottom: 60px;
	}
  #app-content>div{
  margin-top: 20px;
}

#app>.clear{
  margin-bottom: 80px;
}
</style>