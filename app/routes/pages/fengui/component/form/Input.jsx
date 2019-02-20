import React from "react";
import FixedContent from "fengui/component/page/FixedContent";
import styles from  "./Input.scss";
import cancelImg  from "./images/cancel1.png";

let Input = React.createClass({
  getInitialState() {
    return {
      focusInputName: "",
      removeCloseBtnTimer: null
    };
  },
  formValueChange(name, len, event){
    let {onChange}=this.props;
    var value = event.target.value;
    if (value.length > len) {
      return false;
    }
    onChange(name, value);
  },
  cancelFn(name){
    let {onChange}=this.props;
    onChange(name, "");
  },
  removeCloseBtn () {
    this.setState({
      removeCloseBtnTimer: setTimeout(()=> {
        this.setState({
          focusInputName: ""
        });
      }, 300)
    });

  },
  setFocusInputName(name){
    let {removeCloseBtnTimer} = this.state;
    clearTimeout(removeCloseBtnTimer);
    this.setState({
      focusInputName: name
    });

  },

  render() {
    let {focusInputName} = this.state;
    let {title, placeholder, name, disabled,maxlen,type,value} = this.props;
    return (


      <FixedContent className={styles.this}>

        <div className={`${styles.ml20} ${styles.line}`}>
          <div className={styles.text}>{title}</div>

          <input className={styles.write}
                 placeholder={placeholder}
                 type={ type ? type: "text" }
                 disabled={disabled}
                 onBlur={() => this.removeCloseBtn(name)}
                 onFocus={()=>this.setFocusInputName(name)}
                 value={value || ""}
                 onChange={this.formValueChange.bind(this,name,maxlen)}
          />
          {value && (focusInputName === name) &&
          <span onClick={()=>this.cancelFn(name)} className={styles.cancel}><img
            src={cancelImg}/></span>}
        </div>
      </FixedContent>
    );
  }
});
export default Input;
