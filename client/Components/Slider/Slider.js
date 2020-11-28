import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import Listing from './Slides/Listing/Listing';
import LastSlide from './Slides/LastSlide';
 import NextArrowButton from './Buttons/NextArrowButton';
import PreviousArrowButton from "./Buttons/PreviousArrowButton";
//change Buttons

const FlexContainer = styled.div`
&{
   display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    right: 100px;
    margin-left: -8px;
    margin-right: -8px;
    border: solid;
    border-color: transparent;
 }
 &::-webkit-scrollbar {
    display: none;
  }
`;
const ContentSlider = styled.div`
position: relative;
box-sizing: border-box;
display: block;
outline: none;
margin-left: -8px;
 margin-right: -8px;
&::-webkit-scrollbar {
  display: none;
}
`

const Slider = ({handleScroll, showSlides, handleHeartClick, arrowButtonHandler,displayLeftArrow, displayRightArrow, properties}) => {
  return (
    <ContentSlider onScroll={handleScroll}>
      <FlexContainer>
      {showSlides.length > 0 ? showSlides.map((image, index) => (
        <Listing image={image} handleHeartClick= {handleHeartClick} index={index}/>
      )) : <div>{''}</div>}
      {<LastSlide propertiesLength={properties.length}/>}
        <PreviousArrowButton arrowButtonHandler={arrowButtonHandler} displayLeftArrow={displayLeftArrow} />
        <NextArrowButton arrowButtonHandler={arrowButtonHandler} displayRightArrow={displayRightArrow} />
      </FlexContainer>
    </ContentSlider>
  )
}

export default Slider;