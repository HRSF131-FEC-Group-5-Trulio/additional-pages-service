import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled, {css} from 'styled-components';
import axios from 'axios';
import Title from './Components/Title/Title';
import Slider from './Components/Slider/Slider';
import Modal from './Components/Modal/Modal';
import SearchBar from './Components/Modal/ModalItems/SearchBar';
import Dropdown from './Components/Modal/ModalItems/Dropdown';

// take some outer contianer stuff and move it onto proxy.
const OuterContainer = styled.div`
  background: rgb(255, 255, 255);
  margin: 0 auto;
  max-width: 1000px;
  line-height: 1.5;
  display: block;
  font-size: 16px;
  letter-spacing: -0.1px;
  //font-family: TruliaSans, system, -apple-system, Roboto, "Segoe UI Bold", Arial, sans-serif;
  font-family: Helvetica;
  & i{
    color: gray;
  }
`
const ModalTitleContainer= styled.div`
  display: flex;
  align-items: center;

`
const SortButton = styled.button`
  //color:red;
  font-weight:bold;
  background-color: white;
  //padding-right: 10%;
  margin-right: 5%;
  border-radius: 8px;
  border-color:rgb(0, 173, 187);
  //line-height: px;
  margin-top: 3%;
  &:hover{
    background-color:black;
    color:white;
    font-weight:bold;
  }

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
      displayRightArrow: true,
      reachedMax: false,
      sortByPriceOptions: ['Lowest to Highest', 'Highest to Lowest'],
      leastToGreatest: false,
    };
    this.arrowButtonHandler = this.arrowButtonHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleScroll= this.handleScroll.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);
    this.handleSortClick = this.handleSortClick.bind(this);

  }

  showModal(){
    this.setState({ show: true });
  }
  hideModal() {
    this.setState({ show: false });
  }
  handleHeartClick(e) {
    console.log('here is heart: ', e.target)
    e.target.style.color = e.target.style.color !== 'red'? 'red': 'rgba(0,0,0,0.4)';
    let id = +e.target.id;
    this.toggleFavoriteStatus(id);
  }
  handleSortClick() {
    const {displayedFavorites, leastToGreatest} = this.state;
    this.setState({displayedFavorites: displayedFavorites.sort((a,b) =>
      leastToGreatest ? b.price-a.price : a.price - b.price), leastToGreatest: !leastToGreatest})
  }
  toggleFavoriteStatus(id) {
    axios.post(`/api/AdditionalListings/${id}/favorites`)
      .then((response) => {
        this.getFavorites((response) => {
          var favorites = JSON.parse(response.data);
          console.log('got favorites!: ',favorites)
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
    const scrollContainer = e.target.parentElement;
    const CELL_WIDTH = 224;
    const LEFT_SCROLL_PIXELS = scrollContainer.scrollLeft % 224 === 0? 224 : scrollContainer.scrollLeft % 224;
    const RIGHT_SCROLL_PIXELS = 224- (scrollContainer.scrollLeft % 224);
    const PIXELS_TO_MOVE = CELL_WIDTH * 3 + (dir === 1 ? RIGHT_SCROLL_PIXELS: LEFT_SCROLL_PIXELS);
    scrollContainer.scrollLeft += (PIXELS_TO_MOVE * dir);
  }
  handleScroll(e) {
    const scrollPosition = e.target.scrollLeft;
    const maxScrollLeft = e.target.scrollWidth - e.target.parentElement.clientWidth;
    if(scrollPosition < 10 ) {
      this.setState({displayLeftArrow: false});
    } else if(scrollPosition ===maxScrollLeft-10) {
      this.setState({displayRightArrow: false, reachedMax: true});
    } else {
      this.setState({displayLeftArrow: true, displayRightArrow: true, reachedMax: false});
    }
  }
  getFavorites(callback) {
    axios.get(`/api/AdditionalListings/favorites`)
      .then(callback)
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
  setKeyword(e) {
    console.log('in setKeyword: ',e.target.value)
  }
  onChangeHandler(e) {
    var query = e.target.value.toLowerCase();
    var filtered = this.state.favoriteList.filter(favorite => {
      var address = `${favorite.streetAddress}, ${favorite.city}, ${favorite.state}, ${favorite.zipCode}`
      return address.toLowerCase().includes(query)
      });
    this.setState({
      displayedFavorites: filtered,
    })
  }

  componentDidMount() {
    axios.get(`/api/AdditionalListings/${this.props.id}/property`)
      .then((response) => {
        var properties = JSON.parse(response.data);
        this.setState({properties, showSlides: properties});
        axios.post(`/api/additionalListings/resetFavorites`).then(response => {
        })
      })
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
    render() {
      const {
        showSlides,
        properties,
        displayLeftArrow,
        displayRightArrow,
        show,
        displayedFavorites,
        favoriteList,
        sortByPriceOptions,
        leastToGreatest
      } = this.state;
        return (
          <OuterContainer>
            <Title showModal={this.showModal}/>
            <Slider handleScroll={this.handleScroll} showSlides={showSlides} handleHeartClick={this.handleHeartClick} arrowButtonHandler={this.arrowButtonHandler} displayLeftArrow={displayLeftArrow} displayRightArrow={displayRightArrow} properties={properties}/>
            <Modal show={show} handleClose={this.hideModal.bind(this)} favorites={displayedFavorites}>
              <ModalTitleContainer>
                <SearchBar favoriteList={favoriteList} onChangeHandler={(e) =>this.onChangeHandler(e)}/>
                <SortButton onClick={this.handleSortClick}>Sort By Price ({leastToGreatest ? '>': '<'})</SortButton>
              </ModalTitleContainer>
            </Modal>
          </OuterContainer>
        )
    }
}

export default App;

