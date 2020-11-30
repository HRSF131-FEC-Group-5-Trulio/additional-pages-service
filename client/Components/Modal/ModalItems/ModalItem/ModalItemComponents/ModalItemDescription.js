import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const AddressAndPriceContainer = styled.div`
margin-left: 80px;
`
const Price = styled.div`
`
const Address = styled.div`
 font-weight: bold;
`
var ModalItemDescription = ({favorite}) => {
  function numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
        <AddressAndPriceContainer>
          <Address key={favorite.id}>{`${favorite.streetAddress}, ${favorite.city}, CA, ${favorite.zipCode}`}</Address>
          <Price>${numberWithCommas(favorite.price, 1000)}</Price>
        </AddressAndPriceContainer>
  )
}

export default ModalItemDescription;