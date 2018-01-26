import React from 'react';
import { mount, shallow } from 'enzyme';
import Posts from '../components/Posts';
import * as api from '../api';

describe('Testing Posts component', ()=>{
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
    api.fetchAllPosts = jest.fn().mockReturnValue(posts);

    it('renders the component with the state', ()=>{
        const wrapper = shallow(component);
        expect(wrapper.find('CreateNewPost')).toBeTruthy();
        expect(wrapper.state('posts')).toEqual(posts);
    });

    it('renders the post list', ()=>{
        const wrapper = mount(component);
        wrapper.setState({ posts });
        //wrapper.setProps({date: 'date', author: 'author'})
        expect(wrapper.find('article').text()).toContain('mockTitle');
        wrapper.unmount();
    });

    /** This test would be unnecessary because 
     *  it is called automarically when the component mounted.
     * That means if you define posts it mounts automaticall */
    it.skip('sets the posts state', ()=>{
        const wrapper = shallow(component);
        //api.fetchAllPosts = jest.fn().mockReturnValue(posts);
        //wrapper.instance().setPostFromLocalStorage();
        expect(wrapper.state('posts')).toEqual(posts);
    });
    
    it('should remove a post', ()=>{
        const wrapper = shallow(component);
        api.removePost = jest.fn(id => id);
        wrapper.instance().removePost('mockId');
        expect(api.removePost).toHaveBeenCalledWith('mockId');
    });
});