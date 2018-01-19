import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';
import Button from '../components/Button';
import Bot from '../components/Bot/Bot';
import Posts from '../components/Posts';

test('renders the app', () => {
  render(<App />);
});

describe('Button', ()=>{
  afterEach(()=>{
    const wrapper = mount(<App />);
    wrapper.unmount();
  });

  it('should change state of currentPage', ()=>{
    const wrapper = shallow(<App />);
    expect(wrapper.state().currentPage).toBe('home');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('currentPage')).toBe('bot');
    wrapper.find(Button).simulate('click');
    expect(wrapper.state('currentPage')).toBe('home');
  });

  it('should show a proper title', ()=>{
    const wrapper = mount(<App currentPage='home' />);
    expect(wrapper.text()).toContain('Talk to a real human');
    wrapper.find(Button).simulate('click');
    expect(wrapper.text()).toContain('Return to forum');
  });

  it('should render toggle component: Posts/Bot', ()=>{
    const wrapper = shallow(<App currentPage='home'/>);
    expect(wrapper.containsAllMatchingElements([<Posts currentPersona='' />])).toBeTruthy();
    wrapper.setState({ currentPage: 'bot' });
    expect(wrapper.containsAllMatchingElements([<Bot />])).toBeTruthy();
  })
});

describe('Persona', ()=>{
  it('should change persona', ()=>{
    const wrapper = shallow(<App />);
    const mockEvent = {target: {value: 'alice'}};
    wrapper.instance().changePersona(mockEvent);
    expect(wrapper.state('currentPersona')).toBe('alice');
  });
});