import React, { Component } from "React";


class SushiPopup extends Component {
  constructor(props) {
      super(props);
      this.state = {
        visible: 'hidden'
      }
  }


  render(){
    return(
      <div className="pop_cover">
        <img src="../assets/img/Dinner_Menu.jpg" alt="suchi" onClick={this.openPop.bind(this)}/>

          <div className="pop_menu" style={{visibility: this.state.visible ? 'visible' : 'hidden' }}>
            <h1>SUSHI</h1>
            <img alt="MENU" src="../assets/img/Menu_01.jpg" />
            <a href="javascript:void(0);" onClick={(style.visibility === 'hidden')? }>Close</a>
          </div>
      </div>
    )
  }
}

export default SushiPopup;
