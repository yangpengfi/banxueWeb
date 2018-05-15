<template>
    <div>
        <p class="space-total"> 
            <span>资源建设总量 </span>
            <b>{{totalCount}}</b> 
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
            dataList:[],
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
                let resData=result.data['资源'];
                this.totalCount=resData.totalCount;
                if(resData.data instanceof Array && resData.data.length>0){
                    for(let i=0,len=resData.data.length;i<len;i++){
                        this.dataList.push({
                            'value':resData.data[i].count,
                            'name':resData.data[i].subjectName
                        })
                    }
                    this.drawPieThree();
                }else{
                  this.dataList = [];
                }           
              }
            } 
            })
            .catch((err)=>{
                alert(err);
            })
        },
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
                            data:this.dataList
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
        height: 315px;
        padding: 20px;
        margin-top: 30px;
    }
    #pieThree{
        width: 300px;
        height: 250px;        
    }
    
</style>


