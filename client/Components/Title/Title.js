import ReactDOM from 'react-dom';
import React from 'react';
import styled, {css} from 'styled-components';
import ShowFavorites from './ShowFavorites/ShowFavorites';

const TitleContainer = styled.div`
  display:flex;
  position: relative;
  width: 100%;
`

const Title = ({showModal}) => (
    <TitleContainer>
      <h2 >Similar Homes You May Like</h2>
      <ShowFavorites showModal={showModal} />
    </TitleContainer>
  )

export default Title;