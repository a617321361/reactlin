var $ = require('jquery');
var Promise = require('bluebird');
var baseUrl = 'https://api.henzfin.com';

import fjApp from "fengui/component/fjApp";
import browserEnv from "./browserEnv";
import * as analysis from 'fengui/util/analysis';

require('jquery.cookie');

function parseResponse(jqResult, url) {
  return Promise.resolve(jqResult).then(function (result) {
   
    const originError = result.error;

    if (!originError) {
      // console.log(55,result)
      return result;
    }

    let error = new Error(originError.message);
    error.code = originError.code;
    
    if (error.code === 102) {
      // 需要登录
      if (browserEnv.isInApp()) {
        fjApp.login(function () {
          fjApp.getUser(function (user) {
            $.cookie('token', user.token, {path: '/'});
            location.reload();
          });
        });
        throw error;
      } else {
        location.href = `/re/account/login?rd=${encodeURIComponent(location.href)}`;
      }
    } else {
      throw error;
    }
  }, function (error) {
    // console.log(error)
    var status = error.status;
    analysis.trackEventValue('re_apiv2_status_error', {url, status});

    error = new Error('网络异常/接口失败');
    error.code = 0;
    
    throw error;
  });
}


export default {

  post(url, data,bol) {
    console.log(888,bol)
    let newbaseurl='';
    if(!bol){
      newbaseurl=baseUrl;
    }
    return parseResponse($.ajax(newbaseurl + url, {
      contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(data),
      timeout: 1000 * 30,
    }), url);
  },

  get (url, data,bol) {
    console.log(888,bol)
    let newbaseurl='';
    if(!bol){
      newbaseurl=baseUrl;
    }
    return parseResponse($.ajax(newbaseurl + url, {
      dataType: 'json',
      data: data,
      timeout: 1000 * 30,
    }), url);
  },

};
