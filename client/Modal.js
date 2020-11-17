import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import SearchBar from './SearchBar'
const StyledModal = styled.div`
&.modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  & .modal-main {
    display:grid;
    justify-content: center;
    position:fixed;
    background: white;
    width: 40%;
    height: 80%;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    border: solid;
    border-color: green;
  }
  &.display-block {
    display: block;
  }

  &.display-none {
    display: none;
  }
}
`
const sharedStyle = css`
//color: white;
position: absolute;
//left: 15px;
content: '';
height: 33px;
width: 2px;
background-color: #333;
float: left;
//margin-right: 10px;
`
const CloseButton = styled.a`
&.close {
  //color: white;
  position: absolute;
  left: 0%;
  top: 0%;
  float: left;
  width: 5%;
  height: 5%;
  //border: solid;
  padding-top: 5px;
  padding-left: 20px;
  //opacity: 0.3;
}
&.close:hover {
  opacity: 1;
}
&.close:before {
  ${sharedStyle}
}
&.close:after {
  ${sharedStyle}
}
&.close:before {
  transform: rotate(45deg);
}
&.close:after {
  transform: rotate(-45deg);
}
`



const Modal = ({ handleClose, show, children, favorites }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <StyledModal className={showHideClassName} onClick={handleClose}>
      <section className='modal-main'  onClick={stopPropagation}>
      <CloseButton href="#" className="close" onClick={handleClose}/>
        <SearchBar/> <br/>
        hello
  {/* {favorites.map(favorite=> {
    return <div>{favorite}</div><br/>
  })} */}
        
      </section>
    </StyledModal>
  );
};

export default Modal