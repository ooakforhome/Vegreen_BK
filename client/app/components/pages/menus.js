import React, {Component} from 'react';
import MenuPopup from './parts/MenuPopup';
import LunchPopup from './parts/LunchPopup';

class Menus extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible : false,
      awardImg : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      magzImg  : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      lunchImg : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      regImg   : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      newArrImg: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      dis1 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      dis2 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      dis3 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      dis4 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      text1: "Vegreen\'s menu is carefully designed for your healthy consumption and we have the best flavor you can imagine\. Moreover, We bring out the flavor of the world\. We want to open up your mind\, and show you that vegetarian has no boundary\. From Asia\, to Europe\, to North and South America\, or to Australia\, \"Any type of dish can now be replaced by vegetarian\"\, and it will taste as good as the original dish if not better\."
    }
  }


  render(){

    return(
      <div>
        <div className="col-12">
          <div className="col-4"><div className="iCol-8"><img alt="2017" src={this.state.awardImg} /></div></div>
          <h1 className="col-4">MENU PAGE</h1>
          <div className="col-4"><div className="iCol-8"><img alt="mag" src={this.state.magzImg} /></div></div>
        </div>
        <div className="col-12 text_center">
          <p>{this.state.text1}</p>
        </div>
        <div>
          <div className="col-6">
            <div className="iCol-8">
              <MenuPopup />
            </div>
          </div>
          <div className="col-6">
            <div className="iCol-8">
              <LunchPopup />
            </div>
          </div>
          <div classname="col-12"><div className="iCol-8"><img alt="New Arrival" src={this.state.newArrImg}  /></div></div>
        </div>
        <div>
          <div className="col-3"><div className="iCol-8"><img alt="dish-1" src={this.state.dis1} /></div></div>
          <div className="col-3"><div className="iCol-8"><img alt="dish-2" src={this.state.dis2} /></div></div>
          <div className="col-3"><div className="iCol-8"><img alt="dish-3" src={this.state.dis3} /></div></div>
          <div className="col-3"><div className="iCol-8"><img alt="dish-4" src={this.state.dis4} /></div></div>
        </div>
      </div>
    )
  }
};

export default Menus;
