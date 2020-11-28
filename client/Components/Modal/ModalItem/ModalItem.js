import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const FavoriteContainer = styled.div`
  position: relative;
  border: solid rgb(0, 173, 187);
  border-radius: 6px;
  display: flex;
  align-items: center;
  background: rgb(224, 247, 248);
  min-height: 70px;
  height: 100%
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &:hover {
    border-color: red;
  }
`
const FavoriteImage = styled.img`
  height: 65px;
  width: 65px;
  float: left;
  line-height: 50px;
  border-radius: 10px;
  margin-left: 5px;
  position: absolute;
`
const AddressAndPriceContainer = styled.div`
//position: absolute;
//border: solid;
margin-left: 80px;
//padding-left: 30px;
//margin: 10px 5px;
`
const Price = styled.div`
`
const Address = styled.div`
 font-weight: bold;
`
var ModalItem = function({favorite, numberWithCommas}) {
  return (
    <FavoriteContainer className='x'>
      <FavoriteImage src={favorite.imageURL}></FavoriteImage>
        <AddressAndPriceContainer>
          <Address key={favorite.id}>{`${favorite.streetAddress}, ${favorite.city}, CA, ${favorite.zipCode}`}</Address>
          <Price>${numberWithCommas(favorite.price, 1000)}</Price>
        </AddressAndPriceContainer>
    </FavoriteContainer>
  )
}

export default ModalItem;