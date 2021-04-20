import React, { Component } from 'react';
import './Styles.css';
import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'moses'
    };
  }

  render() {
    return (
      <div className="header-container">
         <div className="header-container-nav">
            <div className="home"><Link to="/">Home</Link></div>
            <div className="account"><Link to="/User"> Account</Link></div>
         </div>
        <div className="header-heading">
          <h1 className="header">{this.props.page}</h1>
        </div>

      </div>
    );
  }

}

export default Header;
