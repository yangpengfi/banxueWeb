<template>
    <div>
       <p class="space-total"> 
            <span>已开通的空间 </span> <br>
            <b>14131912</b> 
        </p>
        <ul class="one-total">
            <li>
                <img src="../../assets/imgs/index/teacherRole.png" alt="老师icon">
                <p>老师</p>
                <p class="one-num">565758</p>
            </li>
            <li>
                <img src="../../assets/imgs/index/studentRole.png" alt="学生icon">
                <p>学生</p>
                <p class="one-num">4577949</p>
            </li>
            <li>
                <img src="../../assets/imgs/index/masterparentRole.png" alt="家长icon">
                <p>家长</p>
                <p class="one-num">8975185</p>
            </li>
        </ul>
        <div class="pecent">                   
            <div id="pie0ne" :style="{width: '180px', height: '180px'}"></div>
            <div id="pieTwo" :style="{width: '180px', height: '180px'}"></div>
        </div>    
    </div>
</template>
<script>
export default {
  name:'SpaceTab',

  methods:{        
        drawPieOne(){
            let pieOne = this.$echarts.init(document.getElementById('pie0ne'));
            pieOne.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },               
                series: [
                    {
                        name:'空间数量',
                        type:'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                formatter: '75%',
                                position: 'center',
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:8888, name:'占有量',itemStyle:{normal:{color:'#31C46E'}}},
                            {value:2222, name:'剩余量',itemStyle:{normal:{color:'#31C499'}}}                            
                        ]
                    }
                ]
            });
        },
        drawPieTwo(){
            let pieTwo = this.$echarts.init(document.getElementById('pieTwo'));
            pieTwo.setOption({
               tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },                
                series: [
                    {
                        name:'空间数量',
                        type:'pie',
                        radius: ['35%', '55%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {                                
                                formatter: '100%',
                                position: 'center',
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '12',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[
                            {value:8888, name:'占有量',itemStyle:{normal:{color:'#31C46E'}}}                                                     
                        ]
                    }
                ]
            });
        }        
    },
    mounted(){
        this.drawPieOne();
        this.drawPieTwo();
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
        font-size: 16px;        
        color: #666;
    }
    .space-total b{       
        font-family: MicrosoftYaHei;
        font-size: 30px;        
        color: #1cb0ea;
    }
    .one-total{
        overflow: hidden;
    }
    .one-total li{
        float: left;
        width: 30%;
        padding: 20px 0;
        margin-right: 10px;
        text-align: center;        
        border-right:1px solid#EFEFEF;        
	    font-size: 20px;	
	    color: #666;
    }
    .one-total li:last-child{        
        border-right:none;
    }
    .one-num{        
        color: #1cb0ea;        
	    font-size: 20px;	
    }
    .pecent>div{
        float: left; 
        width: 50%;
    }
</style>


