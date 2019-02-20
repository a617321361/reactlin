let Promise = require('bluebird');
import actions from 'fengui/redux/actions';
import {dispatch} from 'fengui/redux/store';
import browserEnv from 'fengui/util/browserEnv';

exports.Toast = require('./Toast');
exports.AlertPopup = require("./AlertPopup");
exports.DownLoadPopup = require("./DownLoadPopup");
exports.WxSharePopup = require("./WxSharePopup");
exports.CustomPopup = require("./CustomPopup");

exports.alert = function (message, okText = '确定', title) {
  return new Promise(function (resolve, reject) {
    dispatch(actions.setVars("fuiAlert", {
      message: message,
      okText,
      cancelText: null,
      title,
      okClick: function () {
        dispatch(actions.setVars("fuiAlert", ""));
        resolve();
      }
    }));
  });
};

export function confirm(message, okText = '确定', cancelText = "取消", title) {
  return new Promise(function (resolve, reject) {
    dispatch(actions.setVars("fuiAlert", {
      message: message,
      okText,
      cancelText,
      title,
      okClick: function () {
        dispatch(actions.setVars("fuiAlert", ""));
        resolve();
      },
      cancelClick: () => {
        dispatch(actions.setVars("fuiAlert", ""));
        reject();
      }
    }));
  });
}

exports.wxShare = function () {
  return new Promise(function (resolve, reject) {
    dispatch(actions.setVars("fuiWxSharePopup", {
      sharePopupState: true,
      sharePopupClose: function () {
        dispatch(actions.setVars("fuiWxSharePopup", ""));
        resolve();
      }
    }));
  });
};

exports.wxShare.close = function () {
  dispatch(actions.setVars("fuiWxSharePopup", ""));
};

exports.toast = function (toastValue, time = 2500) {
  dispatch(actions.setVars("fuiToast", {
    toastValue: toastValue,
    time: time
  }));
};

exports.callTel = function (tel) {
  if (browserEnv.isInAndroid()) {
    confirm(`确定拨打电话：${tel} 吗？`, '确定', '取消').then(()=> {
      location.href = `tel:${tel}`;
    }).catch(() => {
    });
  } else {
    location.href = `tel:${tel}`;
  }
};

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
}
exports.downLoad = function (message = "使用客户端，享受更多服务！", okText = '下载', cancelText = "暂不下载") {
  return new Promise(function (resolve, reject) {
    dispatch(actions.setVars("fuiAlert", {
      message: message,
      okText,
      cancelText,
      okClick: function () {

        if (getCookie("channel")) {
          location.href = "https://update.fengjr.com/v1/update/app-h5/direct?channel=" + getCookie("channel");
        } else {
          location.href = 'https://update.fengjr.com/v1/update/app-h5/direct';
        }
        dispatch(actions.setVars("fuiAlert", ""));
        resolve();
      },
      cancelClick: () => {
        dispatch(actions.setVars("fuiAlert", ""));
        reject();
      }
    }));
  });
};

exports.loading = function (promise, loadingText) {
  dispatch(actions.setVars("fuiLoading", {
    isShow: true,
    loadingText: loadingText
  }));
  return promise.finally(() => {
    dispatch(actions.setVars("fuiLoading", null));
  });
};
