<template>
    <div>
       <p class="space-total"> 
            <span>已开通的空间 </span> <br>
            <b>{{spaceCount.totalCount}}</b> 
        </p>
        <ul class="one-total">
            <li>
                <img src="../../assets/imgs/index/teacherRole.png" alt="老师icon">
                <p>老师</p>
                <p class="one-num">{{spaceCount.teacher}}</p>
            </li>
            <li>
                <img src="../../assets/imgs/index/studentRole.png" alt="学生icon">
                <p>学生</p>
                <p class="one-num">{{spaceCount.student}}</p>
            </li>
            <li>
                <img src="../../assets/imgs/index/masterparentRole.png" alt="家长icon">
                <p>家长</p>
                <p class="one-num">{{spaceCount.parent}}</p>
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
  data(){
    return {
            spaceCount:{}
        }
  },
  methods:{        
        drawPieOne(data){
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
                                formatter: data.active_percent,
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
                            {value:data.activeCount, name:'空间活跃',itemStyle:{normal:{color:'#31C46E'}}},
                            {value:(data.totalCount-data.activeCount), name:'不活跃',itemStyle:{normal:{color:'#31C499'}}}
                            ]
                    }
                ]
            });
        },
        drawPieTwo(data){
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
                                formatter: data.open_percent,
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
                           {value:data.openCount, name:'空间开通',itemStyle:{normal:{color:'#31C46E'}}},
                            {value:(data.totalCount-data.openCount), name:'未开通',itemStyle:{normal:{color:'#31C499'}}}
                        ]
                    }
                ]
            });
        },
        getSpaceCount(){
            this.$http.post('/web/space/spaceCount.do')
            .then((res)=>{
            if(res.status != 200){
              this.$Message.error('请求失败请重试');
            }else{
              let result = res.data;
              if(result.status != 0){
                this.$Message.error('请求资源失败，请重试');
              }else{ 
                this.spaceCount=result.data;
                this.drawPieOne(result.data.active);
                this.drawPieTwo(result.data.open);           
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },        
    },
    created(){
        this.getSpaceCount();
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


