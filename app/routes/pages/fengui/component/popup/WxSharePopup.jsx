import React from "react";
import styles from "./WxSharePopup.scss";
import shareImg from "./images/share-in-weixin.png";

const Component = React.createClass({
  propTypes: {
    options: React.PropTypes.object
  },
  getDefaultProps() {
    return {
      options: {}
    };
  },
  render() {
    let {sharePopupState,sharePopupClose} = this.props.options;
    return sharePopupState && (
        <div className={`${styles.this}`} onClick={sharePopupClose}
             style={{
           position: 'fixed',
           width:'100%',
            maxWidth:450,
            height:'100%',
            top:0,
            background:'rgba(0, 0, 0, .6)',
            zIndex:5}}>
          <img src={shareImg} style={{width:'100%'}}/>
        </div>
      )
  }
});

export default Component;
