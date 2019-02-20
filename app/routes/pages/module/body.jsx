import React from 'react';
import {connect} from 'react-redux';
import styles from './body.scss';
import actions from '../fengui/redux/actions'
import {browserHistory} from 'react-router'
import Notpage from '../../../comps/NotFoundPage'
import Home from '../comp/index/index'
import Safer from '../comp/safe/safer'
import Shield from '../comp/shield/shield'

let Component = React.createClass({
    componentDidMount() {
      
    },
    render() {
        let{params}=this.props;
          let fillform;
        switch(params.page){
            case 'index':{
            fillform = <Home params={params} />
          }break;
          case 'safer':{
            fillform = <Safer params={params} />
          }break;
          case 'shield':{
            fillform = <Shield params={params} />
          }break;
          default:
          fillform = <Notpage />
        }
        return (
            <div className={styles.mainBox}>
               {fillform}
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
