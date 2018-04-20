<template>
  <div>
  	<div id="leftTree">
        <div class="leftHead" @click="showSel">
            <span class="leftTitle">{{per2sub}} <br> <small :title="ver2text">{{ver2text}}</small></span>
            <i class="fa fa-chevron-down"></i>
            <div class="selDown">
                <p>
                    <span>学 段：</span>
                    <select v-model="sel.periodId" id="pre">
                        <option value="0">请选择学段</option>
                        <option value="3">小学</option>
                        <option value="2">初中</option>
                        <option value="1">高中</option>
                    </select>
                </p>
                <p>
                    <span>学 科：</span>
                    <select v-model="sel.subjectId" id="sub">
                        <option value="0">请选择学科</option>
                        <option v-for="item in subList" :value="item.subjectId">{{item.subjectName}}</option>
                    </select>
                </p>
                <p>
                    <span>版 本：</span>
                    <select v-model="sel.versionId" id="ver">
                        <option value="0">请选择版本</option>
                        <option v-for="item in verList" :value="item.id">{{item.name}}</option>
                    </select>
                </p>
                <p>
                    <span>册 别：</span>
                    <select v-model="sel.textbookId" id="tex">
                        <option value="0">请选择册别</option>
                        <option v-for="item in textList" :value="item.textbookId">{{item.textbookName}}</option>
                    </select>
                </p>
                <p class="text-center">
                    <span class="bxw-btn-info-xs" @click.stop="mySure">确定</span>
                </p>
            </div>
        </div>
        <ul id="chapTree" class="ztree"></ul>
    </div>
  </div>
</template>


<script>
  export default {

  }
</script>

<style scoped>
.leftHead{
    width: 220px;
    padding: 10px 20px;
    background-color: #1caaf1;
    text-align: center;
    position: relative;
}
.leftTitle{
    font-size: 16px;
    color: #fff;
    display: inline-block;
    line-height: 24px;
    max-width: 160px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.leftHead>i{
    color:#fff;
    font-size: 16px;
    position: absolute;
    top:calc(50% - 8px);
    right: 10px;
}
.selDown{
    text-align: left;
    position: absolute;
    top:70px;
    left:0;
    width: 220px;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid #e9e9e9;
    background-color: #f8f8f8;
    z-index: 10;
    display: none;
}
.selDown>p{
    line-height: 40px;
}
.selDown>p select{
    width: 125px;
    height: 30px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    padding-left: 7px;
    color: #666;
}
.bxw-btn-info-xs{
    display: inline-block;
    padding:0 25px;
    margin-top: 15px;
    height: 30px;
    line-height: 30px;
    border-radius: 4px;
    color:#fff;
    cursor: pointer;
    text-decoration: none;
    background-color: #1daaf3;
}
</style>