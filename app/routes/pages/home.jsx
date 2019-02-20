import React from 'react'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import FixedContent from './fengui/component/page/FixedContent'
import actions from './fengui/redux/actions'
import styles from './home.scss'
import Header from './module/Header'
import Body from './module/body'
let Comps = React.createClass({
  componentWillMount () {
   
  },

  componentWillUnmount () {
  },

  render () {
    let{params}=this.props;
    return (
      <FixedContent>
        <div className={styles.mainbox}  >
          <Header params={params}   />
          <Body params={params} />
        </div>
      </FixedContent>
      
    )
  }
})


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comps)
