import React from "react";
let styles = require('./Loading.scss');

export default class Loading extends React.Component {

  render() {
    let {padding, show = true, text} = this.props;
    return (
      <div>
        {
          show && <div className={styles.mainBox} style={{padding:padding || 80}}>
            <div className={styles.spinner}>
              <div className={`${styles.spinner_container} ${styles.container1}`}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
                <div className={styles.circle4}></div>
              </div>
              <div className={`${styles.spinner_container} ${styles.container2}`}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
                <div className={styles.circle4}></div>
              </div>
              <div className={`${styles.spinner_container} ${styles.container3}`}>
                <div className={styles.circle1}></div>
                <div className={styles.circle2}></div>
                <div className={styles.circle3}></div>
                <div className={styles.circle4}></div>
              </div>
            </div>
            {
              text && <div className={styles.tipWord}>{text}</div>
            }
          </div>
        }
      </div>
    );
  }
}
