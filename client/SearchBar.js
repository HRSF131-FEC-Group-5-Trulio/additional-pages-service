
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const Search = styled.input`
//position: absolute;
display: inline block;
left: 15%;
//width: 100%;
//text-align: center;
margin-left: auto;
   margin-right: auto;
background:#F2F1F9;
 border:solid;
  padding:0.5rem;
  margin-top: 20px;
  height: 20px;
  width:55%;
  //width: 80%;
background: white;
`
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    }
  }
  changeHandler(e) {
    this.setState({query: e.target.value});
    this.props.onChangeHandler(e);
  }

  render() {
    return (
      <Search
      key="random1"
      value={this.state.query}
      placeholder={"Search Favorites"}
      onChange={this.changeHandler.bind(this)}
      />
    );
  }
}

export default SearchBar