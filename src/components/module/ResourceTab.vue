<template>
    <div>
        <p class="space-total"> 
            <span>资源建设总量 </span>
            <b>3467034</b> 
        </p>        
        <div class="pecent">                   
            <div id="pieThree"></div>
        </div>    
    </div>
</template>
<script>
export default {
    name:'ResourceTab',
    data(){
        return {
            
        }
    },
    methods:{
        drawPieThree(){
            let pieThree = this.$echarts.init(document.getElementById('pieThree'));
            pieThree.setOption({
                tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },                    
                    series: [                        
                        {
                            name:'资源',
                            type:'pie',
                            radius: ['60%', '80%'],                            
                            data:[
                                {value:335, name:'政治',itemStyle:{normal:{color:'#4cb1a7'}}},
                                {value:310, name:'化学',itemStyle:{normal:{color:'#ec7777'}}},
                                {value:234, name:'数学',itemStyle:{normal:{color:'#e5c649'}}},
                                {value:135, name:'物理',itemStyle:{normal:{color:'#a6c733'}}},
                                {value:1048, name:'英语',itemStyle:{normal:{color:'#57bcda'}}},
                                {value:251, name:'语文',itemStyle:{normal:{color:'#489e95'}}},
                                {value:147, name:'生物',itemStyle:{normal:{color:'#ecd77f'}}},
                                {value:102, name:'地理',itemStyle:{normal:{color:'#94b033'}}}
                            ]
                        }
                    ]
            });
        }
    },
    mounted(){
        this.drawPieThree();
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
        height: 315px;
        padding: 20px;
        margin-top: 30px;
    }
    #pieThree{
        width: 300px;
        height: 250px;        
    }
    
</style>


