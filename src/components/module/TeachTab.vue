<template>
    <div>
        <p class="space-total"> 
            <span>资源建设总量 </span>
            <b>3467034</b> 
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
            
        }
    },
    methods:{
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
                        data : ['资源', '导学', '课件', '授课', '检测', '作业'],
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
                        data:[10, 52, 200, 334, 390, 330]
                    }
                ]
            });
        }
    },
    mounted(){
        this.drawPieFour();
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


