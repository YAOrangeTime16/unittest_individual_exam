import React from 'react';
import { mount, render, shallow } from 'enzyme';
import SingleComment from '../components/SingleComment';

describe('testing SingleComment Component', ()=>{
    const props = {
        id: 'mockId',
        author: 'mockPersona',
        currentPersona: 'mockPersona',
        comment: 'myComment',
        date: 'today',
        onClick: ()=>{}
    };
    const component = <SingleComment {...props} />;

    it('renders the component with a proper text', ()=>{
        const wrapper = render(component);
        expect(wrapper.text()).toContain(props.author);
    });

    it('does not render x button', ()=>{
        const currentPersona = 'anotherPersona';
        const wrapper = mount(component);
        wrapper.setProps({currentPersona});
        expect(wrapper.find('button').exists()).toBe(false);
    });

    it('calls onClick with an argument when clicked', ()=>{
        const onClick = jest.fn();
        const wrapper = shallow(component);
        wrapper.setProps({onClick});
        wrapper.find('Button').simulate('click');
        expect(onClick).toHaveBeenCalledWith(props.id);
    });
});