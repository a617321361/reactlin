export function testfun(){
    alert(545)
}

//手机号码验证
export function isPoneAvailable(str) {
    // console.log(121,str)
    str = Trim(str);
    if (str.length == 11 && str.split('****').length == 2) {//如果是脱敏身份证号则不验证
      return true
    }
    let myreg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
    if (!myreg.test(str)) {
      return false;
    } else {
      return true;
    }
  }

  //去掉前后空格
  export function Trim(str) {
    // console.log(120,str)
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }