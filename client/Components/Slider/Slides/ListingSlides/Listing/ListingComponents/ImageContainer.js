import React from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';

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


var ImageContainer = ({image, handleHeartClick}) => {
  function clickHandler(e, id) {
    var imageLocation= window.location.href.split('/');
    if(imageLocation.length === 4) {
      console.log('imageLocation: ', imageLocation)
      imageLocation[3] = ((''+id).padStart(2, '0'));
      location.assign(imageLocation.join('/'));
    } else {
      console.log('imageLocation: ', imageLocation)
      imageLocation[imageLocation.length - 2] = (''+ id).padStart(2,'0');
      location.assign(imageLocation.join('/'));
    }
  }
  return (
      <ImageDiv>
        <Image src={image.imageURL} onClick={(e) => clickHandler(e,image.id)}/><HeartIcon id={image.id} onClick={(e) => handleHeartClick(e)} className="fas fa-heart"></HeartIcon>
      </ImageDiv>
  )
}

export default ImageContainer;