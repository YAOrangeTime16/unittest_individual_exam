import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from '../components/App';
import Bot from '../components/Bot/Bot';
import Posts from '../components/Posts';

describe('testing the App component', ()=>{
  const component = <App />;

  it('renders the app', ()=>{
    const wrapper = render(component);
    expect(wrapper).toBeDefined();
  });

    /*
    afterEach(()=>{
      const wrapper = mount(<App />);
      wrapper.unmount();
    });
    */
  
    it('should change state of currentPage', ()=>{
      const wrapper = shallow(component);
      expect(wrapper.state().currentPage).toBe('home');
      wrapper.find('Button').simulate('click');
      expect(wrapper.state('currentPage')).toBe('bot');
      wrapper.find('Button').simulate('click');
      expect(wrapper.state('currentPage')).toBe('home');
    });
  
    it('should show a proper title', ()=>{
      const wrapper = mount(component);
      expect(wrapper.find('Button').text()).toBe('Talk to a real human');
      wrapper.find('Button').simulate('click');
      expect(wrapper.find('Button').text()).toBe('Return to forum');
    });
  
    it('should render toggle component: Posts/Bot', ()=>{
      const wrapper = shallow(component);
      expect(wrapper.containsAllMatchingElements([<Posts currentPersona='' />])).toBeTruthy();
      wrapper.setState({ currentPage: 'bot' });
      expect(wrapper.containsAllMatchingElements([<Bot />])).toBeTruthy();
    });

    it('should change persona', ()=>{
      const wrapper = shallow(component);
      const mockEvent = {target: {value: 'alice'}};
      wrapper.instance().changePersona(mockEvent);
      expect(wrapper.state('currentPersona')).toBe('alice');
    });
});