import Mock from 'mockjs'

var Random = Mock.Random;

export default Mock.mock('http://test.cn','post',{
	'date':Random.date('yyyy-MM-dd'),
	'name':'@cname',
	'age|1-100':100
})