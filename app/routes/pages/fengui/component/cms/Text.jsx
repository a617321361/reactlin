import React from "react";
import {connect} from 'react-redux';
var {getState, dispatch} = require('../../redux/store');
var actions = require('../../redux/actions');
import apiClient from '../../util/apiClient';


class Text extends React.Component {

  render() {
    let {code, textMap, className, style, data} = this.props;
    let val = textMap[code] || {};

    val = val.content || "";

    if (data) {
      val = formatShareStr(data, val);
    }

    if (/\bdebug\b/.test(location.search)) {
      val = `[${code}]${val}[end ${code}]`;
    }

    return (
      <span className={className} style={style} dangerouslySetInnerHTML={{__html: val}}></span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    textMap: state.objs.textMap || {}
  }
};


export function fetchStrings(code) {
  const codes = code.split(',');
  const textSet = getState().objs.textSet || {};
  const textMap = getState().objs.textMap || {};
  code = _.filter(codes, code => !textSet.hasOwnProperty(code) && !textMap.hasOwnProperty(code)).join(',');
  if (code) {
    apiClient.get("/cms/public/texts", {code}).then((data) => {
      dispatch(actions.appendObjs('textSet', _.object(codes)));
      dispatch(actions.appendObjs('textMap', _.indexBy(data, 'code')));
    });
  }
}


function formatShareStr(obj, str) {
  if (obj && str) {
    str = str.replace(/\$\{([0-9A-Za-z-_]*)\}/g, function ($1, $2) {
      return obj[$2] || ""
    })
  }
  return str;
}
export default connect(mapStateToProps)(Text);
