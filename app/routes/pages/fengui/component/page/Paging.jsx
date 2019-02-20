import React from "react";
import {connect} from 'react-redux';
import styles from  "./Paging.scss";
import Loading from "./Loading";
import FixedContent from "fengui/component/page/FixedContent";
import $ from 'jquery';
import actions from 'fengui/redux/actions';

let Paging = React.createClass({
  onScroll() {
    let {isLoading, scrollFn} = this.props;
    if (!isLoading) {
      scrollFn();
    }
  },

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  render() {
    let {children, isLoading} = this.props;
    return (
      <FixedContent className={styles.this}>
        <div className={styles.mainBox}>
          {children}
        </div>
        <Loading show={isLoading} text='正在加载' padding='20px'/>
      </FixedContent>
    )
  }
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.vars.isLoading,
    isStop: state.vars.isStop,
    pagingData: state.vars.pagingData,
  }
};

const mapDispatchToProps = (dispatch, props) => {
  let {stop, getMore} = props;
  return {
    scrollFn: () => {
      if (stop) {
        dispatch(actions.setVars('isLoading', false));
        return;
      }
      let bottomLeft = $(document.body).height() - $(window).scrollTop() - $(window).height();
      if (bottomLeft < 50) {
        dispatch(actions.setVars('isLoading', true));
        getMore().finally(function () {
          dispatch(actions.setVars('isLoading', false));
        });
      }
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Paging);

