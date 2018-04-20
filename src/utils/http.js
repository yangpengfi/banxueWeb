apiGet(url){
    return new Promise((resolve, reject) => {
        this.$http.get(url).then((res) => {
            if(res.status != 200){
                this.$Message.error('请求失败请重试');
            }else{
                resolve(res.data);
            }	
            
        }).catch((res) => {
            alert(res);
        })
    })
};
apiPost(url, data){
    return new Promise((resolve, reject) => {
        this.$http.post(url, this.$qs.stringify(data)).then((res) => {
            if(res.status != 200){
                this.$Message.error('请求失败请重试');
            }else{
                resolve(res.data);
            }	
            
        }).catch((res) => {
            alert(res);
        })
    })
}

export default {
	apiPost,
	apiGet
}