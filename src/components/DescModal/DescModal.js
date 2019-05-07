import React from "react";

class DescModal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null;
    }

    // The gray background
    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      width: "50%",
      height: "50%",
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };
    console.log(this.props);
    return (
      <div className="backdrop" style={{ backdropStyle }}>
        <div className="modal" style={{ modalStyle }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
export default DescModal;