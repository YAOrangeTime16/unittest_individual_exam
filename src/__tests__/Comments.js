import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Comments from '../components/Comments';
import * as api from '../api';

describe('testing the Comments component', ()=>{
    const component = <Comments postId='123' currentPersona='fake' />;
    const comments =  [
        {
            comment: 'hi', 
            id: '1', 
            postId:'1', 
            author: '', 
            date: '',
            currentPersona: ''
        }
    ];
    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeTruthy();
    });

    it('shows nothing when the state of comments is empty', ()=>{
        const wrapper = shallow(component);
        wrapper.instance().renderCommentList([]);
        expect(wrapper.find('SingleComment')).toHaveLength(0);
    });

    it('renders a comment list', ()=>{
        const wrapper = mount(component);
        wrapper.setState({ comments });
        expect(wrapper.find('SingleComment').text()).toContain('hi');
    });

    it('should set the state of comments when mounted', ()=>{
        api.filterComments = jest.fn(()=>comments);
        const wrapper = mount(component);
        expect(wrapper.state().comments).toEqual(comments);
    });

    it('should call api.removeComment function', ()=>{
        api.removeComment = jest.fn(id=>id);
        const wrapper = shallow(component);
        wrapper.instance().removeComment('mockId');
        expect(api.removeComment).toHaveBeenCalledWith('mockId');
    });
});

