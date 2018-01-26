import React from 'react';
import { mount, render, shallow } from 'enzyme';
import SingleComment from '../components/SingleComment';

describe('testing SingleComment Component', ()=>{
    const props = {
        id: 'mockId',
        author: 'mockAuthor',
        currentPersona: 'mockPersona',
        comment: 'myComment',
        date: 'today'
    };
    const component = <SingleComment onClick={()=>{}} {...props} />;

    it('renders the component with a proper text', ()=>{
        const wrapper = render(component);
        expect(wrapper.text()).toContain(props.author);
    });

    it('renders Button depending on danger boolean', ()=>{

    });
});