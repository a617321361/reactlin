'use strict';
import browserEnv from "fengui/util/browserEnv";
import Promise from 'bluebird';
import * as analysis from 'fengui/util/analysis';
import  _  from 'lodash';

var appShareAnalytics = function (opts) {
  let suc = opts.success
  let failure = opts.failure;

  opts.success = getFnName(function () {
    suc && suc instanceof Function && suc();
    analysis.trackEventValue('app-share-success', {
      url: opts.link
    });
  });
  opts.failure = getFnName(function () {
    failure && failure instanceof Function && failure();
    analysis.trackEventValue("app-share-cancel", {
      url: opts.link
    });
  });
}


let getFnName = function (callback) {
  var fnName = 'fn_' + parseInt(Math.random() * 10000) + '_' + new Date().getTime();
  window[fnName] = (typeof callback === 'function') ? callback : function () {
  };
  return fnName;
};

let readyNum = 0;
function ready() {
  if (window.FengjrApp) {
    return Promise.resolve();
  } else if (readyNum > 10) {
    return Promise.reject();
  }
  readyNum++;
  return Promise.delay(200).then(() => ready());
};

let isAvailable = function (fnName) {
  return !!(window.FengjrApp && window.FengjrApp[fnName]);
};

export function share(shareInfo) {
 let  opts = _.clone(shareInfo);
  ready().then(() => {
    appShareAnalytics(opts);
    if (browserEnv.isInAndroidApp()) {
      window.FengjrApp.share(JSON.stringify(opts));
    } else if (browserEnv.isInIOSApp()) {
      window.FengjrApp.share(opts);
    }
  });
}

export function showShareButton(shareInfo) {
  let opts = _.clone(shareInfo);
  if (/^[/][/]/.test(opts.imgUrl)) {
    opts.imgUrl = opts.imgUrl.replace(/^[/][/]/, 'http://')
  }
  ready().then(() => {
    setTimeout(()=> {
      appShareAnalytics(opts);
      if (browserEnv.isInAndroidApp()) {
        window.FengjrApp.showShareButton(JSON.stringify(opts));
      } else if (browserEnv.isInIOSApp()) {
        window.FengjrApp.showShareButton(opts);
      }
    }, 200);
  })
}

export function hiddenShareButton() {
  setTimeout(()=> {
    window.FengjrApp.hiddenShareButton();
  }, 100);
}

export function getUser(callback) {
  ready().then(() => {
    window.FengjrApp.getUser(getFnName(callback));
  });
}

export function login(success, cancel) {
  getUser(function (userinfo) {
    if (userinfo.isLogin) {
      return success();
    }
    if (typeof cancel === 'function') {
      window.FengjrApp.login(getFnName(success), getFnName(cancel));
    } else {
      window.FengjrApp.login(getFnName(success));
    }
  });
}

export function selectAddress(callback) {
  if (isAvailable('selectAddress')) {
    window.FengjrApp.selectAddress(getFnName(callback));
  }
}

export function register(callback) {
  window.FengjrApp.showRegister(getFnName(callback));
}

export function toPageRouter(path, replace) {
  ready().then(() => {
    let origin = browserEnv.getAppVersion() > '2.3.4' ? 'fengjr://' : location.origin;
    let routerOpts = {url: origin + path, finish: !!replace};
    if (browserEnv.isInAndroidApp()) {
      isAvailable('toPageRouter') && window.FengjrApp.toPageRouter(
        JSON.stringify(routerOpts));
    } else if (browserEnv.isInIOSApp()) {
      isAvailable('toPageRouter') && window.FengjrApp.toPageRouter(routerOpts);
    }
  });
}

export function setPageTitle(title) {
  ready().then(() => {
    isAvailable('setPageTitle') && window.FengjrApp.setPageTitle(title);
  });
}
export function toggleActionBarRightTitle(titleInfo) {
  ready().then(() => {
    if (browserEnv.isInAndroidApp()) {
      isAvailable('toggleActionBarRightText') && window.FengjrApp.toggleActionBarRightText(JSON.stringify(titleInfo));
    } else if (browserEnv.isInIOSApp()) {
      isAvailable('toggleActionBarRightText') && window.FengjrApp.toggleActionBarRightText(titleInfo);
    }
  });
}

export function getSessionInfo(callback) {
  ready().then(() => {
    if (!isAvailable('getSessionInfo')) {
      return callback(null);
    }
    window.FengjrApp.getSessionInfo(getFnName(callback));
  });
}

export function closeToRoot() {
  ready().then(() => {
    if (isAvailable('closeCurrentPushPage')) {
      window.FengjrApp.closeCurrentPushPage({});
    }
  })
}

export function close() {
  return window.FengjrApp && window.FengjrApp.closeCurrentPage('fuck');
}

export function addCalendarEvent(opts, callback) {
  ready().then(() => {
    if (isAvailable('addCalendarEvent')) {
      if (browserEnv.isInAndroidApp()) {
        window.FengjrApp.addCalendarEvent(JSON.stringify(opts), getFnName(callback));
      } else if (browserEnv.isInIOSApp()) {
        window.FengjrApp.addCalendarEvent(opts, getFnName(callback));
      }
    } else {
      return callback('not support');
    }
  })
}

export function getAppInfo(callback) {
  ready().then(() => {
    if (isAvailable('getAppInfo')) {
      window.FengjrApp.getAppInfo(getFnName(callback));
    } else {
      return callback(null);
    }
  })
}
