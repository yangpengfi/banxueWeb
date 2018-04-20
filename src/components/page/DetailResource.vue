<template>
  <div>
      <div class="search-container">
          <div class="left">
            <div class="article-box">
                <div class="article">
                    <h2>岭东书画院院长陈锦雄（激夫）一行莅临丰顺县丰</h2>
                    <p>是一座破落的小院。小院的地势其实并不低，只是因为四周邻居咄咄逼人的高楼，才硬是让小院感觉到自己正陷于山谷里。</p>
                    <p>小院里只有一座孤零零的东屋。堂屋早在多年前，一场暴雨的疯狂肆虐后不得不拆掉了。现在那寂寞冷清的地基上堆满了柴禾和杂物。一株从地基的边缘窜出来的灌木似乎并不嫌弃小院的卑微，蓬蓬勃勃地生长着，这才让小院有了一点点儿生机。东屋也是很多年前用土呸砌起来的那种，低矮窄小，虽也算不上牢固但相对还算安稳，总算能让这位风蚀残年的老人有个安身的窝。</p>
                    <p>老人年轻时也曾结过一次婚，还有过一个孩子。后来妻子莫名离家出走，不久，孩子又不幸夭折，从此老人便开始了漫长而孤寂的独居生活。老人原本身体硬朗，一直跟着一家建筑队干活，起早贪黑的，慢慢地也小有积蓄。堂屋的重建也在他的计划之中。然而生命中的悲怆从未结束。在一次清晨的上班途中，一场突如其来的车祸彻底改变了老人的后半生。从医院里出来的老人已经变得一无所有包括他的健康。一根从柴禾堆上捡出来的木棍成了他的拐杖。有时天气好点儿的时候，他就凭借这根免费的手杖来到街口晒晒太阳。常常就会有经过的村里人边走边狐疑地久久打量着这个形容枯槁的老头，末了，他们总是大吃一惊地猛然驻足：喂，这不是刘来福吗？!怎么成这幅吊样子了？老人总是抬起.一只勉强还能睁开的眼睛无奈地笑笑。</p>
                    <p>老人的身体一天不比一天。生活也一天天拮居起来。他要计算每天的午饭是买新鲜面条呢还是要步履蹒跚地到远一点的小卖铺里买挂面划算。他要计算一天必须烧几块煤球才能让余下的熬过整个寒冷的冬季。毕竟他现在的生活只能指靠每月的几十块养老金了，能省几个钢镚就省几个钢镚。老人也许是这十里八乡唯一不用洗衣机的人。以前手脚灵活的时候真不觉得没多大不方便，但现在仅洗衣服这件事就已变得异常困难。老人越来越落魄起来了。脏兮兮的衣服看起来真让人心生厌恶 ，特别是对老人的那位邻居来说。老人的邻居是位身材挺拔的老者，素有洁癖。不说在中央身居要职的儿子如何让他常常自豪地在众人面前口若悬河，就说他刚刚俊工的三层欧式小楼也已经让他在村里鹤立鸡群了。那设计！那装修！真真甩村里其他人好几条街。邻居和老人之间是从不用打招呼的，即使他们两人就在家门口碰面。</p>
                    <p>一日天气突变，呼啸而至的北风让气温陡然降了下来。傍晚时分，风终于停止了怒吼，雪却不期而至……"</p>
                    <div v-if="isMember">
                        <b>如需阅读或下载完整版，请登录APP</b>
                        <span>开通会员</span>
                    </div>
                </div>
                <div class="from">
                    <span>贡献者：</span>灵活的小胖子
                    <span>贡献时间：</span>2018-3-12
                    <span>所在学校：</span>华侨城中学
                    <Rate v-model="articleStar" class="rate"></Rate>
                </div>
                <div class="operate-article">
                    <a href="javascript:void(0);">收藏</a>
                    <a href="javascript:void(0);">下载</a>
                </div>
            </div>
            <div class="comment-box">
                <div class="comment">
                    <textarea  rows="8" placeholder="发表你的精彩评论啦"></textarea>
                    <button>发表评论</button>
                </div>
                <div class="res-quality"><span>资源质量：</span> <Rate v-model="recommendStar"></Rate></div>
                <div class="comment-list">
                    <div>
                        <p>评论<span> （82条）</span></p>
                    </div>
                    <ul>
                        <li v-for="item of commentList">
                            <p class="left"><img src="/static/imgs/resource/fileXls.png"  alt="头像"></p>
                            <div class="left">
                                <div class="comment-title">
                                    <span>{{item.name}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                                <p class="comment-content">{{item.comment}}</p>
                                <p>
                                    <Rate v-model="item.star"></Rate>
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
          </div>
          <div class="right">               
               <div class="recommend-list">
                    <p><span></span><b>推荐搜索</b></p>
                    <ul>
                        <li v-for="item of recommendSearch">
                            <img src="/static/imgs/resource/fileXls.png" alt="资源图标">
                            <div>
                                <p>{{item.title}}</p>
                                <Rate v-model="item.star"></Rate>
                            </div>
                        </li>
                    </ul>
               </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'DetailResource',
    data(){
        return{
            articleStar:5,
            recommendStar:0,
            recommendSearch:[
                {title:'高考快速提分秘籍',star:3},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:5},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:4},
                {title:'高考快速提分秘籍',star:3}
            ],
            commentList:[
                {id:1,name:'灵活的小胖子',time:'2018-4-13 / 14：36：39',star:5,comment:'写的很好，喜欢孙悟空，但不喜欢《悟空传》这部电影，看过小说，里面的悟空也曾有过一段黑暗的时光，忘记了一切，遇到曾经并肩作战过的同伴还当成妖怪要打死，比《西游记》里的凄惨要更让人心疼，结局也是唏嘘不已，《悟空传》好的地方是每个人看都有不同的感悟，这是那部电影做不到的。'},
                {id:2,name:'灵活的AAA',time:'2018-4-13 / 14：36：39',star:5,comment:'写的很好，喜欢孙悟空，但不喜欢《悟空传》这部电影，看过小说，里面的悟空也曾有过一段黑暗的时光，忘记了一切，遇到曾经并肩作战过的同伴还当成妖怪要打死这是那部电影做不到的。'},
                {id:3,name:'灵活的BBB',time:'2018-4-13 / 14：36：39',star:5,comment:'写的很好，喜欢孙悟空，但不喜欢《悟空传》这部电影，看过小说，遇到曾经并肩作战过的同伴还当成妖怪要打死，比《西游记》里的凄惨要更让人心疼，结局也是唏嘘不已，《悟空传》好的地方是每个人看都有不同的感悟，这是那部电影做不到的。'},
                {id:4,name:'灵活的CCC',time:'2018-4-13 / 14：36：39',star:5,comment:'写的很好，喜欢孙悟空，但不喜欢《悟空传》这部电影，看过小说，里面的悟空也曾有过一段黑暗的时光。'}
            ],
            isMember:false
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
    .search-container{
        width: 1200px;
        margin: auto;
        margin-top: 40px;
        margin-bottom: 80px;
        overflow: hidden;
    }
    .search-container>.left{
        width: 820px;
        border:1px solid #e9e9e9;
        background-color: #fff;        
    }    
    .search-container>.right{        
        width: 360px;        
    }  
    .article-box{
        padding: 40px 60px 0;
    }
    .recommend-list{
        padding: 35px 20px 0;
        background-color: #fff;
        border:1px solid #e9e9e9;
    }
    .recommend-list>p{
        font-size: 20px;  
        margin-bottom: 30px;   
        height: 30px;
        line-height: 30px;  
        vertical-align: middle;   
    }
    .recommend-list span{
        float: left;
        height: 100%;
        margin-right: 20px;
        border-left: 2px solid #0098e0;
    }
    .recommend-list b{
        float: left;
        font-weight: normal;        
    }
    .search-container>.right ul li{
        overflow: hidden;
        height: 60px;
        border-bottom: 1px solid #f8f8f8;
        margin-bottom: 20px;    
    }
    .search-container>.right ul img{
        float: left;
        width: 40px;
        height: 40px;
    }
    .search-container>.right ul li>div{
        float: left;
        margin-left: 10px;        
    }
    .article{
        position: relative;
    }
    .article h2{
        color: #333;
        font-size: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid #f8f8f8;
        margin-bottom: 16px;
    }
    .article p{
        font-size: 14px;
        line-height: 28px;
        text-indent:50px;
        color: #666;
    }
    .article>div{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100px;
        line-height: 100px;
        text-align: center;
        background-color: #fff;
        color: #333;
        font-size: 16px;
        box-shadow: 0px 3px 5px 0px rgba(255, 255, 255, 0.2);
    }
    .article>div b{
       font-weight: normal;
    }
    .article>div span{
        color: #ffad27;
        text-decoration: underline;
    }
    .from{
        margin-top: 60px;
        font-size: 14px;
        color: #999;
    }
    .from span{
        margin-left: 30px;
    }
    .from span:first-child{
        margin-left: 0;
    }
    .rate{
        margin-left: 40px;
    }
    .operate-article{
        text-align: center;
        margin-top: 30px;
    }
    .operate-article a{
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        border-radius: 5px;
        border: 1px solid #ff7171;
        color: #ff7171;
    }
    .operate-article a:last-child{
        margin-left: 20px;
        border-color:#32b9ff;
        color: #32b9ff;
    }
    .comment-box{
        padding: 50px 60px 0;
        margin-top: 15px;
        border-top: 1px solid #e9e9e9;
    }
    .comment{
        overflow: hidden;
    }
    .comment textarea{
        float: left;
        width: 500px;
        border-radius: 5px;
        border:1px solid #dfe4e9;
        padding: 10px;
    }
    .comment button{
        float: left;
        width: 140px;
        height: 40px;
        background-color: #b7bcc1;
        border-radius: 5px;
        color: #fff;
        font-size: 16px;
        border:none;
        margin-top: 40px;
        margin-left: 20px;
    }
    .res-quality{
        font-size: 16px;
        margin-top: 8px;
        color: #3f4449;
        margin-bottom: 90px;
    }
    .comment-list>div{
        overflow: hidden;
        font-size: 24px;
        color: #7b8085;
        border-bottom:1px solid #dfe4e9;       
    }
    .comment-list>div p{
        float: left;
        border-bottom:1px solid #7b8085;
        padding-bottom: 15px;
    }
    .comment-list>div span{
        font-size: 14px;
        color: #3f4449;
    }
    .comment-list ul{
        padding-top: 30px;
    }
    .comment-list ul li{
        overflow: hidden;
        padding-bottom: 20px;
        padding-top: 10px;
        border-bottom:1px solid #f8f8f8;
    }    
    .comment-list ul li img{
        width: 40px;
        border-radius: 50%;
        margin-right: 40px;
    }
    .comment-list ul li>div{
        width: 600px;
    }  
    .comment-title{
        margin-bottom: 15px;
    }  
    .comment-title span:first-child{
        font-size: 16px;
        color: #008fd5;
    }
    .comment-title span:last-child{
        float: right;
        color: #b7bcc1;
        font-size: 14px;
    }
    .comment-content{
        line-height: 28px;
        font-size: 14px;
    }
</style>


