import React, {Component} from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  constructor(props){
    super(props)
    this.state ={
      isClicked: false
    }
  }

  handleClick(){
    this.setState({
      isClicked: !this.state.isClicked
    })
  };

  render(){
    let menuClass = this.state.isClicked ? 'clicked' : '';
    return(
      <header className="page-top">
        <div className="col-4 float-left">
          <Link to="/">
            <img alt="Vegreen logo" src="https://image.ibb.co/kWFzx9/Ve_Green_Logo_update_Long.jpg" className="logo_image"/>
          </Link>
        </div>
        <div className="col-8 float-left">
          <nav className="nav-container">
            <ul>
              <li className="header_link"><Link className="header_link" to="/">HOME</Link></li>
              <li className="header_link"><Link className="header_link" to="/menu">MENUS</Link>
                <ul className={menuClass}>
                  <li className="header_link"><Link className="header_link" to="/menu/lunch">LUNCH</Link></li>
                  <li className="header_link"><Link className="header_link" to="/menu/regular">REGULAR</Link></li>
                </ul>
              </li>
              <li className="header_link"><Link className="header_link" to="/find-us">FIND US</Link></li>
              <li className="header_link"><Link className="header_link" to="/mission">MISSION</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    )
  }

}

export default Header;
