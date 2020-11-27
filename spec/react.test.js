import React from 'react'
import {mount, shallow} from 'enzyme'


import Adapter from 'enzyme-adapter-react-16';
import App from '../client/app.js';
import Modal from '../client/Components/Modal/Modal';
import Slider from '../client/Components/Slider/Slider';


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




function Fixture() {
  return (
    <div>
      <input id="checked" defaultChecked />
      <input id="not" defaultChecked={false} />
      <input id="tertiary" defaultChecked checked={false} />
    </div>
  );
}

describe('modal', () => {
  it('assert checked', () => {
    const wrapper = mount(<Fixture />);
    expect(wrapper.find('#checked')).toBeChecked();
    expect(wrapper.find('#not')).not.toBeChecked();;
  });

});
// test('CheckboxWithLabel changes the text after click', () => {
//   // Render a checkbox with label in the document
//   const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

//   expect(checkbox.text()).toEqual('Off');

//   checkbox.find('input').simulate('change');

//   expect(checkbox.text()).toEqual('On');
// });
// test('renders children when passed in', () => {
//   const style = { fontSize: 13 };
//   const wrapper = shallow((
//     <div>
//       <span className="foo">Hello</span>
//       <div style={style}>Goodbye</div>
//       <span>Again</span>
//     </div>
//   ));

//   expect(wrapper.containsAnyMatchingElements([
//     <span>Bonjour</span>,
//     <div>Goodbye</div>,
//   ])).toBe(true);
// });
// test('contains a content slider', () => {
//   const wrapper = mount(<div><App /></div>);
//   expect(wrapper.contains(App)).toBe(true);
// })
// test('contains a content slider', () => {
//   class Fixture extends React.Component {
//     render() {
//     return (
//       <div>
//         <input id="checked" defaultChecked />
//         <input id="not" defaultChecked={false} />
//         <input id="tertiary" defaultChecked checked={false} />
//       </div>
//     );
//     }
//   }

//   const wrapper = mount(<Fixture />); // mount/render/shallow when applicable
//   const checked = wrapper.find('#checked');
//   console.log('-------------------wrapper: ', checked.length);
//   expect(checked).toBeChecked();
//   expect(wrapper.find('#not')).not.toBeChecked();
// })