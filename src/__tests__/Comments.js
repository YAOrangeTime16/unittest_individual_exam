import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Comments from '../components/Comments';
import * as api from '../api';

describe('render comments', ()=>{
    const component = <Comments postId='123' currentPersona='fake' />;

    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper).toBeTruthy();
    });

    it('shows nothing when the comments state is empty', ()=>{
        const wrapper = shallow(component);
        wrapper.instance().renderCommentList([]);
        expect(wrapper.find('SingleComment')).toHaveLength(0);
    });

    it('renders a comment list', ()=>{
        const wrapper = mount(component);
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
        wrapper.setState({ comments });
        wrapper.instance().renderCommentList( comments );
        expect(wrapper.find('SingleComment').text()).toContain('hi');
    });

    it('should call api functions', async ()=>{
        api.fetchAllComments = jest.fn();
        api.filterComments = jest.fn(id=>id);
        const wrapper = shallow(component);
        wrapper.instance().setCommentsFromLocalStorage('mockId');
        expect(api.filterComments).toBeCalled();
    });

    it('should call api.removeComment function', ()=>{
        api.removeComment = jest.fn(id=>id);
        const wrapper = shallow(component);
        wrapper.instance().removeComment('mockId');
        expect(api.removeComment).toHaveBeenCalledWith('mockId');
    });

});

