import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import Listing from './Listing/Listing';


const ListingSlides = ({showSlides, handleHeartClick}) => (
      showSlides.length > 0 ? showSlides.map((image, index) => (
        <Listing image={image} handleHeartClick= {handleHeartClick} index={index}/>
      )) : <div>{''}</div>
  )


export default ListingSlides;