import React from "react";
import FileUploader from "./FileUploader";
class Header extends React.Component {
  render() {
    return (
      <div className="header">
        {/* <img src="/sophiaheader.png" alt="image" /> */}
        <div style={{ padding: "100px", textAlign: "center", color: "white" }}>
          <h1>Exploration Website</h1>
          <p>Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
            Phasellus imperdiet, nulla et dictum interdum,
            nisi lorem egestas odio,
            vitae scelerisque enim ligula venenatis dolor.</p>
          <textarea style={{ width: "800px", height: "100px" }}>What question or topic do you want to explore today?</textarea>
          <FileUploader />
        </div>
      </div>
    );
  }
}
export default Header;