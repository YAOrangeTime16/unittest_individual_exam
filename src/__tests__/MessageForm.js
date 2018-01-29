import React from 'react';
import { mount, render, shallow } from 'enzyme';
import MessageForm from '../components/Bot/MessageForm';

describe('testing the MessageForm component', ()=>{
    const component = <MessageForm onSubmit={jest.fn()} />;
    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('input[type="text"]')).toBeDefined();
    });

    it('changes the state of this component', ()=>{
        const wrapper = mount(component);
        const event = {target: {name: 'userMessage', value: 'message!'}};
        wrapper.instance().onChange(event);
        expect(wrapper.state().userMessage).toBe(event.target.value);
    });

    it('calls props.onSubmit() and sets the state to empty when submitted', ()=>{
        const wrapper = mount(component);
        const event = { preventDefault: jest.fn() };
        wrapper.setState({userMessage: 'delete me!'});
        wrapper.find('input[type="submit"]').simulate('submit', event);
        expect(wrapper.props().onSubmit).toHaveBeenCalledTimes(1);
        expect(wrapper.state().userMessage).toBe('');
    });
});