import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const FavoriteContainer = styled.div`
  position: relative;
  border: solid;
  border-radius: 8px;
  // &.x{
  //   cursor: pointer;
  //   position: absolute;
  //   top: 50%;
  //   right: 0%;
  //   padding: 12px 16px;
  //   transform: translate(0%, -50%);
  // }
`
const FavoriteImage = styled.img`
  height: 30px;
  width: 30px;
  float: left;
  line-height: 50px;
  border-radius: 10px;
  border: solid green;
  position: absolute;
`
const AddressAndPriceContainer = styled.div`
//position: absolute;
border: solid red;
margin-left: 30px;
//padding-left: 30px;
//margin: 10px 5px;
`
const Price = styled.div`

`
const Address = styled.div`

`
var ModalItem = function({favorite, numberWithCommas}) {
  return (
    <FavoriteContainer className='x'>
      <FavoriteImage src={favorite.imageURL}></FavoriteImage>
        <AddressAndPriceContainer>
          <Address key={favorite.id}>{`${favorite.streetAddress}, ${favorite.city}, ATL, ${favorite.zipCode}`}</Address>
          <Price>${numberWithCommas(favorite.price, 1000)}</Price>
        </AddressAndPriceContainer>
    </FavoriteContainer>
  )
}

export default ModalItem;