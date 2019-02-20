import React from "react";
import FixedContent from "fengui/component/page/FixedContent";
let styles = require('./Tab.scss');


export default React.createClass({

  render() {
    let {tabs, activeClass, selected, onSelect}=this.props;
    return (
      <FixedContent className={styles.this}>
        <div className={styles.tabBox}>
          <ul className={styles.tabTitle}>
            {
              tabs.map((tab, index)=> {
                return (
                  <li key={index} style={{width:100/tabs.length + "%"}} onClick={()=>onSelect(tab, index)}
                      className={(selected === index) && (activeClass || styles.on)}>{tab.title}</li>
                )
              })}
          </ul>
        </div>
      </FixedContent>
    )
  }
});
