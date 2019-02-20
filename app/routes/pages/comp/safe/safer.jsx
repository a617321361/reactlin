import React from 'react';
import {connect} from 'react-redux';
import actions from '../../fengui/redux/actions'
import {browserHistory} from 'react-router'
import styles from './safer.scss'
let Component = React.createClass({
    componentDidMount() {
      
    },
    render() {
        let{params}=this.props;
       
        return (
            <div className={styles.page}>
                   <div className={styles.leftbox}>ddddd </div>
                   <div className={styles.rightbox}>
                        <div className={styles.item}>111</div>
                        <div className={styles.item}>
                            <div className={styles.itembox}>444</div>
                            <div className={styles.itembox}>555</div>
                        </div>
                        <div className={styles.item}>333</div>
                   </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
      
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
