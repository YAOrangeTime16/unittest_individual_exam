import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Comments from '../components/Comments';

describe('render existing comments', ()=>{
    it('should render a comment list', ()=>{
        const wrapper = mount(<Comments />);
        const mockComment = ["hello"];
        wrapper.setState({comments: mockComment});
        expect(wrapper.text()).toContain("hello");
    });

});

