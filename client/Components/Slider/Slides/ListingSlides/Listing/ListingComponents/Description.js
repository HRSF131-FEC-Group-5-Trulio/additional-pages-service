import React from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const DescriptionBox = styled.div`
  padding: 8px 0px 0px;
`;

const Price = styled.div`
     font-weight: bold;
     font-size: 20px;
`


var Description = ({image}) => {
  function numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
      <DescriptionBox>
        <Price>${numberWithCommas(image.price, 1000)}</Price>
        <div className="bedBath"><i className="fas fa-bed"></i> {image.Beds}bd, <i className="fas fa-bath"></i> {image.Baths}ba, <i className="fas fa-campground"></i> {numberWithCommas(image.Sqft, 10)}sqft</div>
        <div>{image.streetAddress}</div>
        <div>{`${image.city}, CA, ${image.zipCode}`}</div>
      </DescriptionBox>
  )
}

export default Description;