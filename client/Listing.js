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
  flex-shrink: 0;
  width:224px;
  `;
  const Image = styled.img`
  &{  width: 100%;
    height: 100%;
    border-radius: 8px;
   transition: transform 1.3s ease;
  }
   &:hover{
     transform: scale(1.1);
   }
`
const ImageDiv = styled.div`
&{
  background: white;
  border-radius: 8px;
  border: solid;
  border-color: transparent;
   position: relative;
   height: 160px;
   overflow:hidden;
}
&:hover button{
  background-color: rgb(0, 120, 130);
  color: rgb(255, 255, 255);
}
`
const DescriptionBox = styled.div`
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
`;
const Price = styled.div`
     font-weight: bold;
     font-size: 20px;
`

var Listing = ({image, handleHeartClick, index}) => {
  function numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function clickHandler(e, id) {
    var imageLocation= window.location.href.split('/');
    imageLocation[imageLocation.length - 2] = (''+ id).padStart(2,'0');
    location.assign(imageLocation.join('/'));
  }
  return (
    <CellBox key={index}>
      <ImageDiv>
        <Image src={image.imageURL} onClick={(e) => clickHandler(e,image.id)}/><HeartIcon id={image.id} onClick={(e) => handleHeartClick(e)} className="fas fa-heart"></HeartIcon>
      </ImageDiv>
      <DescriptionBox>
        <Price>${numberWithCommas(image.price, 1000)}</Price>
        <div className="bedBath"><i className="fas fa-bed"></i> {image.Beds}bd, <i className="fas fa-bath"></i> {image.Baths}ba, <i className="fas fa-campground"></i> {numberWithCommas(image.Sqft, 10)}sqft</div>
        <div>{image.streetAddress}</div>
        <div>{`${image.city}, CA, ${image.zipCode}`}</div>
      </DescriptionBox>
    </CellBox>

  )
}

export default Listing;