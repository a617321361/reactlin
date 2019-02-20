import React from "react";
import FixedContent from "fengui/component/page/FixedContent";
import styles from "./AlertPopup.scss";

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
    let {message, okText, okClick, cancelText, cancelClick, title} = this.props.options;
    return (
      <FixedContent mode="fullWidth" origin="top" className={styles.this}>
        <div className={styles.main}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content} style={{marginTop:!title && ".6rem"}}>
            {message}
          </div>
          <div className={styles.button}
               style={{padding: '10px 0', fontSize: '0.36rem'}}>
            {cancelText &&
            <div onClick={cancelClick}
                 className={styles.cancel}>{cancelText}<i></i></div>}
            <div onClick={okClick}>{okText}</div>
          </div>
        </div>
        <div className={styles.toast} onClick={cancelClick}>
        </div>
      </FixedContent>
    )
  }
});

export default Component;
