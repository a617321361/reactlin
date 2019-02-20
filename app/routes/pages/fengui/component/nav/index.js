let Promise = require('bluebird');
import actions from 'fengui/redux/actions';
import {dispatch} from 'fengui/redux/store';

exports.Tab = require('./Tab');

exports.alert = function (message, okText = '确定') {
  return new Promise(function (resolve, reject) {
    dispatch(actions.setVars("fuiAlert", {
      title: null,
      message: message,
      okText,
      cancelText: null,
      okClick: function () {
        dispatch(actions.setVars("fuiAlert", ""));
        resolve();
      }
    }));
  });
};
