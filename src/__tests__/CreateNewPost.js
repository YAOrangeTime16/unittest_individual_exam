import React from 'react';
import { shallow, render } from 'enzyme';
import CreateNewPost from '../components/CreateNewPost';

describe('Testing this component', ()=>{
    const component = <CreateNewPost author='' updatePosts={()=>{}}/>;

    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeDefined();
    });
    
    it('sets a target.value to state', ()=>{
        const wrapper = shallow(component);
        const mockEvent = {target: {name: 'content', value: 'test value'}};
        wrapper.find('#content').simulate('change', mockEvent);
        expect(wrapper.state('content')).toBe(mockEvent.target.value);
    });

    it('sets the state to empty when submitted', ()=>{
        const mockEvent = {preventDefault: jest.fn()}
        const wrapper = shallow(component);
        const state = {title: 'my title'};
        wrapper.setState(state);
        wrapper.find('form').simulate('submit', mockEvent);
        expect(wrapper.state('title')).toBe('');
    });
});