import React from "react";
import styles from  "./Item.scss";
import FixedContent from "fengui/component/page/FixedContent";
import img from './../form/images/jtr.png';

let Item = React.createClass({
  render() {
    let {title, subTitle, isLast, onClick, theme, borderLong, subTitleLeft} = this.props;
    return (
      <FixedContent className={styles.this}>
        <div className={`${styles.item} ${!isLast && borderLong ? styles.border :''}`}
             onClick={onClick ? ()=>onClick() : ''}>
          <div className={!isLast && !borderLong ? styles.borderCb : ''}>
            <div
              className={`${styles.title} ${!subTitle ? styles.unSubTitle :''} ${(theme === 'title' || theme === 'active') ? styles.importTitle:''}`}>{title}</div>
            {
              onClick && <img src={img}/>
            }
            <div
              className={`${!subTitleLeft ? styles.subTitle : styles.subTitleLeft} ${theme === 'title' && !onClick ? styles.importSubTitle: ''} ${theme === 'active' && !onClick ? styles.importSubTitleWithActive : ''}`} style={{float:'right',left:subTitleLeft}}>{subTitle}</div>
          </div>
        </div>
      </FixedContent>
    )
  }
});
export default Item;

