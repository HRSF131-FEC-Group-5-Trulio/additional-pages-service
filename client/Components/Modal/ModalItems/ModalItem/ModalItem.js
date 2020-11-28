import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import ModalItemDescription from './ModalItemComponents/ModalItemDescription';
import ModalItemImage from './ModalItemComponents/ModalItemImage';

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
var ModalItem = ({favorite}) => (
    <FavoriteContainer className='x'>
      <ModalItemImage favorite={favorite}/>
      <ModalItemDescription favorite={favorite}/>
    </FavoriteContainer>
  )

export default ModalItem;