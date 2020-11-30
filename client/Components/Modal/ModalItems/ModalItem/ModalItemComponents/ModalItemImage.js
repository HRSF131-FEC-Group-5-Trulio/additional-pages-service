import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

const FavoriteImage = styled.img`
  height: 65px;
  width: 65px;
  float: left;
  line-height: 50px;
  border-radius: 10px;
  margin-left: 5px;
  position: absolute;
`
var ModalItemImage = ({favorite}) => (
      <FavoriteImage src={favorite.imageURL}></FavoriteImage>
  )

export default ModalItemImage;