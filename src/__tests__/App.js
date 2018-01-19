import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';

test('renders the app', () => {
  render(<App />);
});

describe('Button', ()=>{
  afterEach(()=>{
    const wrapper = mount(<App />);
    wrapper.unmount();
  });

  it('should change state of currentPage', ()=>{
    const wrapper = mount(<App />);
    expect(wrapper.state().currentPage).toBe('home');
    wrapper.find('button').simulate('click');
    expect(wrapper.state().currentPage).toBe('bot');
    wrapper.find('button').simulate('click');
    expect(wrapper.state().currentPage).toBe('home');
  });

  it('should show a proper title', ()=>{
    const wrapper = mount(<App currentPage='home' />);
    expect(wrapper.text()).toContain('Talk to a real human');
    wrapper.find('button').simulate('click');
    expect(wrapper.text()).toContain('Return to forum');
  });
});

describe('persona', ()=>{
  it('should change persona', ()=>{
    const wrapper = shallow(<App />);
    const mockEvent = {target: {value: 'alice'}};
    wrapper.instance().changePersona(mockEvent);
    expect(wrapper.state().currentPersona).toBe('alice');
  });
});