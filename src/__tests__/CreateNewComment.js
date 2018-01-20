import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CreateNewComment from '../components/CreateNewComment';

describe('form', ()=>{
    const component = <CreateNewComment 
    postId=''
    author=''
    updateComments={jest.fn()} />;

    it('should renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeTruthy();
    });

    it('should change the state', ()=>{
        const wrapper = shallow(component);
        const event = {target: {name: 'comment', value: 'test value'}}
        wrapper.find('textarea').simulate('change', event);
        expect(wrapper.state('comment')).toBe('test value');
    });

    it('should re-set the state to empty', ()=>{
        const wrapper = shallow(component);
        wrapper.setState({comment: 'hi'});
        const mockEvent = { preventDefault: jest.fn() };
        wrapper.find('form').simulate('submit', mockEvent);
        expect(wrapper.state('comment')).toHaveLength(0);
    });
    
});