import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.js';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });
/*
test ideas:
render App element
test componentDidMount
test the state property
test that some components exist within App?

*/

function sum(a, b) {
  return a + b;
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('shallow renders component', () => {
  const wrapper = mount(<div><App /></div>);
  console.log('111111111 App wrapper: ', wrapper.find('FlexContainer').length);
  expect(wrapper.find(App)).toHaveLength(1);
})
test('renders children when passed in', () => {
  const style = { fontSize: 13 };
  const wrapper = shallow((
    <div>
      <span className="foo">Hello</span>
      <div style={style}>Goodbye</div>
      <span>Again</span>
    </div>
  ));

  expect(wrapper.containsAnyMatchingElements([
    <span>Bonjour</span>,
    <div>Goodbye</div>,
  ])).toBe(true);
});
test('contains a content slider', () => {
  const wrapper = mount(<div><App /></div>);
  expect(wrapper.contains(App)).toBe(true);
})
test('contains a content slider', () => {
  class Fixture extends React.Component {
    render() {
    return (
      <div>
        <input id="checked" defaultChecked />
        <input id="not" defaultChecked={false} />
        <input id="tertiary" defaultChecked checked={false} />
      </div>
    );
    }
  }

  const wrapper = mount(<Fixture />); // mount/render/shallow when applicable
  const checked = wrapper.find('#checked');
  console.log('-------------------wrapper: ', checked.length);
  expect(checked).toBeChecked();
  expect(wrapper.find('#not')).not.toBeChecked();
})

