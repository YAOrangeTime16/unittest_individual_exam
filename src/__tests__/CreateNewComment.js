import React from 'react';
import { shallow, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import CreateNewComment from '../components/CreateNewComment';

describe('form', ()=>{
    const props = {
        postId: '',
        author: '',
        updateComments: jest.fn()
    };
    const component = <CreateNewComment {...props} />;

    it('should renders the form', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('form')).toBeTruthy();
    });

    it('should set a target.value to state', ()=>{
        const event = {target: {name: 'comment', value: 'test value'}}
        const wrapper = shallow(component);
        wrapper.find('textarea').simulate('change', event);
        expect(wrapper.state('comment')).toBe(event.target.value);
    });

    it('should set the state to empty when submitted', ()=>{
        const event = { preventDefault: jest.fn() };
        const wrapper = shallow(component);
        wrapper.setState({comment: 'hi'});
        expect(wrapper.state('comment')).toBe('hi');
        wrapper.find('form').simulate('submit', event);
        expect(wrapper.state('comment')).toHaveLength(0);
    });

    /** extra test */
    it('should match its snapshot', ()=>{
        const wrapper = render(component);
        expect(toJSON(wrapper)).toMatchSnapshot();
    });
});