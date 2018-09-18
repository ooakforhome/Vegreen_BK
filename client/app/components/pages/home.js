import React, {Component} from 'react';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <div>
        <img atl="Home-image" src="https://preview.ibb.co/iwtDPp/Lee_Food_8_26_160407.jpg" className="col-12 float-left"/>
        <div className="g-font">
          <p className="col-12">"Our task must be to free ourselves by widening our circle of compassion to embrace all living creatures and the whole of nature and its beauty"</p>
          <p className="float-right">Albert Einstein</p>
        </div>
      </div>
    )
  }
};

export default Home;
