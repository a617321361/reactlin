function Clajax(url,type,params,callback){
	if(!url||!type||url==''||type==''){
		callback('url或type参数错误！',false);
	}else{
		$.ajax({
			url:'http://123.126.111.100:9006'+url,
			type:type,
			data:JSON.stringify(params),
			dataTypr:'json',
			success:function(res){
				callback(res,true)
			},
			error:function(res){
				callback(res,false)
			},
		})
	}
}

function Clajax1(url,type,params,callback){
	if(!url||!type||url==''||type==''){
		callback('url或type参数错误！',false);
	}else{
		$.ajax({
			url:'http://192.168.50.202:8090'+url,
			type:type,
			data:JSON.stringify(params),
			dataTypr:'json',
			success:function(res){
				callback(res,true)
			},
			error:function(res){
				callback(res,false)
			},
		})
	}
}