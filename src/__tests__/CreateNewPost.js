import React from 'react';
import { shallow, render } from 'enzyme';
import CreateNewPost from '../components/CreateNewPost';

describe('Testing this component', ()=>{
    const component = <CreateNewPost author='tonny' updatePosts={()=>{}}/>;
    it('should render the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeDefined();
    });
    
    it('should set the state of title when text typed', ()=>{
        const wrapper = shallow(component);
        const mockEvent = {target: {name: 'title', value: 'hi'}};
        wrapper.find('#title').simulate('change', mockEvent);
        expect(wrapper.state().title).toBe(mockEvent.target.value);
    });
    
    it('should set the state of content when text typed', ()=>{
        const wrapper = shallow(component);
        const mockEvent = {target: {name: 'content', value: 'testing textarea'}};
        wrapper.find('#content').simulate('change', mockEvent);
        expect(wrapper.state().content).toBe(mockEvent.target.value);
    });

    it('set the states to empty', ()=>{
        const mockEvent = {preventDefault: jest.fn()}
        const wrapper = shallow(component);
        const state = {title: 'my title', content: 'my content'};
        wrapper.setState(state);
        expect(wrapper.state()).toEqual(state);
        wrapper.find('form').simulate('submit', mockEvent);
        expect(wrapper.state().title).toBe('');
    });
});