import React from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import Description from './ListingComponents/Description';
import ImageContainer from './ListingComponents/ImageContainer';

const CellBox = styled.div`
  display: block;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: 16px 8px 0px;
  box-sizing: border-box;
  line-height: 24px;
  flex-shrink: 0;
  width:224px;
  `;


var Listing = ({image, handleHeartClick, index}) => (
    <CellBox key={index}>
      <ImageContainer image={image} handleHeartClick={handleHeartClick}/>
      <Description image={image}/>
    </CellBox>
  )

export default Listing;