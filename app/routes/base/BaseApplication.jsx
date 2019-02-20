import React from 'react'
import { connect } from 'react-redux'

import {dispatch} from 'fengui/redux/store'
import actions from 'fengui/redux/actions'

require('./BaseApplication.gscss')

class Application extends React.Component {

  constructor (props) {
    super(props)
    dispatch(actions.setVars('landingUrl', location.href))
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = () => {
  return {
  }
}

export default connect(mapStateToProps)(Application)
