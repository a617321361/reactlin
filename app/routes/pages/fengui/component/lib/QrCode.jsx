import React from "react";
let qrCode = require('qrcode-npm');

let Component = React.createClass({
  qrRender(str){
    var qr = qrCode.qrcode(4, 'L');
    qr.addData(str);
    qr.make();
    return qr.createImgTag(3, 10);
  },
  render() {
    return (
      <div dangerouslySetInnerHTML={{__html:this.qrRender(this.props.str)}} className={this.props.style}></div>
    );
  }
});

export default Component;

