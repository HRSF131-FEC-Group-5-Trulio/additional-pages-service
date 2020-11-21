import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled, {css} from 'styled-components';
import Modal from './Modal';
import axios from 'axios';
import Listing from './Listing';
import LastSlide from './LastSlide';
//probably will need to import fonts eventually.


const FlexContainer = styled.div`
&{
   display: flex;
   //position: relative;
  //  flex-wrap: nowrap;
    overflow-x: auto;
    right: 100px;
    margin-left: -8px;
    margin-right: -8px;
   // margin-top: -16px;
    border: solid;
    //width: 500px;
    //height: 200px;
    border-color: transparent;
    // background-color: black;
 }
 &::-webkit-scrollbar {
    display: none;
  }
`;
const ContentSlider = styled.div`
position: relative;
box-sizing: border-box;
display: block;
//margin-top: px;
//overflow-x: auto;
outline: none;
//left: 100px;
margin-left: -8px;
 margin-right: -8px;
 //border: solid;
//padding: 0px;
// border-width: 16px 8px 0px;
// flex-shrink: 0;
// width:224px;
&::-webkit-scrollbar {
  display: none;
}
`

const FavoritesLink = styled.button`
  //float: right;
  right: 0;
  bottom: 0;
  display: inline-block;
  font-size: 15px;
  position: absolute;

  color: rgb(0, 120, 130);
  background-color: white;
  border-radius: 8px;
  border: solid;
  border-color: rgb(0, 120, 130);
  font-weight: bold;
  &:hover {
    transform: scale(1.0);
    background-color: rgb(0, 120, 130);
    color: white;
    border-color: transparent;
  }

`
const TitleContainer = styled.div`
  display:flex;
  position: relative;
  width: 100%;
`
const Item = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 250px;
width: 100%;
background-color: #683bb7;
color: #fff;
margin: 15px;
font-size: 4em;
`

const NextAndPrevious = css`
  border: 1px solid rgb(232, 233, 234);
  position: absolute;
   width: 30px;
   height: 30px;
  //padding: 10px 10px 10px 10px;
  //min-width: 50px;
  background: #fff;
  color: black;
  top: 135px;
  border-radius: 50%;
  //font-weight: 600;
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

  &{
    ${NextAndPrevious}
  }
  right: 0px;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
      favoriteList:[],
      show: false,
      showSlides:[],
      scrollPosition: 0,
    };
  }

  showModal(){
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({ show: false });
  }
  handleHeartClick(e) {
    //console.log(e.target.style.color);
    e.target.style.color = e.target.style.color !== 'red'? 'red': 'rgba(0,0,0,0.4)';
    console.log(e.target.id);
    let id = +e.target.id;
    // set the state
    this.toggleFavoriteStatus(id);
  }
  toggleFavoriteStatus(id) {
    axios.post('/api/favorites',{id})
      .then((response) => {
        console.log(response);
        this.getFavorites((response) => {
          console.log(response);
          var parsed = JSON.parse(response.data);
          this.setState({favoriteList: parsed});
        });
      })
      .catch(function (error) {
      console.log('error in post: ', error);
    })
  }
  nextButtonHandler(e) {
    console.log(e.target.parentElement.children);
    e.target.parentElement.scrollLeft += 200;
    var maxScrollLeft = e.target.parentElement.scrollWidth - e.target.parentElement.clientWidth;
    // if(e.target.parentElement.display === 'none') {
    //   e.target.parentElement.display = 'block';
    // }
    if(e.target.parentElement.scrollLeft===maxScrollLeft) {
      e.target.style.display = 'none';
      console.log('right side reached!');
    }

    //check scrollLeft = max

    //this.setState({showSlides: this.state.properties.slice(3)})
    // probably need to get from database, and change hearts accordingly
  }
  previousButtonHandler(e) {
    console.log(e.target.parentElement.scrollLeft)
    e.target.parentElement.scrollLeft -= 200;
    //check scrollLeft equals zero
    // have a scrollposition state?
    // if(e.target.parentElement.scrollLeft===0) {
    //   console.log(e.target.style.display);
    //   e.target.style.display = 'block';
    //   console.log('left side reached!');
    // }
    this.setState({scrollPosition: e.target.parentElement.scrollLeft})


    //this.setState({showSlides: this.state.properties.slice()})
    // need to get from database, change hearts accordingly. or maybe just from favorites list.
  }
  getFavorites(callback) {
    axios.get('/api/favorites')
      .then(callback)
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
  numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    axios.get('/api/property')
      .then((response) => {
        console.log(response);
        var properties = JSON.parse(response.data);
        console.log(properties);
        this.setState({properties, showSlides: properties});
        axios.post('/api/resetFavorites').then(response => {
          console.log('favorites reset!');
        })
      })
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
    render() {
        return (
          <div>
            <TitleContainer>
            <h2 >Similar Homes You May Like</h2>
            <FavoritesLink onClick={e => {this.showModal();}}>View your favorites list!</FavoritesLink>
            </TitleContainer>
            <ContentSlider>
            <FlexContainer>
              {this.state.showSlides.length > 0 ? this.state.showSlides.map((image, index) => (
                <Listing image={image} handleHeartClick= {this.handleHeartClick.bind(this)} index={index} numberWithCommas = {this.numberWithCommas}/>
              )) : <div>{''}</div>}
              {
                <LastSlide key={this.state.properties.length}/>
              }
            <PreviousButton className="fas fa-angle-left" onClick={this.previousButtonHandler.bind(this)}style={{display: this.state.scrollPosition === 0 ? 'none':'block'}}></PreviousButton>
            <NextButton className="fas fa-angle-right" onClick={this.nextButtonHandler.bind(this)}></NextButton>
            </FlexContainer>
            </ContentSlider>
            <Modal show={this.state.show} handleClose={this.hideModal.bind(this)} favorites={this.state.favoriteList} ></Modal>
          </div>
        )
    }
}

export default App;

// for (let i = 0; i < next.length; i++) {
//   //refer elements by class name

//   let position = 0; //slider postion

//   prev[i].addEventListener("click", function() {
//     //click previos button
//     if (position > 0) {
//       //avoid slide left beyond the first item
//       position -= 1;
//       translateX(position); //translate items
//     }
//   });

//   next[i].addEventListener("click", function() {
//     if (position >= 0 && position < hiddenItems()) {
//       //avoid slide right beyond the last item
//       position += 1;
//       translateX(position); //translate items
//     }
//   });
// }

// function hiddenItems() {
//   //get hidden items
//   let items = getCount(item, false);
//   let visibleItems = slider.offsetWidth / 210;
//   return items - Math.ceil(visibleItems);
// }
// }

// function translateX(position) {
// //translate items
// slide.style.left = position * -210 + "px";
// }

// function getCount(parent, getChildrensChildren) {
// //count no of items
// let relevantChildren = 0;
// let children = parent.childNodes.length;
// for (let i = 0; i < children; i++) {
//   if (parent.childNodes[i].nodeType != 3) {
//     if (getChildrensChildren)
//       relevantChildren += getCount(parent.childNodes[i], true);
//     relevantChildren++;
//   }
// }
// return relevantChildren;
// }