import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled, {css} from 'styled-components';
import Modal from './Modal';
import axios from 'axios';
import Listing from './Listing';
import LastSlide from './LastSlide';
import SearchBar from './SearchBar';
//probably will need to import fonts eventually.

const OuterContainer = styled.div`

background: rgb(255, 255, 255);
margin:    0 auto;
        max-width: 1000px;
//position: absolute;
//border: solid;
        /* display: flex;
        justify-content: center;
        overflow-x: hidden; */
        /* -webkit-box-pack: center; */
        /* width: 100%;
        text-align: center; */
        line-height: 1.5;
        display: block;
        font-size: 16px;
        letter-spacing: -0.1px;
        font-family: TruliaSans, system, -apple-system, Roboto, "Segoe UI Bold", Arial, sans-serif;
        & i{
          color: gray;
        }
`
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
  ${NextAndPrevious}
  right: 0px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
      favoriteList:[],
      displayedFavorites:[],
      show: false,
      showSlides:[],
      scrollPosition: 0,
      displayLeftArrow: false,
      displayRightArrow: true
    };
    this.arrowButtonHandler = this.arrowButtonHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  showModal(){
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({ show: false });
  }
  handleHeartClick(e) {
    e.target.style.color = e.target.style.color !== 'red'? 'red': 'rgba(0,0,0,0.4)';
    let id = +e.target.id;
    this.toggleFavoriteStatus(id);
  }
  toggleFavoriteStatus(id) {
    axios.post('/api/favorites',{id})
      .then((response) => {
        this.getFavorites((response) => {
          var favorites = JSON.parse(response.data);
          this.setState({
            favoriteList: favorites,
            displayedFavorites: favorites,
          });
        });
      })
      .catch(function (error) {
      console.log('error in post: ', error);
    })
  }
  arrowButtonHandler(e, dir) {
    e.target.parentElement.scrollLeft += (200 * dir);
  }
  handleScroll(e) {
    var scrollPosition = e.target.scrollLeft;
    var maxScrollLeft = e.target.scrollWidth - e.target.parentElement.clientWidth;
    if(scrollPosition === 0) {
      this.setState({displayLeftArrow: false});
    } else if(scrollPosition ===maxScrollLeft-10) {
      this.setState({displayRightArrow: false});
    } else {
      this.setState({displayLeftArrow: true, displayRightArrow: true});
    }
  }
  getFavorites(callback) {
    axios.get('/api/favorites')
      .then(callback)
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
  setKeyword(e) {
    console.log('in setKeyword: ',e.target.value)
  }
  onChangeHandler(e) {
    //filter .includes
    var query = e.target.value.toLowerCase();
    var filtered = this.state.favoriteList.filter(favorite =>
      `${favorite.streetAddress}, ${favorite.city}, ${favorite.state}, ${favorite.zipCode}`.toLowerCase().includes(query)
      );
    this.setState({
      displayedFavorites: filtered,
    })
  }
  getHighlightedText(text, highlight) {
    // Split text on highlight term, include term itself into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span>{parts.map(part => part.toLowerCase() === highlight.toLowerCase() ? <b>{part}</b> : part)}</span>;
}
  componentDidMount() {
    axios.get('/api/property')
      .then((response) => {
        console.log(response);
        var properties = JSON.parse(response.data);
        console.log(properties);
        this.setState({properties, showSlides: properties});
        axios.post('/api/resetFavorites').then(response => {
          // console.log('favorites reset!', 'also, left arrow: ', this.state.displayLeftArrow);
        })
      })
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
    render() {
      console.log('here is state: ',this.state)
        return (
          <OuterContainer>
            <TitleContainer>
            <h2 >Similar Homes You May Like</h2>
              <FavoritesLink onClick={e => {this.showModal();}}>View your favorites list!</FavoritesLink>
            </TitleContainer>
            <ContentSlider onScroll={this.handleScroll.bind(this)}>
              <FlexContainer>
              {this.state.showSlides.length > 0 ? this.state.showSlides.map((image, index) => (
                <Listing image={image} handleHeartClick= {this.handleHeartClick.bind(this)} index={index}/>
              )) : <div>{''}</div>}
              {<LastSlide key={this.state.properties.length}/>}
                <PreviousButton className="fas fa-angle-left" onClick={(e) => this.arrowButtonHandler.call(this, e, -1 )} style={{visibility: this.state.displayLeftArrow ? 'visible':'hidden'}}></PreviousButton>
                <NextButton className="fas fa-angle-right" onClick={(e) => this.arrowButtonHandler.call(this, e, 1 )} style={{visibility: this.state.displayRightArrow ? 'visible':'hidden'}}></NextButton>
              </FlexContainer>
            </ContentSlider>
            <Modal show={this.state.show} handleClose={this.hideModal.bind(this)} favorites={this.state.displayedFavorites}>
              {<SearchBar favoriteList={this.state.favoriteList} onChangeHandler={(e) =>this.onChangeHandler(e)}/>}
            </Modal>
          </OuterContainer>
        )
    }
}

export default App;

