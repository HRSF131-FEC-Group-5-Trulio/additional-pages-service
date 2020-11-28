import ReactDOM from 'react-dom';
import React from 'react';
import styled, {css} from 'styled-components';
import ModalItem from './ModalItem/ModalItem';

const FavoritesContainer = styled.div`
  text-align: left;
  top:50%;
   border: solid rgb(0, 120, 130);
   border-radius: 8px;
   height: 85%;
   width: 70%;
   margin-top: 20px;
   margin-left: auto;
   margin-right: auto;
   background: white;
   overflow-y: auto;
`
const ModalItems = ({favorites}) => (
    <FavoritesContainer>
      {favorites.length === 0? 'No items selected.' : favorites.map(favorite=> {return (
        <ModalItem favorite={favorite} />
      )}
      )}
    </FavoritesContainer>
  )

export default ModalItems;