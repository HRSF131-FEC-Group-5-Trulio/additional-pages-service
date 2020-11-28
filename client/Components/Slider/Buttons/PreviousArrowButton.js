import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';


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

const PreviousArrowButton= ({arrowButtonHandler,displayLeftArrow}) => {
  return (
        <PreviousButton className="fas fa-angle-left" onClick={(e) => {arrowButtonHandler( e, -1 ); console.log('in arrowbuttonhandler')}} style={{visibility: displayLeftArrow ? 'visible':'hidden'}}></PreviousButton>
  )
}

export default PreviousArrowButton;