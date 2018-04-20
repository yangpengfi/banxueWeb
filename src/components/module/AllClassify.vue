<template>
  <div id="article-content">
		<p class="article-btn">
			<button @click="toWrite">写日志</button>
			<button @click="showBatch" :class="{active:ifBatch==true}">批量管理</button>
		</p>
		<div class="batch-modify" v-if="ifBatch">
			<Checkbox v-model="single">全选</Checkbox>
			<span>设置权限</span>
			<span>修改分类</span>
			<span>删除</span>
		</div>			
		<ul class="content-list">
			<li v-for="item of articleList">					
				<p class="left contLink">
					<Checkbox v-model="single" v-if="ifBatch"></Checkbox>
					{{item.title}}
				</p>
				<div class="right">
					<span>{{item.date}}</span>
					<span class="nums">{{item.num}}/{{item.total}}</span>												
				</div>
				<div class="edit">
					<p class="edit-title">
						<span>编辑</span> 
						<Icon type="arrow-down-b" color="#1caaf1"></Icon>
					</p>
					<div class="edit-content">
						<span>设置权限</span>
						<span>删除文章</span>
						<span>修改分类</span>
						<span>置顶</span>
					</div>
				</div>										
			</li>				
		</ul>			
	</div>
</template>
<script>
export default {
    name:'AllClassify',
    data(){
        return {
            articleList:[
				{title:'《素书》相传为秦末黄石公作。民间视为奇书、天书。《素书》以道家思想为宗旨。',date:'2018-3-17',total:'20',num:'8'},
				{title:'睡虎地秦墓竹简，又称睡虎地秦简、云梦秦简，是指1975年12月在湖北省云……',date:'2018-3-17',total:'20',num:'8'},
				{title:'渊海子平》由宋代徐大升依据东海徐子平先师论命成果而编著。是八字命理……',date:'2018-3-17',total:'20',num:'8'},
				{title:'《棋经十三篇》是宋朝时出现的一部在我国围棋发展史上占有特殊地位的著作。',date:'2018-3-17',total:'20',num:'8'},
				{title:'《吕氏春秋》是秦国丞相吕不韦主编的一部古代类百科全书似的传世巨著，有……',date:'2018-3-17',total:'20',num:'8'},
				{title:'《春秋公羊传》，儒家经典之一。古代汉族今文经学重要典籍。上起鲁隐公元……',date:'2018-3-17',total:'20',num:'8'},
				{title:'《尔雅》是第一部词典，“尔”是“近”的意思（后来写作“迩”），“雅”是……',date:'2018-3-17',total:'20',num:'8'},
				{title:'《素书》相传为秦末黄石公作。民间视为奇书、天书。《素书》以道家思想为宗旨。',date:'2018-3-17',total:'20',num:'8'},
				{title:'孩子沉迷手机？聪明家长都这样做，简单有效！',date:'2018-3-17',total:'20',num:'8'},
				{title:'渊海子平》由宋代徐大升依据东海徐子平先师论命成果而编著。是八字命理……',date:'2018-3-17',total:'20',num:'8'},
			],
			single:false,			
			ifBatch:false
        }
    },
    methods:{
		showBatch(){
			if(!this.ifBatch){
				this.ifBatch = true;
				this.single = false;				
			}else{
				this.ifBatch = false;
				
			}
		},
		toWrite(){
			this.$router.push('/MySpace/WriteArticle');
		}
	}   
}
</script>


