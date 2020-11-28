import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled, {css} from 'styled-components';
import axios from 'axios';
import Title from './Components/Title/Title';
import Slider from './Components/Slider/Slider';
import Modal from './Components/Modal/Modal';
import SearchBar from './Components/Modal/SearchBar';


const OuterContainer = styled.div`
  background: rgb(255, 255, 255);
  margin: 0 auto;
  max-width: 1000px;
  line-height: 1.5;
  display: block;
  font-size: 16px;
  letter-spacing: -0.1px;
  font-family: TruliaSans, system, -apple-system, Roboto, "Segoe UI Bold", Arial, sans-serif;
  & i{
    color: gray;
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
    };
    this.arrowButtonHandler = this.arrowButtonHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleScroll= this.handleScroll.bind(this);
    this.handleHeartClick = this.handleHeartClick.bind(this);

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
    const PIXELS_MOVED = this.state.reachedMax ?  765 : 896;
    e.target.parentElement.scrollLeft += (PIXELS_MOVED * dir);
  }
  handleScroll(e) {
    const scrollPosition = e.target.scrollLeft;
    const maxScrollLeft = e.target.scrollWidth - e.target.parentElement.clientWidth;
    if(scrollPosition === 0) {
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
        console.log(response);
        var properties = JSON.parse(response.data);
        console.log(properties);
        this.setState({properties, showSlides: properties});
        axios.post(`/api/additionalListings/resetFavorites`).then(response => {
           console.log('favorites reset!');
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
        favoriteList
      } = this.state;
        return (
          <OuterContainer>
            <Title showModal={this.showModal}/>
            <Slider handleScroll={this.handleScroll} showSlides={showSlides} handleHeartClick={this.handleHeartClick} arrowButtonHandler={this.arrowButtonHandler} displayLeftArrow={displayLeftArrow} displayRightArrow={displayRightArrow} properties={properties}/>
            <Modal show={show} handleClose={this.hideModal.bind(this)} favorites={displayedFavorites}>
              {<SearchBar favoriteList={favoriteList} onChangeHandler={(e) =>this.onChangeHandler(e)}/>}
            </Modal>
          </OuterContainer>
        )
    }
}

export default App;

