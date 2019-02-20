import app from  '../fengui/util/apiClient.js'
// import { JSEncrypt } from './RSA.js'//RSA加密
// import {beginMD5} from './md5.js'

// 获取性别
export function getPolicy () {
    return app.get('/enum-sex')
}

//获取保费
export function getprice (uuid,form) {
    return app.post('/products/premium/'+uuid,form)
}


//获取代理人
export function getdlr (uuid) {
    return app.get('/h5/agentusers/'+uuid)
}




//获取天气信息
export function getweather (citycode) {
    return app.get('http://t.weather.sojson.com/api/weather/city/'+citycode,'',true)
}



