import React from "react";
let styles = require("./Button.scss");

class Button extends React.Component {

  constructor() {
    super();
  }

  render() {
    let {children, disabled, onClick} = this.props;
    return (
      <div className={styles.btnContainer}>
        <button className={styles.btn} disabled={disabled} onClick={onClick}>
          {children}
        </button>
      </div>
    )
  }
}

export default Button;
