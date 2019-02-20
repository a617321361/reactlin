import React from "react";

import {setPageTitle} from "fengui/component/fjApp"
import {browserHistory} from 'react-router';
import browserEnv from "fengui/util/browserEnv";
let styles = require('./Header.scss');

export default class Header extends React.Component {

  back() {
    if (this.props.backFn) {
      this.props.backFn();
    } else {
      window.history.back();
    }
  }

  getRightOpts(type) {
    if (type === 'toHome') {
      return {
        rightText: '',
        rightIcon: require('./img/home.png'),
        rightClick: function () {
          browserHistory.push('/re/home');
        },
      }
    }
    if (type === 'toUserCenter') {
      return {
        rightText: '',
        rightIcon: require('./img/userCenter.png'),
        rightClick: function () {
          browserHistory.push('/re/user/center');
        },
      }
    }
    return {};
  }

  getLeftOpts(type) {
    if (type === 'back') {
      return {
        leftText: '',
        leftIcon: '',
        leftClick: function () {
          window.history.back();
        },
      }
    }
    if (type === 'hidden') {
      return {
        leftText: '',
        leftIcon: '',
        leftClick: function () {},
      }
    }
    return {};
  }

  render() {

    let {theme} = this.props;

    if (browserEnv.isInApp()) {
      setPageTitle(this.props.title);
      return <div></div>
    } else {
      let {title, subTitle, subTitleClick, rightClick, rightIcon, rightText, rightType, leftClick, leftIcon, leftText, leftType} = this.props;
      rightText = rightText || this.getRightOpts(rightType).rightText || subTitle;
      rightClick = rightClick || this.getRightOpts(rightType).rightClick || subTitleClick || ()=> {};
      rightIcon = rightIcon || this.getRightOpts(rightType).rightIcon;

      leftType = leftType || 'back';
      leftText = leftText || this.getLeftOpts(leftType).leftText;
      leftIcon = leftIcon || this.getLeftOpts(leftType).leftIcon;
      leftClick = leftClick || this.getLeftOpts(leftType).leftClick || ()=>{};

      if (leftText && leftText.length > 4) {
        leftText = leftText.substr(0, 3) + '...';
      }

      if (rightText && rightText.length > 4) {
        rightText = rightText.substr(0, 3) + '...'
      }

      return (
        <div className={styles.this + ' ' + styles[theme]}>
          <div className={styles.center}>
            {title}
          </div>
          {
            leftType !== 'hidden' && !leftIcon &&
            <div className={`${!leftText ? styles.left : styles.leftText}`}
                 onClick={leftClick}>{leftText}</div>
          }
          {
            leftIcon && <img src={leftIcon} className={styles.leftIcon} onClick={leftClick}/>
          }
          {
            rightText && !rightIcon &&
            <div className={styles.right} onClick={rightClick}>{rightText}</div>
          }
          {
            rightIcon &&
            <img src={rightIcon} className={styles.rightIcon} onClick={rightClick}/>
          }
        </div>
      );
    }
  }
};

Header.propTypes = {
  title: React.PropTypes.string,
  backFn: React.PropTypes.func,
  theme: React.PropTypes.oneOf(['dark', 'white', 'danger', 'orange']),
};

Header.defaultProps = {
  theme: 'white',
};
