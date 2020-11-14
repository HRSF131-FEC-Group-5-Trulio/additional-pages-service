import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styled from 'styled-components';

const DescriptionBox = styled.div`
  display: block;
  outline: none;
  box-sizing: border-box;
  padding: 8px 0px 0px;
`;
const ContentSlider = styled.div`
  overflow: hidden;
  outline: none;
  box-sizing: border-box;
  display: block;
  margin-bottom: -18px;
  padding-bottom: 18px;
`;
const FlexContainer = styled.div`
&{
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  margin-left: -8px;
  margin-right: -8px;
  margin-top: -16px;
  border: solid;
  border-color: red;
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
  flex-basis: auto;
  min-width: 224px;
  width:224px;
  `;

  const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    display: flex;
    box-sizing: border-box;
`
const Price = styled.div`
  flex-direction: row;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    font-weight: bold;
    font-size: 20px;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    outline: none;
`
const ImageDiv = styled.div`
  border: solid;
  border-color: green;
  display: flex;
  position: relative;
  z-index: 0;
  height: 160px;
  border-radius: 8px;
`

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      properties: [],
    };
  }

  componentDidMount() {
    //ajax call to the server to get stuff from the database.
    $.ajax({
      url: 'http://localhost:3000/property',
      method: 'GET',
      success: (data) => {
        console.log('ajax request succesful!' + data);
        var parsed = JSON.parse(data);
        this.setState({properties: parsed});
        //console.log(data[0].imageURL)
      },
      error: (err) => {
        console.log('ajax request error' + err);
      }
    })
  }
    render() {
        return (
          <ContentSlider>
            <h3>Similar Homes You May Like</h3>
            <FlexContainer>
              {this.state.properties.length > 0 ? this.state.properties.map((image, index) => (
                <CellBox>
                  <ImageDiv>
                    <Image src={image.imageURL}/>
                  </ImageDiv>
                  <DescriptionBox>
                    <Price>$2,245,000</Price>
                    <div className="bedBath">6 bd, 6 ba, 5846 sqft</div>
                    <div>405 9th St NE</div>
                    <div>Midtown, Atlanta, GA</div>
                  </DescriptionBox>
                </CellBox>
              )

              ) : ''}
            </FlexContainer>
          </ContentSlider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));