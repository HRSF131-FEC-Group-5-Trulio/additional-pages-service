import React from 'react';
import Enzyme from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './app.js';
import '@testing-library/jest-dom';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

