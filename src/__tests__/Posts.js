import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Posts from '../components/Posts';
import * as api from '../api';

describe('Testing the Posts component', ()=>{
    const component = <Posts currentPersona='' />;
    const posts = [
        {
            title: 'mockTitle',
            content: 'mockContent',
            id: 'mockId',
            date: 'date',
            author: 'author'
        }
    ];

    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('div.pt-8')).toBeTruthy();
    });

    it('renders the post list', ()=>{
        const wrapper = mount(component);
        wrapper.setState({posts});
        expect(wrapper.find('SinglePost').text()).toContain(posts[0].title);
    });

    it('sets the posts state when mounted', ()=>{
        api.fetchAllPosts = jest.fn().mockReturnValue(posts);
        const wrapper = shallow(component);
        expect(wrapper.state('posts')).toEqual(posts);
    });
    
    it('should call api.remove() with a passed argument', ()=>{
        api.removePost = jest.fn(id => id);
        const wrapper = shallow(component);
        wrapper.instance().removePost(posts[0].id);
        expect(api.removePost).toHaveBeenCalledWith(posts[0].id);
    });
});