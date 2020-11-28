import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import SearchBar from './SearchBar';
import ModalItem from './ModalItem/ModalItem.js';

const StyledModal = styled.div`
&.modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);

  & .modal-main {
    position:fixed;
    width: 45%;
    height: 80%;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    border-radius: 20px;
    border: solid rgb(0, 120, 130);
    //border-color: green;
    background:rgb(224, 247, 248);
    //background: rgb(204, 255, 204);
  }
  &.display-block {
    display: flex;
    justify-content: center;
    text-align:center;

  }
  &.display-none {
    display: none;
  }
}
`
const sharedStyle = css`
position: absolute;
content: '';
height: 33px;
width: 2px;
background-color: #333;
float: left;
`
const CloseButton = styled.a`
&.close {
  position: absolute;
  left: 0%;
  top: 0%;
  float: left;
  width: 5%;
  height: 5%;
  padding-top: 5px;
  padding-left: 20px;
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
const FavoritesContainer = styled.div`
  text-align: left;
  top:50%;
   border: solid rgb(0, 120, 130);
   border-radius: 8px;
   height: 85%;
   width: 70%;
   margin-top: 20px;
   margin-left: auto;
   margin-right: auto;
   background: white;
   overflow-y: auto;
`

//Add a shadow??
class Modal extends React.Component {
  constructor(props) {
    super(props);

  }
  numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
}
  stopPropagation(e) {
    e.stopPropagation();
  }

  render(){
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    return (
      <StyledModal className={showHideClassName} onClick={this.props.handleClose}>
        <section className='modal-main'  onClick={this.stopPropagation}>
        <CloseButton href="#" className="close" onClick={this.props.handleClose}/>
          {this.props.children}
          <FavoritesContainer>
            {this.props.favorites.length === 0? 'No items selected.' : this.props.favorites.map(favorite=> {return (
              <ModalItem favorite={favorite} numberWithCommas={this.numberWithCommas.bind()} />
            )}
            )}
          </FavoritesContainer>
        </section>
      </StyledModal>
    );
  }
};

export default Modal