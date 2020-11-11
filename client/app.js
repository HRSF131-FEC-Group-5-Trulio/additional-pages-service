import React from 'react';
import ReactDOM from 'react-dom';
//import styles from 'client/styles.css';

class App extends React.Component {
    render() {
        return (
          <div className="contentSlider">
            <div className="flexContainer">
              {new Array(5).fill(0).map((image, index) => (
              <div className="cellBox">
                <div className="imageDiv">
                  <img src={`https://loremflickr.com/320/240?random=${index}`}/>
                </div>
                <div className="descriptionBox">
                  <div className="price">$2,245,000</div>
                  <div className="bedBath">6 bd, 6 ba, 5846 sqft</div>
                  <div>405 9th St NE</div>
                  <div>Midtown, Atlanta, GA</div>
                </div>
              </div>
                )

              )}
            </div>
          </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));