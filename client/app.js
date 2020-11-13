import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
    };
  }

  componentDidMount() {
    //ajax call to the server to get stuff from the database.
    $.ajax({
      url: 'http://localhost:3000/property',
      method: 'GET',
      success: (data) => {
        console.log('ajax request succesful!' + data);
        var parsed = JSON.parse(data);
        this.setState({properties: parsed});
        //console.log(data[0].imageURL)
      },
      error: (err) => {
        console.log('ajax request error' + err);
      }
    })
  }
    render() {
        return (
          <div className="contentSlider">
            <div className="flexContainer">
              {this.state.properties.length > 0 ? this.state.properties.map((image, index) => (
              <div className="cellBox">
                <div className="imageDiv">
                  <img src={image.imageURL}/>
                </div>
                <div className="descriptionBox">
                  <div className="price">$2,245,000</div>
                  <div className="bedBath">6 bd, 6 ba, 5846 sqft</div>
                  <div>405 9th St NE</div>
                  <div>Midtown, Atlanta, GA</div>
                </div>
              </div>
                )

              ) : 'empty'}
            </div>
          </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));