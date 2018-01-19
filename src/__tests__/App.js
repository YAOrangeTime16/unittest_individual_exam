import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';

test('renders the app', () => {
  render(<App />);
});

describe('Button', ()=>{
  const wrapper = mount(<App />);
  afterEach(()=>{
    wrapper.unmount();
  })
  it('should change state of currentPage', ()=>{
    expect(wrapper.state().currentPage).toBe('home');
    wrapper.find('button').simulate('click');
    expect(wrapper.state().currentPage).toBe('bot');

  });
})