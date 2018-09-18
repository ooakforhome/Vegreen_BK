import React, {Component} from 'react';
import NewsList from './parts/news';
import HealthList from './parts/health';
import VideoList from './parts/video';

class VeWorld extends Component {
  constructor(props){
    super(props);
    this.state = {
      img1 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      img2 : "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      vid1 : "https://www.youtube.com/embed/tgbNymZ7vqY",
      vid2 : "https://www.youtube.com/embed/tgbNymZ7vqY",
      vid3 : "https://www.youtube.com/embed/tgbNymZ7vqY",
      news1: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      news2: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      news3: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      health1: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      health2: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg",
      health3: "https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg"
    }
  }

  render(){
    return(
      <div>
        <div className="col-12">
          <img alt="slide_show" src="a.jpg" />
        </div>
        <div className="col-12">
          <div className="col-6"><div className="iCol-7"><img alt="logo" src={this.state.img1} /></div></div>
          <div className="col-6"><div className="iCol-7"><img alt="logo" src={this.state.img2} /></div></div>
        </div>
        <div className="col-12">
          <VideoList
            vid1 = {this.state.vid1}
            vid2 = {this.state.vid2}
            vid3 = {this.state.vid3}
          />
        </div>
        <div className="col-12">
          <p>NEWS</p>
          <NewsList
            news1 = {this.state.news1}
            news2 = {this.state.news2}
            news3 = {this.state.news3}
          />
        </div>
        <div className="col-12">
          <p>HEALTH</p>
          <HealthList
            health1 = {this.state.health1}
            health2 = {this.state.health2}
            health3 = {this.state.health3}
          />
        </div>
      </div>
    )
  }
};

export default VeWorld;
