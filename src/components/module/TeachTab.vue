<template>
    <div>
        <p class="space-total"> 
            <span>资源建设总量 </span>
            <b>{{totalCount}}</b> 
        </p>        
        <div class="pecent">                   
            <div id="pieFour"></div>
        </div>    
    </div>
</template>
<script>
export default {
    name:'TeachTab',
    data(){
        return {
            dataName:[],
            dataValue:[],
            totalCount:15494
        }
    },
    methods:{
        getPieDate(){
            this.$http.post('web/coursebook/countResource')
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                let resData=result.data['教学'];
                this.totalCount=resData.totalCount;
                if(resData.data instanceof Array && resData.data.length>0){
                    for(let i=0,len=resData.data.length;i<len;i++){
                        this.dataName.push(resData.data[i].resourceTypeName)
                        this.dataValue.push(resData.data[i].count)
                    }
                    this.drawPieFour();
                }else{
                  this.dataName = [];
                  this.dataValue = [];
                }           
              }
            } 
            }) 
        },
        drawPieFour(){
            let pieFour = this.$echarts.init(document.getElementById('pieFour'));
            pieFour.setOption({
                color: ['#31C46E'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {      
                        type : 'shadow'   
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data :this.dataName ,
                        axisLabel:{
                            interval:0,
                            rotate:45 
                        },
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                         show : false
                    }
                ],
                series : [
                    {
                        name:'资源建设',
                        type:'bar',
                        barWidth: '50%',
                        data:this.dataValue
                    }
                ]
            });
        }
    },
    mounted(){
        this.getPieDate();
    }   
}
</script>
<style scoped>
    .space-total{
        border-top: 1px solid #E9E9E9; 
        padding: 20px 35px 0;  
        text-align: center;
    }
    .space-total span{        
        margin-right: 10px;       
        font-size: 18px;        
        color: #666;
        font-family: MicrosoftYaHei;
    }
    .space-total b{       
        font-family: MicrosoftYaHei;
        font-size: 32px; 
        font-weight: normal;       
        color: #1cb0ea;
    }    
    .pecent{
        width: 100%;
        height: 340px;
        padding: 0 20px;       
    }
    #pieFour{
        width: 300px;
        height: 280px;        
    }
    
</style>


