import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

let storage = {};
const localStorageMock = {
  getItem: jest.fn(key=>storage[key]),
  setItem: jest.fn((key, value)=> storage[key] = value),
  clear: jest.fn( ()=> storage={} )
};

global.localStorage = localStorageMock;
