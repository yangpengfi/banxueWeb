<script type="text/javascript">
const per2gradeList=[
			      {id:1,name:"高中",gradeList:[{id:10,name:"高一"},{id:11,name:"高二"},{id:12,name:"高三"},]},
            {id:2,name:"初中",gradeList:[{id:7,name:"初一"},{id:8,name:"初二"},{id:9,name:"初三"},]},
            {id:3,name:"小学",gradeList:[{id:1,name:"一年级"},{id:2,name:"二年级"},{id:3,name:"三年级"},{id:4,name:"四年级"},{id:5,name:"五年级"},{id:6,name:"六年级"}]},
            {id:0,name:"专题",gradeList:[{id:13,name:"小升初"},{id:14,name:"中考"},{id:15,name:"高考"}]}
            ];
const gradeList=[
  {id:1,name:"一年级"},
  {id:2,name:"二年级"},
  {id:3,name:"三年级"},
  {id:4,name:"四年级"},
  {id:5,name:"五年级"},
  {id:6,name:"六年级"},
  {id:7,name:"初一"},
  {id:8,name:"初二"},
  {id:9,name:"初三"},
  {id:10,name:"高一"},
  {id:11,name:"高二"},
  {id:12,name:"高三"}
];            
const subjectList=[               
                {id:1,name:'语文'},
                {id:2,name:'数学'},
                {id:3,name:'英语'},
                {id:4,name:'物理'},
                {id:5,name:'化学'},
                {id:6,name:'地理'},
                {id:7,name:'历史'},
                {id:8,name:'政治'},
                {id:9,name:'生物'},
            ];
const colorList = [
  '#58c33b',
  '#83a9ff',
  '#83a9ff',
  '#1cb0ea',
  '#bb73ff',
  '#e7c332',
  '#ff8383',
  '#ffa751',
  '#3bc385',
  '#808080',
];
const bgColorList = [
  '#00a7e9',
  '#5984e5',
  '#34ac75',
  '#d7ac00',
  '#984fdd',
  '#ff8383',
  '#3f9d26',
  '#ffa751',
  '#ee8600',
  '#808080'
];
function getBaseUrl() {
            var host=window.location.host;
            var pathnameArr=window.location.pathname.split('/');
             return 'http://'+host+'/'+pathnameArr[1]; 
        }
function setFileType(fileType,size){
    let baseUrl=getBaseUrl();
    let imgUrl=baseUrl;
    switch(fileType){
        case 'doc':
        case 'docx':
            imgUrl+='/static/imgs/resource/fileDoc.png';
            break;
        case 'jpg':
          imgUrl+='/static/imgs/resource/fileJpg.png';
          break;
        case 'mp3':
          imgUrl+='/static/imgs/resource/fileMp3.png';
          break;
        case 'pdf':
          imgUrl+='/static/imgs/resource/filePdf.png';
          break;
        case 'png':
          imgUrl+='/static/imgs/resource/filePng.png';
          break;
        case 'ppt':
        case 'pptx':
          imgUrl+='/static/imgs/resource/filePpt.png';
          break;
        case 'rar':
          imgUrl+='/static/imgs/resource/fileRar.png';
          break;
        case 'txt':
          imgUrl+='/static/imgs/resource/fileTxt.png';
          break;
        case 'mp4':
        case 'flv':
        case 'wav':
        case 'avi':
        case 'mkv':
        case 'rmvb':
          imgUrl+='/static/imgs/resource/fileVideo.png';
          break;
        case 'xls':
        case 'xlsx':
          imgUrl+='/static/imgs/resource/fileXls.png';
          break;
        case 'zip':
          imgUrl+='/static/imgs/resource/fileZip.png';
          break;
        default:
          imgUrl+='/static/imgs/resource/fileunkonw.png';
    }
    if(size==1){//1:小图，其他：大图
        let splitIdx=imgUrl.lastIndexOf('.');
        imgUrl=imgUrl.substr(0,splitIdx)+'1'+imgUrl.substr(splitIdx);
    }
    return imgUrl;
}
function setCourseImg(subType){
    let baseUrl=getBaseUrl();
    let imgUrl=baseUrl;
    switch(subType){
        case 1:
            imgUrl+='/static/imgs/course/语文.png';
            break;
        case 2:
          imgUrl+='/static/imgs/course/数学.png';
          break;
        case 3:
          imgUrl+='/static/imgs/course/英语.png';
          break;
        case 4:
          imgUrl+='/static/imgs/course/物理.png';
          break;
        case 5:
          imgUrl+='/static/imgs/course/化学.png';
          break;
        case 6:
          imgUrl+='/static/imgs/course/地理.png';
          break;
        case 7:
          imgUrl+='/static/imgs/course/历史.png';
          break;
        case 8:
          imgUrl+='/static/imgs/course/政治.png';
          break;
        case 9:
          imgUrl+='/static/imgs/course/生物.png';
          break;
        default:
          imgUrl+='/static/imgs/course/其他.png';
    }
    return imgUrl;
}
const colorListLength =10;
function getRandColor () {
  var tem = Math.floor(Math.random() * colorListLength)
  return colorList[tem]
}
function getCoursebgColor () {
  var tem = Math.floor(Math.random() * colorListLength)
  return bgColorList[tem]
}  
function formatSize(limit){  
            var size = "";  
            if( limit < 0.1 * 1024 ){ //如果小于0.1KB转化成B  
                size = limit.toFixed(2) + "B";    
            }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成KB  
                size = (limit / 1024).toFixed(2) + "KB";              
            }else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成MB  
                size = (limit / (1024 * 1024)).toFixed(2) + "MB";  
            }else{ //其他转化成GB  
                size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";  
            }  
            
            var sizestr = size + "";   
            var len = sizestr.indexOf("\.");  
            var dec = sizestr.substr(len + 1, 2);  
            if(dec == "00"){//当小数点后为00时 去掉小数部分  
                return sizestr.substring(0,len) + sizestr.substr(len + 3,2);  
            }  
            return sizestr;  
        } 
function formatTime(input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();
      return  year+ '-' + month + '-' + day;
    }    

//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
//例子：
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
 var o = {
     "M+": this.getMonth() + 1, //月份
     "d+": this.getDate(), //日
     "h+": this.getHours(), //小时
     "m+": this.getMinutes(), //分
     "s+": this.getSeconds(), //秒
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度
     "S": this.getMilliseconds() //毫秒
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
     if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}  		

function login(){
  this.$router.replace({
     name:"Login",
     query: {redirect: this.$router.currentRoute.fullPath}
    })
}
export default
{
  per2gradeList,
  gradeList,
  subjectList,
  colorList,
  bgColorList,
  colorListLength,
  getRandColor,
  getCoursebgColor,
  formatSize,
  formatTime,
  setCourseImg,
  login,
  setFileType
}
</script>