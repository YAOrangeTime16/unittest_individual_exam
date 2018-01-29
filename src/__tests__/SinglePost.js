import React from 'react';
import { mount, render, shallow } from 'enzyme';
import SinglePost from '../components/SinglePost';

describe('testing SinglePost Component', ()=>{
    const props = {
        title: 'mockTitle',
        content: 'mockContent',
        id: 'mockId',
        author: 'mockPersona',
        currentPersona: 'mockPersona',
        date: 'today',
        onClick: jest.fn()
    };
    const component = <SinglePost {...props} />
    
    it('renders the component with a proper author', ()=>{
        const wrapper = render(component);
        expect(wrapper.text()).toContain(props.author);
    });
    
    it('does not render x button if(author != currentPersona)', ()=>{
        const currentPersona = 'another Persona';
        const wrapper = mount(component);
        wrapper.setProps({currentPersona});
        expect(wrapper.find('button').exists()).toBeFalsy();
    });

    it('calls onClick with an argument when clicked', ()=>{
        const { onClick } = props;
        const wrapper = shallow(component);
        wrapper.find('Button').simulate('click');
        expect(onClick).toHaveBeenCalledWith(props.id);
    });
});