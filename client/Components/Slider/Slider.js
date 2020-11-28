import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import Listing from './Slides/Listing/Listing';
import LastSlide from './Slides/LastSlide/LastSlide';
import Buttons from './Buttons/Buttons';
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
const NextAndPrevious = css`
  border: 1px solid rgb(232, 233, 234);
  position: absolute;
   width: 30px;
   height: 30px;
  background: #fff;
  color: black;
  top: 135px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  outline: none;
  line-height: 30px;
  text-align: center;

  &:hover {
    transform: scale(1.01);
    box-shadow: -1px 8px 21px -11px rgba(0,0,0,0.58);
  }

`
const PreviousButton = styled.i`
  ${NextAndPrevious}
  left: 0px;
`

const NextButton = styled.i`
  ${NextAndPrevious}
  right: 0px;
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