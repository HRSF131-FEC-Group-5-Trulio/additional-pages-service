import React from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const CellBox = styled.div`
  display: block;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: 16px 8px 0px;
  box-sizing: border-box;
  line-height: 24px;
  //display: block;
  flex-shrink: 0;
  //flex-basis: auto;
  // min-width: 224px;
  width:224px;
  `;
  const Image = styled.img`
  &{  width: 100%;
    height: 100%;
   // object-fit: cover;
   // position: relative;
   // display: flex;
    border-radius: 8px;
   // box-sizing: border-box;
   transition: transform 1.3s ease;
  }
   &:hover{
     transform: scale(1.1);
   }
`
const ImageDiv = styled.div`
&{
  // border: solid;
  background: white;
  border-radius: 8px;
  border: solid;
  border-color: transparent;
  // //display: flex;
   position: relative;
  // z-index: 0;
   height: 160px;
   overflow:hidden;
}
&:hover button{
  background-color: rgb(0, 120, 130);
  color: rgb(255, 255, 255);
}
`
const DescriptionBox = styled.div`
  //display: block;
  //background: white;
  //outline: none;
  //box-sizing: border-box;
  padding: 8px 0px 0px;
`;

const HeartIcon = styled.i`
  &&{position: absolute;
  font-size: 25px;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  color: rgba(0,0,0,0.4);
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
  }
  // &:hover{
  //   color: red;
  // }
`;
const Price = styled.div`
  // flex-direction: row;
  //   -webkit-box-align: center;
  //   //align-items: center;
  //   //display: flex;
     font-weight: bold;
     font-size: 20px;
  //   line-height: 1.2;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   outline: none;
`

var Listing = ({image, handleHeartClick, index}) => {
  function numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <CellBox key={index}>
      <ImageDiv>
        <Image src={image.imageURL}/><HeartIcon id={image.id} onClick={(e) => handleHeartClick(e)} className="fas fa-heart"></HeartIcon>
      </ImageDiv>
      <DescriptionBox>
        <Price>${numberWithCommas(image.price, 1000)}</Price>
        <div className="bedBath"><i className="fas fa-bed"></i> {image.Beds}bd, <i className="fas fa-bath"></i> {image.Baths}ba, <i className="fas fa-campground"></i> {numberWithCommas(image.Sqft, 10)}sqft</div>
        <div>{image.streetAddress}</div>
        <div>{`${image.city}, ATL, ${image.zipCode}`}</div>
      </DescriptionBox>
    </CellBox>

  )
}

export default Listing;