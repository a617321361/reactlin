import apiClient from 'fengui/util/apiClient';
let {JSEncrypt}  = require("jsencrypt");

function spliteStrByByteLength(str, maxByteLength) {
  var spliteArray = [];
  if (!str || str.length === 0) return spliteArray;
  var strPackage = '';
  var strPackageByteLength = 0;
  for (var i = 0; i < str.length; i++) {
    var currentChar = str.charAt(i);
    var byteLength = Buffer.byteLength(currentChar, 'utf-8');
    //当为最后一个字符时
    if (i == str.length - 1) {
      if (strPackageByteLength + byteLength > maxByteLength) {
        spliteArray.push(strPackage);
        spliteArray.push(currentChar);
      } else {
        strPackage += currentChar;
        spliteArray.push(strPackage)
      }
      strPackage = '';
      strPackageByteLength = 0;
    } //当加上当前字符 等于最大字字节数时
    else if (strPackageByteLength + byteLength == maxByteLength) {
      strPackage += currentChar;
      spliteArray.push(strPackage)
      strPackage = '';
      strPackageByteLength = 0;

    } //当加上当前字符 大于最大字字节数时
    else if (strPackageByteLength + byteLength > maxByteLength) {
      spliteArray.push(strPackage)
      strPackage = '';
      strPackageByteLength = 0;
      strPackage += currentChar;
      strPackageByteLength += byteLength;

    } else {
      strPackage += currentChar;
      strPackageByteLength += byteLength;
    }
  }
  return spliteArray;
}

function getEncrypted(body) {
  return apiClient.get("/v2/common/getPublicKey").then((publicKey)=> {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    let rawDataStr = JSON.stringify(body);
    let mode = 117;

    let strItems = spliteStrByByteLength(rawDataStr, mode);
    let encryptItems = strItems.map((item)=> {
      return encrypt.encrypt(item);
    });
    return {
      publicKey,
      encryptedData: encryptItems
    };
  }).catch(() => {
    return body;
  });
}

export default function encryptPost(url, data) {
  return getEncrypted(data).then(function (body) {
    return apiClient.post(url, body);
  });
}
