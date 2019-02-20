import React from "react";
let styles = require("./Button.scss");

class BtnGroup extends React.Component {

  constructor() {
    super();
  }

  render() {
    let {children, className, style} = this.props;
    if (!Array.isArray(children)) {
      children = [children];
    }
    children = children.filter(btn => !!btn.props);

    return (
      <div className={`${styles.btnGroup} ${className || ''}`} style={style}>
        {children.map(function (btn, i) {
          return (
            <div key={i} className={btn.props.disabled && styles.disabled} style={{width:100/children.length+"%"}}>
              {btn}
            </div>
          );
        })}
      </div>
    )
  }
}
export  default BtnGroup
