<template>
  <div id="resource-nav">
        <div class="w-1200">
            <ul v-if="resourceFilter.length>0" class="filter-box">
                <li v-for="item of resourceFilter" @click="ChangeResourceType(item)">
                    <router-link :to='item.path' :class="{active:item.id==filterId}">{{item.text}}</router-link>
                </li>
            </ul>
            <Input v-model="search" icon="ios-search-strong" placeholder="请输入关键字" id="search-box"  @on-click="intoSearch" @on-enter="intoSearch"></Input>
        </div>      
  </div>
</template>
<script>
export default {
    name:'ResourceNav',
    data(){
        return{
                resourceFilter:[               
                    {text:'学科资源',path:'/FilterResource/SubjectResource?id=SubjectResource',id:'SubjectResource'},   
                    {text:'区域资源',path:'/FilterResource/AreaResource?id=AreaResource',id:'AreaResource'},   
                    {text:'校本资源',path:'/FilterResource/SchoolResource?id=SchoolResource',id:'SchoolResource'},   
                    {text:'特色微课',path:'/FilterResource/SpecialClass?id=SpecialClass',id:'SpecialClass'},   
                    {text:'优课专区',path:'/FilterResource/HightQualityClass?id=HightQualityClass',id:'HightQualityClass'}
                ],
                filterId:'AreaResource',
                search:''
        }
    },
    methods:{
        ChangeResourceType(item){  
            this.filterId=item.id; 
        },
        intoSearch(){
            this.$router.push({
				path:'/SearchResource'
			});		
        }
    },
    created(){
        this.filterId=this.$router.history.current.query.id;
        // console.log(this.$router.history.current.query.id)
    }
}
</script>
<style scoped>
    #resource-nav{        
        width: 100%; 
        height: 60px;
        line-height: 60px;
        background-color: #fff;
        box-shadow: 0px 3px 5px 0px 
        rgba(0, 0, 0, 0.2);
        border-top:1px solid #eee;     
    }
    #resource-nav .w-1200{
        position: relative;
    }
    .filter-box{ 
        overflow: hidden;        
        padding-left: 350px;        
        text-align: center; 
    }
    .filter-box li{
        float: left;        
    }
    .filter-box li a{    
        display: inline-block;    
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        color: #666;   
    }
    .filter-box li a.active{
        background-color: #1cb0ea;
        color: #fff;
    }
    #search-box{
        position: absolute;
        right: 0;
        top: 15px;
        width: 200px;
    }
</style>


