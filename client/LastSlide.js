import ReactDOM from 'react-dom';
import React from 'react';
import styled, {css} from 'styled-components';

const CellBox = styled.div`
  display: block;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: 16px 8px 0px;
  box-sizing: border-box;
  line-height: 24px;
  //display: block;
  flex-shrink: 0;
  //flex-basis: auto;
  // min-width: 224px;
  width:224px;
  `;
  const ImageDiv = styled.div`
&{
  // border: solid;
  background: white;
  border-radius: 8px;
  border: solid;
  border-color: transparent;
  // //display: flex;
   position: relative;
  // z-index: 0;
   height: 160px;
   overflow:hidden;
}
&:hover button{
  background-color: rgb(0, 120, 130);
  color: rgb(255, 255, 255);
}
`
const Neighborhood = styled.div`
  display: block;
  flex-direction: column;
  //align-items: center;
  background: rgb(232, 233, 234);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: solid;
  //border-width: 0px 16px 0px;
  border-color: transparent;
  white-space: nowrap;
  //text-overflow: ellipsis;
  padding: 8px;
  box-sizing: border-box;
`
const NeightborhoodDescription = styled.div`
  display: block;
  align-items:center;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.5;
`
const NeighborhoodName = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Flag = styled.i`
  font-size: 20px;
  color: darkgray;
  height: 40px;
`
const TakeALookButton = styled.button`
margin: 10px 0px 4px;
border-radius: 8px;
border-width: 1px;
border-style: solid;
cursor: pointer;
display: inline-block;
text-align: center;
font-weight: bold;
transition: top 0.1s ease 0s, box-shadow 0.1s ease 0s, border-color 0.1s ease 0s, background-color 0.1s ease 0s, color 0.1s ease 0s;
white-space: nowrap;
font-size: 16px;
line-height: 1.5;
padding: 8px 16px;
background-color: rgb(255, 255, 255);
color: rgb(0, 120, 130);
border-color: transparent;

`


const LastSlide = function({key}) {
  return (
    <CellBox key={key} >
      <ImageDiv >
        <Neighborhood>
        <Flag className="far fa-flag"></Flag>
          <NeightborhoodDescription>See more Homes for Sale in<br/>
          <NeighborhoodName>Atlanta</NeighborhoodName>
          </NeightborhoodDescription>
          <TakeALookButton>Take a look</TakeALookButton>
        </Neighborhood>
      </ImageDiv>
    </CellBox>
  )
}

export default LastSlide
