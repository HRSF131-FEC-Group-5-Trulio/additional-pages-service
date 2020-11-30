import React from 'react'
import {mount, shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/app.js';
import Modal from '../client/Components/Modal/Modal';
import Slider from '../client/Components/Slider/Slider';
import Title from '../client/Components/Title/Title';

import TestRenderer from 'react-test-renderer';
// import Link from '../Link.react';

test('shallow renders App component', () => {
  const wrapper = shallow(<div><App /></div>);
  expect(wrapper.find(App)).toHaveLength(1);
})

test('shallow renders Modal component', () => {
  const wrapper = shallow(<div><Modal /></div>);
  expect(wrapper.find(Modal)).toHaveLength(1);
})
test('shallow renders Slider component', () => {
  const wrapper = shallow(<div><Slider /></div>);
  expect(wrapper.find(Slider)).toHaveLength(1);
})




test('App component contains Title component', () => {
  const testRenderer = TestRenderer.create(<App />);
const testInstance = testRenderer.root;

expect(typeof testInstance.findByType(Title).props.showModal).toBe('function');
 //expect(testInstance.findByProps({show:false}).children).toHaveLength(2);
});
// describe('App debug mode', () => {
//   it('should render correctly in "debug" mode', () => {
//     const component = shallow(<App debug />);
//     expect(component).toMatchSnapshot();
//   });
// });

// import renderer from 'react-test-renderer';
// import Link from '../Link.react';

test('Title Render matches snapshot', () => {
  const showModal=() =>{
    this.setState({ show: true });
  }
  const component = TestRenderer.create(
    <Title showModal={showModal}/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});