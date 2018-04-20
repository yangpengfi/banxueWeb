<template>
    <div id="bg">
        <div id="my-space">
            <div class="space-title">
                <img src="../../assets/imgs/space/touxiang.jpg" alt="头像">
                <div class="my-info">
                    <p>书拉密女</p>
                    <span>深圳市华侨城中学</span>
                </div>
                <div class="my-operate">
                    <p>
                        <b>180</b>
                        <span>资源</span>
                    </p>
                    <p class="no-line">
                        <b>132</b>
                        <span>说说</span>
                    </p>
                    <button>
                        关注
                    </button>
                </div>
            </div>
            <ul class="title-list">
                <li v-for="item of titleList">
                    <router-link :to="item.path+'?spaceTitle='+item.id" :class="{active:item.id == localTitle}">{{item.title}}</router-link>
                </li>
            </ul>
        </div>
        <div id="space-content">
            <div class="left-content">
                <div class="show-space">
                    <img src="../../assets/imgs/space/decoration.jpg" alt="装饰图片">
                </div>
                <div class="myView">
					<p class="viewTitle more-focus">
						我的关注
						<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
					</p>
					<ul class="viewCont">
						<li class="marginTop" v-for="item of peopleList">
							<img src="../../assets/imgs/space/headImg.png"/>
							<p>{{item.name}}</p>
						</li>
					</ul>
				</div>
				<div class="myView">
					<p class="viewTitle total-visitor">
						最近访客
						<span>26564次</span>
					</p>
					<ul class="viewCont">
						<li class="marginTop" v-for="item of peopleList">
							<img src="../../assets/imgs/space/headImg.png" />
							<p>{{item.name}}</p>
						</li>
					</ul>
					<div>
						<Page :total="40" size="small"></Page>
					</div>
				</div>
                <div class="visitor-total">
                    <p>今日访问量：<span>23</span></p>
                    <p>独立用户访问量：<span>561</span></p>
                    <p>学生访问量：<span>362</span></p>
                    <p>空间访问量：<span>46</span></p>
                </div>
                <div class="message">
                    <p>留言区</p>
                    <div>
                        <textarea placeholder="登录后即可留言……"></textarea>
                    </div>
                    <div>
                        <button class="comment" disabled>发表留言</button>
                    </div>
                    <ul>
                        <li v-for="item of messageList">
                            <img src="../../assets/imgs/space/defaultImg.png" alt="默认图片">
                            <div>
                                <p>
                                    <span class="name">{{item.name}}</span>
                                    <span class="time">{{item.time}}</span>
                                </p>
                                <p>{{item.file}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="message-page">
						<Page :total="40" size="small"></Page>
					</div>
                </div>
            </div>
            <div class="right-content">
                <div class="new-achievement">
                    <p class="common-title">
                        我的关注
						<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                    </p>
                    <ul>
                        <li v-for="item of newAchList">
                            <div class="list-title">
                                <b>【顶】</b>
                                <span>{{item.title}}</span>
                            </div>
                            <p class="list-content">
                                {{item.content}}
                            </p>
                            <div class="other-info">
                                <span>{{item.time}}</span>
                                <span>阅读</span>
                                <b>{{item.read}}</b>
                                <span>评论</span>
                                <b>{{item.comment}}</b>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="his-resource">
                    <p class="common-title">
                        他的资源
						<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                    </p>
                    <ul>
                        <li v-for="item of resourceList">
                            <p>
                                {{item.content}}
                            </p>
                            <div>
                                <Rate v-model="item.star"></Rate>
                                <span>{{item.total}}/{{item.all}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="his-dynamic">
                    <p  class="common-title">
                        他的动态
						<span>更多&nbsp;<Icon size="16px" color="#ccc" type="ios-arrow-thin-right"></Icon></span>
                    </p>
                    <ul>
                        <li v-for="item of dynamicList">
                            <img src="../../assets/imgs/space/defaultImg.png" alt="默认图片">
                            <div class="dynamic-content">
                                <p>
                                    <span class="name">{{item.name}}</span>
                                   {{item.from}}
                                </p>
                                <p>
                                    发表了
                                    <span class="file">
                                        {{item.file}}
                                    </span>
                                </p>
                            </div>
                            <div class="dynamic-operate">
                                <p>
                                    <span>赞</span>{{item.praise}}
                                    <span>转发</span>{{item.transmit}}
                                    <span>评论</span>
                                </p>
                                <p class="time">
                                    {{item.time}}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div class="more-dynamic">
                        <button id="load-more">加载更多</button>
                    </div>
                </div>
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>
<script>
import vFoot from '@/components/common/Footer'; 
export default {
    name:'ShowSpace',
    components:{            
        vFoot
    },
    data () {
        return {
            peopleList:[
				{id:1,name:'张三'},
				{id:2,name:'张三'},
				{id:3,name:'张三'},
				{id:4,name:'张三'},
				{id:5,name:'张三'},
				{id:6,name:'张三'},
				{id:7,name:'张三'},
				{id:8,name:'张三'},
				{id:9,name:'张三'},
				{id:10,name:'张三'}
			],
            star:5,
            titleList:[
                {id:'showSpace',title:'主页',path:'/ShowSpace'},
                {id:'myResource',title:'资源中心',path:'/MySpace/MyResource'},
                {id:'achievements',title:'学习成果',path:'/MySpace/Achievements'},
                {id:'myList',title:'通讯录',path:'/MySpace/MyList'}
            ],
            localTitle:'showSpace',
            newAchList:[
                {id:1,title:'期末考试复习的10大法宝',time:'2018-3-19',read:'5612',comment:'243',content:'期末考试是一种手段，检验知识、技能的掌握情况，也是对一学期学习成果的一次检验。平常学得扎实的同学到了这时就是大显身手的时候，证明自己的能力；平常学得不够好的同学通过考试能巩固知识，能看到自己的进步，那就是成功...'},
                {id:2,title:'期末考试复习的10大法宝',time:'2018-3-19',read:'5612',comment:'243',content:'期末考试是一种手段，检验知识、技能的掌握情况，也是对一学期学习成果的一次检验。平常学得扎实的同学到了这时就是大显身手的时候，证明自己的能力；平常学得不够好的同学通过考试能巩固知识，能看到自己的进步，那就是成功...'},
                {id:3,title:'期末考试复习的10大法宝',time:'2018-3-19',read:'5612',comment:'243',content:'期末考试是一种手段，检验知识、技能的掌握情况，也是对一学期学习成果的一次检验。平常学得扎实的同学到了这时就是大显身手的时候，证明自己的能力；平常学得不够好的同学通过考试能巩固知识，能看到自己的进步，那就是成功...'}
            ],
            resourceList:[
                {id:1,content:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',star:5,all:20,total:8},
                {id:2,content:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',star:5,all:20,total:8},
                {id:3,content:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',star:5,all:20,total:8},
                {id:4,content:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',star:5,all:20,total:8},
                {id:5,content:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',star:5,all:20,total:8}
            ],
            dynamicList:[
                {id:1,name:'余康',from:'华侨城中学',file:'一元一次方程求解',time:'2018-3-19  15:42:18',praise:1,transmit:2},
                {id:2,name:'余康',from:'华侨城中学',file:'一元一次方程求解',time:'2018-3-19  15:42:18',praise:1,transmit:2},
                {id:3,name:'余康',from:'华侨城中学',file:'一元一次方程求解',time:'2018-3-19  15:42:18',praise:1,transmit:2},
                {id:4,name:'余康',from:'华侨城中学',file:'一元一次方程求解',time:'2018-3-19  15:42:18',praise:1,transmit:2},
                {id:5,name:'余康',from:'华侨城中学',file:'一元一次方程求解',time:'2018-3-19  15:42:18',praise:1,transmit:2}
            ],
            messageList:[
                {id:1,name:'张涵',from:'华侨城中学',file:'上传了《一元一次方程式求解 》',time:'2018-3-19'},
                {id:2,name:'余康',from:'华侨城中学',file:'上传了《一元一次方程式求解 》',time:'2018-3-19'}
            ]
        } 
    }
}
</script>
<style scoped>
    #bg{
        width: 100%;
        padding-top: 80px;        
        min-height: 480px;
        background: url('../../assets/imgs/space/bg.png') no-repeat top center;
    }
    #my-space{
        width: 1200px;
        margin: auto;
    }
    .space-title{    
        min-height: 130px;
        background-color: #fff;
    }
    .space-title img{
        float: left;
        width: 140px;
        height: 140px;
        margin: -40px 20px 0 20px;
    }
    .my-info{
        float: left;
        font-size: 14px;
        color: #666;
    }
    .my-info p{
        margin-top: 40px;
        font-size: 16px;
        color: #50a7ff;
    }  
    .my-operate{
        float: right;
        margin-right: 60px;
        margin-top: 30px;
    }
    .my-operate p{
        float: left;
        text-align: center;
        border-right:1px solid #f3f3f3;
        margin-right: 25px;
        padding-right: 15px;
    }
    .my-operate p.no-line{
        border-right: none;
         margin-right: 15px;
    }
    .my-operate p b{
        display: block;
        font-size: 20px;
        color: #333;
        font-weight: normal;
    }
    .my-operate button{
        width: 100px;
        height: 40px;
        color: #fff;
        background-color: #1caaf1;
        border-radius: 5px;
        border:none;
        font-size: 16px;
        cursor: pointer;
    }
    .my-operate button:focus{
        outline: none;
    }
    .title-list{
        overflow: hidden;
        width: 100%;
        background-color: #fff;
        padding-left: 40px;
    }
    .title-list li{
        float: left;
    }
    .title-list li a{
        display: inline-block;
        padding: 0 25px 20px;
        font-size: 16px;
        color: #333;  
        cursor: pointer;      
    }
    .title-list li a.active{
        color: #50a6ff; 
        border-bottom:2px solid #50a6ff; 
    }
    .myView{
		width: 100%;
		padding: 40px 20px 0;
		background: #FFFFFF;
		margin-bottom: 10px;
		border: solid 1px #dfe4e9;
	}
	.viewTitle{
		font-size: 16px;
		color: #3f4449;
		margin-bottom: 30px;
	}
	.viewTitle span{
		font-size: 14px;
		color: #3F4449;
		float: right;
	}
	.more-focus span{
		margin-top: 5px;
	}
	.total-visitor span{
		margin-top: 5px;
		color: #7b8085;
	}
	.viewCont{
		width: 100%;
		overflow: hidden;
	}
	.viewCont li{
		float: left;
		width: 33%;
		text-align: center;
		margin-bottom: 25px;
	}
	.viewCont li img{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.viewCont li p{
		font-size: 14px;
		color: #7b8085;
	}
	.myView>div{
		text-align: center;
		font-size: 14px;
		margin-bottom: 30px;
	}
    #space-content{
        margin-top: 20px;
        width: 1200px;
        margin: auto;
        overflow: auto;
    }
    #space-content .left-content{
        float: left;
        width: 240px;
    }
    .show-space{
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .visitor-total{
        background-color: #fff;
        padding: 28px 0 28px 20px;
        border: 1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .visitor-total p{
        line-height: 30px;
    }
    .visitor-total p span{
        font-size: 16px;
        color: #409eff;
        margin-left: 5px;
    }
    .message{
        margin-top: 10px;
        margin-bottom: 60px;
        background-color: #fff;
        border: 1px solid #e9e9e9;
    }
    .message>p{
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 20px;
        color: #333;
        border-bottom:1px solid #e9e9e9;
    }
    .message>div{
       padding: 10px 20px 0;       
    }
    .message div textarea{
       display: inline-block;
       width: 200px;
       height: 60px;
       padding-top: 5px;
       padding-left: 5px;
       border-color:#e9e9e9;       
    }
    .message button{
       display: inline-block;
       width: 200px;
       height: 40px;
       border:none;
       background-color: #ccc; 
       font-size: 16px;
       color: #fff;    
       cursor: pointer;
    }
    .message>ul{
        padding: 0 20px;
    }
    .message ul li{
        height: 100px;
        border-bottom: 1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .message ul li:last-child{        
        border-bottom:none;
    }
    .message ul li>img{
        float: left;
        margin-right: 20px;
        margin-top: 20px;
    }
    .message ul li>div{
        float: left;
        width: 130px;
    }
    .message ul li>div p{
        font-size: 14px;
        color: #666;
        margin-top: 5px;
    }
    .message ul li>div p:first-child{
        margin-top: 20px;
    }
    .message ul li .name{        
        font-size: 16px;
        color: #1cb0ea;
    }
    .message ul li .time{   
        float: right;     
        font-size: 12px;
        color: #999;
        margin-top: 3px;
    }
    .message-page{
        margin-bottom: 20px;
    }
    #space-content .right-content{
        float: right;
        width: 940px;
        margin-top: 20px;
    }
    .common-title{
        padding: 20px 40px;
        font-size: 20px;
        color: #333;
        border-bottom:1px solid #f3f3f3;
    }
    .common-title span{
        float: right;
        margin-top: 8px;
        font-size: 14px;
        color: #7b8085;
        cursor: pointer;
    }
    .new-achievement,.his-resource,.his-dynamic{
        background-color: #fff;
        border:1px solid #e9e9e9;
        margin-bottom: 10px;
    }
    .new-achievement ul{
        padding: 0 40px;
    }
    .new-achievement ul li{
        height: 120px;
        border-bottom:1px solid #e9e9e9;
    }
    .new-achievement ul li:last-child{
        border-bottom: none;
    }
    .list-title{
        font-size: 14px;
        color: #333;
        margin-bottom: 5px;
        margin-top: 20px;
    }
    .list-title b{
        color:#50a6ff;
    }
    .list-content{
        font-size: 14px;
        color:#666;
        line-height: 26px;
        text-indent: 30px;
    }
    .other-info{
        margin-top: 10px;
        text-align: right;
        font-size: 14px;
        color: #999;
    }
    .other-info span{
        margin-left: 30px;
        margin-right: 5px;
    }
    .other-info b{
        color: #50a6ff;
        font-weight: normal;
    }
    .his-resource ul{
        padding: 0 40px;
    }
    .his-resource ul li{
        height: 50px;
        padding-top: 16px;
        font-size: 14px;
        color: #666;
        border-bottom:1px solid #e9e9e9;
    }
    .his-resource ul li:last-child{
       border-bottom: none;
    }
    .his-resource ul li p{
        float: left;
        width: 512px;
        text-overflow:ellipsis;
        white-space:nowrap; 
        overflow:hidden; 
    }
    .his-resource ul li>div{
        float: left;
        margin-left: 170px;
    }
    .his-resource ul li>div>span{
        color: #999;
        margin-left: 5px;
    }
    .his-dynamic{
        margin-bottom: 60px;
    }
    .his-dynamic ul{
        padding: 0 40px;
    }
    .his-dynamic ul li{
        height: 90px;
        padding-right: 10px;
        padding-top: 20px;
        border-bottom:1px solid #e9e9e9;
        font-size: 14px;
        color: #666;
    }
    .his-dynamic ul li:last-child{
        border-bottom:none;
    }
    .his-dynamic ul li img{
        float: left;
        margin-right: 20px;
    }
    .dynamic-content{
        float: left;
    }
    .dynamic-content .name{
        font-size: 16px;
        color: #1cb0ea;
        margin-right: 18px;
    }
    .dynamic-content .file{
        color: #1cb0ea;
        margin-left: 10px;
    }
    .dynamic-operate{
        float: right;
    }
    .dynamic-operate span{
        color: #1cb0ea;
        margin-left: 20px;
        margin-right: 10px;
    }
    .dynamic-operate span:last-child{
        margin-right: 0;
    }
    .dynamic-operate .time{
        text-align: right;
        color: #999;
        font-size: 12px;
        margin-top: 8px;
    }
    .more-dynamic{
        text-align: center;
        margin: 20px 0;
    }
    #load-more{
		width: 140px;
		height: 40px;
		border: solid 1px #dfe4e9;
		color: #999;
		font-size: 14px;
		background-color: transparent;
		border-radius: 3px;
		cursor: pointer;
	}
	#load-more:focus{
		outline: none;
	}
</style>


