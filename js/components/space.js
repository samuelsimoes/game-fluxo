import React from "react";

let dpi = 30;

export default class extends React.Component {
  render () {
    let baseStyle = {
      width: (this.props.place.width * dpi),
      height: (this.props.place.height * dpi),
      position: "relative"
    };

    return (
      <div style={baseStyle}>
        {this.renderElements()}
      </div>
    );
  }

  renderElements () {
    return this.props.place.stores.map(element => {
      let style = {
        position: "absolute",
        background: (element.type === "bound" ? "black" : "red"),
        top: (element.x * dpi),
        left: (element.y * dpi),
        width: dpi,
        height: dpi,
        boxSizing: "border-box"
      };

      return <div key={element.cid} style={style}></div>;
    });
  }
}
