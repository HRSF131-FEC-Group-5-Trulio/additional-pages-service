import React from "react";
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import ModalItems from './ModalItems/ModalItems.js';

const StyledModal = styled.div`
&.modal {
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index:100;

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
height: 25px;
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
  padding-top: 10px;
  padding-left: 5px;
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

//Add a shadow??
class Modal extends React.Component {
  constructor(props) {
    super(props);

  }
//   getHighlightedText(text, highlight) {
//     // Split text on highlight term, include term itself into parts, ignore case
//     const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//     return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
// }
  stopPropagation(e) {
    e.stopPropagation();
  }

  render(){
    const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
    const {
      handleClose,
      favorites,
      children,
    } = this.props;
    return (
      <StyledModal className={showHideClassName} onClick={handleClose}>
        <section className='modal-main'  onClick={this.stopPropagation}>
        <CloseButton href="#" className="close" onClick={handleClose}/>
          {children}
          <ModalItems favorites={favorites} />
        </section>
      </StyledModal>
    );
  }
};

export default Modal