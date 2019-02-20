import React from 'react';
import notpageicon from '../img/comp/404.5f76e01.png';
import styles from './NotFoundPage.scss';
export default class NotFoundPage extends React.Component {
  static getProps () {
    return {}
  }

  render () {
    return(
    <div  className={styles.nopagebox} >
       <div className={styles.imgleft}>
          <img src={notpageicon} />
          <div className={styles.txtright}>
            <div className={styles.tit} >OOPS!</div>
            <div className={styles.txt}>页面似乎出了点问题...</div>
            <div className={styles.info}>请检查您输入的网址是否正确，请点击以下按钮返回主页</div>
            {/* <a className={styles.btn}>返回首页</a> */}
          </div>
      </div>
    </div>
    )
  }
}
