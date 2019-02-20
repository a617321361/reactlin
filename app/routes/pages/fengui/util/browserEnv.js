const ua = window.navigator.userAgent;

module.exports = exports = {

  isInWeixin: function () {
    return /MicroMessenger/i.test(ua);
  },

  isInAndroidApp: function () {
    return /FengjrAppAndroid/i.test(ua);
  },
  isInIOSApp: function () {
    return /FengjrAppIOS/i.test(ua);
  },
  isInApp: function () {

    return /FengjrApp/i.test(ua);
  },
  isInAndroid: function () {
    return /android/i.test(ua);
  },
  isInIOS: function () {
    return /iPhone/i.test(ua);
  },
  getAppVersion: function () {
    var result = /FengjrApp(?:IOS|Android)\/(\d+[.]\d+([.]\d+)?)/.exec(ua);
    if (result) {
      return result[1];
    } else {
      return '0.0.0';
    }
  }
};

export default exports;
