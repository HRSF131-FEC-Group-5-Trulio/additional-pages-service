
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
const Search = styled.input`
position: absolute;
left: 15%;
//width: 100%;
//text-align: center;
background:#F2F1F9;
 border:solid;
  padding:0.5rem;
  margin-top: 20px;
  height: 20px;
  width:20rem;
  //width: 80%;
background: black;
`

const SearchBar = ({keyword,setKeyword}) => {
  //const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", position:};
  return (
    <Search
     key="random1"
     value={keyword}
     placeholder={"Search Favorites"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar