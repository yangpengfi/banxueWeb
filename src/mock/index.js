import Mock from 'mockjs'

var Random = Mock.Random;

const testStu = Mock.mock('http://test.cn','post',{
	'date':Random.date('yyyy-MM-dd'),
	'name':'@cname',
	'age|1-100':100
})
const newClassesList = Mock.mock('http://newClasses.cn','get',{
	'classesList|8' :[{
			'img':() => Random.dataImage( '200x100', 'hello mockjs'),
			'title':() => Random.ctitle( 10,15),
			'price|50-100':100
	}]	
})
const recomClassesList = Mock.mock('http://recommendClasses.cn','get',{
	'classesList|8' :[{
			'img':() => Random.dataImage('200x100', 'Hello Mock.js!'),
			'title':() => Random.ctitle( 10,15),
			'price|50-100':100
	}]	
})
const hotClassesList = Mock.mock('http://hotClasses.cn','get',{
	'classesList|4' :[{
			'img':() => Random.dataImage( '200x100', 'hello mockjs'),
			'title':() => Random.ctitle( 10,15),
			'price|50-100':100
	}]	
})
const specialClassesList = Mock.mock('http://specialClasses.cn','get',{
	'classesList|4' :[{
			'img':() => Random.dataImage( '32x30', '数'),
			'title':() => Random.ctitle(10,15),
			'num|50-100':100
	}]	
})
const hightClassesList = Mock.mock('http://highClasses.cn','get',{
	'classesList|4' :[{
			'img':() => Random.dataImage('32x30', '数'),
			'title':() => Random.ctitle(10,15),
			'num|50-100':100
	}]	
})
const famousLecture = Mock.mock('http://famousLecture.cn','get',{
	'classesList|8' :[{
			'img':() => Random.dataImage('34x34', 'DOC'),
			'title':() => Random.ctitle(10,15)
	}]	
})
const newRourceList = Mock.mock('http://newResource.cn','get',{
	'classesList|10' :[{
			'img':() => Random.dataImage('34x34', 'EXCEL'),
			'title':() => Random.ctitle(10,15),
			'date':()=> Random.date('MM-dd'),
			'num|50-200':200
	}]	
})
const hotRourceList = Mock.mock('http://hotResource.cn','get',{
	'classesList|10' :[{
			'img':() => Random.dataImage('34x34', 'EXCEL'),
			'title':() => Random.ctitle(10,15),
			'date':()=> Random.date('MM-dd'),
			'num|50-200':200
	}]	
})
export default {
	testStu,
	newClassesList,
	recomClassesList,
	hotClassesList,
	hightClassesList,
	specialClassesList,
	famousLecture,
	newRourceList,
	hotRourceList
}