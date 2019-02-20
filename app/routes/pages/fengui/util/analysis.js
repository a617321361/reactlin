import * as fjApp from "fengui/component/fjApp";
import browserEnv from './browserEnv';

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}

function init() {
  // 百度统计
  window._hmt = window._hmt || [];
  (function () {
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?a34dc7ab9118d0d0feff5655dafdbcbe";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();

  // ga 统计, 定义了 window.ga
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  ga('create', 'UA-89061742-2', 'auto');
  ga('send', 'pageview');

  // 凤金融统计
  window._fja = window._fja || {system_id: 'h5', source: 'h5'};
  window._fja.q = window._fja.q || [];
  (function () {
    var fjr = document.createElement('script');
    fjr.type = 'text/javascript';
    fjr.async = true;
    fjr.src = '//mws.fengjr.com/public/dist/mobile-web/js/analysis.min-v1.3.js';
    fjr.onload = function () {
      window._fja.init();
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(fjr, s);
  })();

  // set channel,  browserEnv
  let channel = getCookie('channel');
  if (channel) {
    setCustomVar('channel', channel);
  }
  setCustomVar('browserEnv', browserEnv.isInWeixin() ? 'weixin' : 'app');

  if (browserEnv.isInApp()) {
    // 获取 FengjrApp 信息
    fjApp.getSessionInfo(info => {
      if (info) {
        setCustomVar('app_seq', info.seq);
        setCustomVar('app_session_id', info.session_id);
      }
    });
  }
}

export function trackPageView(page, prePage) {
  // http://tongji.baidu.com/open/api/more?p=guide_trackPageview
  window._hmt.push(['_trackPageview', page]);
  window._fja.q.push(['track_pageview', page, prePage]);
  ga('set', 'page', page);
  ga('send', 'pageview');
}

export function trackEvent(name, type = 'react') {
  window._hmt.push(['_trackEvent', type, 'set_value', name]);
  window._fja.q.push(['custom_event', {type, name}]);
  ga('send', 'event', type, 'set_value', name);
}

export function trackEventValue(name, value, type = 'react') {
  if (typeof value === 'object') {
    window._hmt.push(['_trackEvent', type, 'set_value', name]);
    window._fja.q.push(['custom_event', {type, name, segments: value}]);
  } else {
    window._hmt.push(['_trackEvent', type, 'set_value', name, value]);
    window._fja.q.push(['custom_event', {type, name, value}]);
    ga('send', 'event', type, 'set_value', name, value);
  }
}

export function setUid(uid) {
  window._fja.q.push(['_setUserId', uid]);
}

export function setCustomVar(key, value) {
  let baiduIndexMap = {
    channel: 1,
    browserEnv: 2,
    isLogin: 3,
  };
  window._hmt.push(['_setCustomVar', baiduIndexMap[key] ? baiduIndexMap[key] : 5, key, value, 2]);
  window._fja.q.push(['_setProperty', key === 'channel' ? 'fjr_channel' : key, value]);

  // ga
  let gaIndexMap = {
    channel: 1,
    browserEnv: 2,
    isLogin: 3,
  };
  if (gaIndexMap[key]) {
    ga('set', 'dimension' + gaIndexMap[key], value);
  }
}

init();

