import ReactDOM from 'react-dom';
import React from 'react';
import styled, {css} from 'styled-components';

const FavoritesLink = styled.button`
  right: 0;
  bottom: 0;
  display: inline-block;
  font-size: 15px;
  position: absolute;

  color: rgb(0, 120, 130);
  background-color: white;
  border-radius: 8px;
  border: solid;
  border-color: rgb(0, 120, 130);
  font-weight: bold;
  &:hover {
    transform: scale(1.0);
    background-color: rgb(0, 120, 130);
    color: white;
    border-color: transparent;
  }

`
const ShowFavorites = ({showModal}) => (
        <FavoritesLink onClick={showModal}>View your favorites list!</FavoritesLink>
  )

export default ShowFavorites;