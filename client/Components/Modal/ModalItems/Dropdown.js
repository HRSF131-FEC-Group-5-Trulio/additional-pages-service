
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const dropdownWrapper = styled.div`
  border:solid black;
  display:flex;
  background: black;

`;
const dropdownHeader= styled.div`
  border:solid;
  background-color: black;
`;
const dropdownHeaderTitle= styled.div`
  border:solid black;
  background: red;
`;

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    //console.log('just checking')
  }
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <dropdownWrapper>
        <dropdownHeader onClick={() => this.toggleList()}>
          <dropdownHeaderTitle style={{border:'solid black'}}>{headerTitle}</dropdownHeaderTitle>
          {listOpen
            ? <i class="fas fa-angle-up" size="2x"></i>
            : <i class="fas fa-angle-down" size="2x"></i>
          }
        </dropdownHeader>
        {listOpen && <ul className="dd-list" >
         {list.map((item, index) => {
           //console.log('item');
           return <div className="dd-list-item" key={index} style={{zIndex: '1', border:'solid black'}}>{item}</div>
        })}
        </ul>}
      </dropdownWrapper>
    )
  }
}

export default Dropdown;