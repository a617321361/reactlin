import React from "react";

let FixedContent = React.createClass({

  setFontSize() {
    var designedWidth = 1920;
    let actualWidth = Math.max(1200, $(window).width());
    document.documentElement.style.fontSize = actualWidth * 100 / designedWidth + 'px';
  },

  componentWillMount() {
    this.setFontSize();
  },

  componentDidMount() {
    window.addEventListener("resize", this.setFontSize);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.setFontSize);
  },

  adjustWidth() {
    $(this.refs.content).css(this.getContentStyle());
  },

  render() {
    var {className, children, style} = this.props;
    return (
      <div ref="content" className={className} style={{...style || {}}}>
        {children}
      </div>
    );
  }
});

export default FixedContent;
