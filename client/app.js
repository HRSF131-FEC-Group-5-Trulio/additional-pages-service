import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled, {css} from 'styled-components';
import Modal from "./Modal";
import axios from "axios";
//probably will need to import fonts eventually.

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
   position: relative;
  //  flex-wrap: nowrap;
    overflow-x: auto;
    margin-left: -8px;
    margin-right: -8px;
    margin-top: -16px;
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

const CellBox = styled.div`
  display: block;
  cursor: pointer;
  border-style: solid;
  border-color: transparent;
  border-width: 16px 8px 0px;
  box-sizing: border-box;
  line-height: 24px;
  //display: block;
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
  top: 125px;
  border-radius: 50%;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  outline: none;
  line-height: 30px;
  text-align: center;

  &:hover {
    transform: scale(1.05);
    box-shadow: -1px 8px 21px -11px rgba(0,0,0,0.58);
  }

`
const PreviousButton = styled.i`

  ${NextAndPrevious}
  left: 0;
`

const NextButton = styled.i`

  &{
    ${NextAndPrevious}
  }
  right: 0;
`


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
      favoriteList:[],
      show: false,
      showSlides:[],
    };
  }

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
    axios.post('/favorites',{id})
      .then((response) => {
        console.log(response);
        this.getFavorites();
      })
      .catch(function (error) {
      console.log('error in post: ', error);
    })
  }
  getFavorites() {
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
          <div>
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

              )) : <div>{''}</div>}
              {
                <CellBox key={this.state.properties.length} >
              <ImageDiv >
                <Neighborhood>
                <Flag className="far fa-flag"></Flag>
                  <NeightborhoodDescription>See more Homes for Sale in<br/>
                  <NeighborhoodName>Atlanta</NeighborhoodName>
                  </NeightborhoodDescription>
                  <TakeALookButton>Take a look</TakeALookButton>
                </Neighborhood>
              </ImageDiv>
            </CellBox>
            }
            {/* <i class="fas fa-angle-left"></i> */}
            <PreviousButton className="fas fa-angle-left"></PreviousButton>
            {/* <i class="fas fa-angle-right"></i> */}


            <NextButton className="fas fa-angle-right"></NextButton>
            </FlexContainer>

            <Modal show={this.state.show} handleClose={this.hideModal.bind(this)} favorites={this.state.favoriteList} ></Modal>
          </div>
        )
    }
}

export default App;
