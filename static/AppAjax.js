


function Clajax(url,type,params,callback){
	if(!url||!type||url==''||type==''){
		callback('url或type参数错误！');
	}else{
		$.ajax({
			url:liveBackStage.common.webLogin+url,
			type:type,
			data:params,
			dataTypr:'json',
			success:function(res){
				callback(res)
			},
			error:function(res){
				callback(res)
			},
		})
	}
}