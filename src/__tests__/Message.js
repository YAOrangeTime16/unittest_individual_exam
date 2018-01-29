import React from 'react';
import { render, shallow } from 'enzyme';
import Message from '../components/Bot/Message';

describe('testing the Message component', ()=>{
    const properties = {
        bot: false,
        message: 'hello'
    };
    const component = <Message {...properties} />;

    it('renders the component with bot:false', ()=>{
        const wrapper = shallow(component);
        expect(wrapper.hasClass('text-white')).toBe(true);
    });

    it('renders the component with bot:true', ()=>{
        const wrapper = shallow(component);
        wrapper.setProps({bot: true});
        expect(wrapper.hasClass('text-grey-darker')).toBe(true);
    });

    it('renders a message', ()=>{
        const wrapper = shallow(component);
        expect(wrapper.text()).toBe('hello')
    });
});