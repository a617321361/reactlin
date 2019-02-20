import apiClient from '../../util/apiClient';
import browserEnv from '../../util/browserEnv';
import {wxShare} from "../popup";
import {showShareButton, share} from "../fjApp";
import * as analysis from 'fengui/util/analysis';
let wx = require('weixin-js-sdk');
var {getState} = require('../../redux/store');
var Promise = require('bluebird');
var weixinJsConfig;
var errorCount = 0;

function shareAnalytics(activityInfo) {
  if (!activityInfo || !activityInfo.shareCategory || !activityInfo.category || !activityInfo.activityName) return;
  if (getState().visitor && getState().visitor.isLogin) {
    return apiClient.post('/v2/common/backendPostRequireLogin', {
      path: '/loanoperation/api/v3/share/shareCallBack/MYSELF',
      query: {
        version: '1.0'
      },
      form: activityInfo
    });
  } else {
    return apiClient.post('/v2/common/backendPost', {
      path: '/loanoperation/api/v3/share/shareCallBackNoLogin',
      query: {
        version: '1.0'
      },
      form: activityInfo
    });
  }
}


function formatShareStr(obj, str) {
  if (obj && str) {
    str = str.replace(/\$\{([0-9A-Za-z-_]*)\}/g, function ($1, $2) {
      return obj[$2] || ""
    })
  }
  return str;
}
function initWeixinShare(opts) {
  if (!browserEnv.isInWeixin()) {
    return;
  }
  if (opts.imgUrl) {
    opts.imgUrl = opts.imgUrl.replace(/^\/\//, 'http://');
  }
  setTimeout(function () {
    wxConfigReady().then(function () {
      let oriSuccess = opts.success;
      let cancel = opts.failure;
      opts.success = function () {
        if (oriSuccess) {
          oriSuccess();
        }
        wxShare.close();
        shareAnalytics(opts);
        analysis.trackEventValue('weixin-share-success', {
          url: opts.link
        });
      };
      opts.cancel = function () {
        cancel && cancel instanceof Function && cancel();
        wxShare.close();
        analysis.trackEventValue('weixin-share-cancel', {
          url: opts.link
        });
      }
      wx.ready(function () {
        wx.onMenuShareTimeline(opts);
        wx.onMenuShareAppMessage(opts);
        wx.onMenuShareQQ(opts);
      });
      wx.error(function (res) {
        if (res.errMsg === 'config:invalid signature') {
          errorCount++;
          if (errorCount <= 100) {
            getState().vars.landingUrl = location.href;
            weixinJsConfig = null;
            initWeixinShare(opts)
          }
        }
      })
    });
  }, 100)
}


function wxConfigReady() {
  return getWeixinJsConfig().then(function (config) {
    var jsApis = [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'previewImage',
      'chooseImage'
    ];
    var wxConfig = {
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: config.appId, // 必填，公众号的唯一标识
      timestamp: config.timestamp, // 必填，生成签名的时间戳
      nonceStr: config.nonceStr, // 必填，生成签名的随机串
      signature: config.signature,// 必填，签名，见附录1
      jsApiList: jsApis // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    };
    wx.config(wxConfig);
  });
}

function getWeixinJsConfig() {
  if (weixinJsConfig) {
    return Promise.resolve(weixinJsConfig);
  }
  return apiClient.get('/v2/weixin/jsConfig', {
    pageUrl: getUrlWithoutHash()
  }).then(function (jsConfig) {
    weixinJsConfig = jsConfig;
    return jsConfig;
  });
}


function getUrlWithoutHash() {
  var url = location.href;
  if (getState().vars && getState().vars.landingUrl) {
    url = getState().vars.landingUrl;
  }
  if (url.indexOf('#') === -1) {
    return url;
  }
  return url.substring(0, url.indexOf('#'));
}

function shareByCode(opt, data, success, cancel) {
  let code = opt;
  let hidenAppShareBtn = false;
  if (opt instanceof Object) {
    code = opt.code;
    data = opt.data;
    hidenAppShareBtn = opt.hidenAppShareBtn;
    success = opt.success;
    cancel = opt.cancel;
  }
  let shareInfo = {};
  let sharePromise = apiClient.get("/cms/public/shareInfo", {code}).then((cmsShareInfo) => {
    shareInfo = cmsShareInfo || {};
    shareInfo.title = formatShareStr(data, shareInfo.title);
    shareInfo.desc = formatShareStr(data, shareInfo.desc);
    let link = shareInfo.link;
    shareInfo.link = formatShareStr(data, (/^\/.*$/.test(link) ? location.origin + link : link));
    if (success) {
      shareInfo.success = success;
    }
    if (cancel) {
      shareInfo.failure = cancel;
    }
    if (browserEnv.isInApp()) {
      if (!hidenAppShareBtn) {
        showShareButton(shareInfo);
      }
    } else {
      initWeixinShare(shareInfo);
    }
  })
  return {
    popup: function () {
      return sharePromise.then(function () {
        if (browserEnv.isInApp()) {
          share(shareInfo)
        } else {
          wxShare().then(function () {
            let cancel = shareInfo.failure;
            cancel && cancel instanceof Function && cancel();
            analysis.trackEventValue('weixin-share-cancel', {
              url: shareInfo.link
            });
          });
        }
      })
    }
  }

}
module.exports = {
  initWeixinShare,
  shareByCode
};

