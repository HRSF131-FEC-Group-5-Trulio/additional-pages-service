import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';
import Modal from "./Modal";
import axios from "axios";
//probably will import a slider from react-slick;

// need to import an icon library and put it into component.

const DescriptionBox = styled.div`
  //display: block;
  //background: white;
  //outline: none;
  //box-sizing: border-box;
  padding: 8px 0px 0px;
`;
const FlexContainer = styled.div`
&{
   display: flex;
  //  flex-wrap: nowrap;
    overflow-x: auto;
    margin-left: -8px;
    margin-right: -8px;
    margin-top: -16px;
    border: solid;
    border-color: transparent;
 }
 &::-webkit-scrollbar {
    display: none;
  }
`;

const CellBox = styled.div`
  display: block;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: 16px 8px 0px;
  box-sizing: border-box;
  line-height: 24px;
  display: block;
  flex-shrink: 0;
  //flex-basis: auto;
  // min-width: 224px;
  width:224px;
  `;

  const Image = styled.img`
   &{  width: 100%;
     height: 100%;
    // object-fit: cover;
    // position: relative;
    // display: flex;
     border-radius: 8px;
    // box-sizing: border-box;
    transition: transform 1.3s ease;
   }
    &:hover{
      transform: scale(1.1);
    }
`
const Price = styled.div`
  // flex-direction: row;
  //   -webkit-box-align: center;
  //   //align-items: center;
  //   //display: flex;
     font-weight: bold;
     font-size: 20px;
  //   line-height: 1.2;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   outline: none;
`
const ImageDiv = styled.div`
&{
  // border: solid;
  background: white;
  border-radius: 8px;
  border: solid;
  border-color: transparent;
  // //display: flex;
   position: relative;
  // z-index: 0;
   height: 160px;
   overflow:hidden;
}
&:hover button{
  background-color: rgb(0, 120, 130);
  color: rgb(255, 255, 255);
}
`
const Neighborhood = styled.div`
  display: block;
  flex-direction: column;
  //align-items: center;
  background: rgb(232, 233, 234);
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: solid;
  //border-width: 0px 16px 0px;
  border-color: transparent;
  white-space: nowrap;
  //text-overflow: ellipsis;
  padding: 8px;
  box-sizing: border-box;
`
const NeightborhoodDescription = styled.div`
  display: block;
  align-items:center;
  flex-direction: column;
  font-size: 14px;
  line-height: 1.5;
`
const NeighborhoodName = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Flag = styled.i`
  font-size: 20px;
  color: darkgray;
  height: 40px;
`
const TakeALookButton = styled.button`
margin: 10px 0px 4px;
border-radius: 8px;
border-width: 1px;
border-style: solid;
cursor: pointer;
display: inline-block;
text-align: center;
font-weight: bold;
transition: top 0.1s ease 0s, box-shadow 0.1s ease 0s, border-color 0.1s ease 0s, background-color 0.1s ease 0s, color 0.1s ease 0s;
white-space: nowrap;
font-size: 16px;
line-height: 1.5;
padding: 8px 16px;
background-color: rgb(255, 255, 255);
color: rgb(0, 120, 130);
border-color: transparent;

`
const HeartIcon = styled.i`
  position: absolute;
  font-size: 25px;
  top: 0;
  right: 0;
  margin-top: 10px;
  margin-right: 10px;
  color: rgba(0,0,0,0.4);
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
  // &:hover{
  //   color: red;
  // }
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
    transform: scale(1.0); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    //font-weight: bold;
    //font-size: 20px;
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
      favoriteList:[],
      show: false,
    };
  }

  /*
  click handler for the heart. should change the css of the heart to toggle fill in and not fill in.
  post request to mark this favorite as not whatever it is now.


  */
  showModal (){
    this.setState({ show: true });
  }
  hideModal () {
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
    //use e.target.id
    // send a post request
    axios.post('/favorites',{id})
      .then((response) => {
        console.log(response);
        //var parsed = JSON.parse(response.data);
        //this.setState({favoriteList: parsed});
        this.getFavorites();
      })
      .catch(function (error) {
      console.log('error in post: ', error);
    })
  }
  getFavorites() {
    //need to reset favorites or keep favorite status...
    axios.get('/favorites')
      .then((response) => {
        console.log(response);
        var parsed = JSON.parse(response.data);
        this.setState({favoriteList: parsed});
      })
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
  numberWithCommas(x, roundToNearest) {
    x = Math.round(x/roundToNearest)*roundToNearest
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  componentDidMount() {
    axios.get('/property')
      .then((response) => {
        console.log(response);
        var properties = JSON.parse(response.data);
        console.log(properties);
        this.setState({properties});
        // also update the database to set all favorites to false. either that or set the heart to red conidtionally.
        axios.post('/resetFavorites').then(response => {
          console.log('favorites reset!')
        })
      })
      .catch(function (error) {
      console.log('error in get: ', error);
    })
  }
    render() {
        return (
          <div className="hello">
            <TitleContainer>
            <h2 >Similar Homes You May Like</h2>
            <FavoritesLink onClick={e => {this.showModal();}}>View your favorites list!</FavoritesLink>
            </TitleContainer>
            <FlexContainer>
              {this.state.properties.length > 0 ? this.state.properties.map((image, index) => (
                <CellBox key={index}>
                  <ImageDiv>
                    <Image src={image.imageURL}/><HeartIcon id={image.id} onClick={(e) => this.handleHeartClick(e)} className="fas fa-heart"></HeartIcon>
                  </ImageDiv>
                  <DescriptionBox>
                    <Price>${this.numberWithCommas(image.price, 1000)}</Price>
                    <div className="bedBath"><i className="fas fa-bed"></i> {image.Beds}bd, <i className="fas fa-bath"></i> {image.Baths}ba, <i className="fas fa-campground"></i> {this.numberWithCommas(image.Sqft, 10)}sqft</div>
                    <div>{image.streetAddress}</div>
                    <div>{`${image.city}, ATL, ${image.zipCode}`}</div>
                  </DescriptionBox>
                </CellBox>
              )) : ''}
              {<CellBox key={this.state.properties.length} >
              <ImageDiv >
                <Neighborhood>
                <Flag className="far fa-flag"></Flag>
                  <NeightborhoodDescription>See more Homes for Sale in<br/>
                  <NeighborhoodName>Atlanta</NeighborhoodName>
                  </NeightborhoodDescription>
                  <TakeALookButton>Take a look</TakeALookButton>
                </Neighborhood>
              </ImageDiv>
            </CellBox>}
            </FlexContainer>

            <Modal show={this.state.show} handleClose={this.hideModal.bind(this)} favorites={this.state.favoriteList} >
              {
                /*
                maybe a search bar and a list of favorites.
                */
              }
          <p>Modal</p>
          <p>Data</p>
        </Modal>
          </div>
        )
    }
}

export default App;

