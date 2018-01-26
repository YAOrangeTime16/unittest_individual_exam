import React from 'react';
import { shallow, render } from 'enzyme';
import CreateNewPost from '../components/CreateNewPost';

describe('Testing this component', ()=>{
    const component = <CreateNewPost author='tonny' updatePosts={()=>{}}/>;
    it('should render the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeDefined();
    });
    
    it('should change the input value when text typed', ()=>{
        const wrapper = shallow(component);
        const mockEvent = {target: {name: 'title', value: 'hi'}};
        wrapper.find('#title').simulate('change', mockEvent);
        expect(wrapper.state().title).toBe('hi');
    });
    
    it('should change the textarea value when text typed', ()=>{
        const wrapper = shallow(component);
        const mockEvent = {target: {name: 'content', value: 'testing textarea'}};
        wrapper.find('#content').simulate('change', mockEvent);
        expect(wrapper.state().content).toBe('testing textarea');
    });

    it('should call updatePosts() when the form is submitted, and set the states to empty', ()=>{
        const mockEvent = {preventDefault: jest.fn()}
        const wrapper = shallow(component);
        const updatePosts = jest.fn();
        const state = {title: 'my title', content: 'my content'};

        wrapper.setProps({updatePosts});
        wrapper.setState(state);
        expect(wrapper.state()).toEqual(state);
        
        wrapper.find('form').simulate('submit', mockEvent);
        expect(updatePosts).toHaveBeenCalled();
        expect(wrapper.state().title).toBe('');
    });
});