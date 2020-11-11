import React from 'react';
import ReactDOM from 'react-dom';
//import styles from 'client/styles.css';

class App extends React.Component {
    render() {
        return (
          <div>
          <img src="https://loremflickr.com/320/240?lock=1" />
          <img src="https://loremflickr.com/320/240?lock=212" />
          <img src="https://loremflickr.com/320/240?lock=30976" />
          <img src="https://loremflickr.com/320/240?random=1" />
          <img src="https://loremflickr.com/320/240?random=2" />
          </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));