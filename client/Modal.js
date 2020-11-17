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
    // display:grid;
    // justify-content: center;
    position:fixed;
    background: white;
    width: 45%;
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
const FavoritesContainer = styled.div`
  position: absolute;
  border: solid;
  height: 85%;
  width: 70%;
  top: 75px;
  left: 75px;
`

//Add a shadow??
class Modal extends React.Component {
  constructor(props) {
    super(props);

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
          <SearchBar/>
          <FavoritesContainer>
            {this.props.favorites.map(favorite=> {return <div>{favorite}</div>})}
          </FavoritesContainer>
        </section>
      </StyledModal>
    );
  }
};

export default Modal