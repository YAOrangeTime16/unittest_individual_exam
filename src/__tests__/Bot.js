import React from 'react';
import { mount, render, shallow } from 'enzyme';
import Bot from '../components/Bot/Bot';
import * as api from '../api';

describe('testing the Bot component', ()=>{
    const component = <Bot />;

    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('.mx-auto')).toBeTruthy();
    });

    it('renders messages', ()=>{
        const wrapper = shallow(component);
        const bot = false;
        const messages = [{message: 'hi', bot}, {message:'hello', bot}, {message:'see you!', bot}];
        wrapper.setState({ messages });
        expect(wrapper.find('Message').first().props().message).toContain(messages[0].message);
    });

    it('sets the state of message when submitted', ()=>{
        const wrapper = shallow(component);
        const myMessage = 'my message';
        wrapper.instance().onSubmit(myMessage);
        expect(wrapper.state().messages[0].message).toBe(myMessage);
    });

    it('sets the state of typing and makes sure api.botReply called', ()=>{
        const wrapper = shallow(component);
        expect.assertions(2);
        api.botReply = jest.fn(()=> new Promise(resolve=>{message: 'bot reply'}));
        wrapper.instance().sendReply();
        expect(wrapper.state('typing')).toBeTruthy();
        expect(api.botReply).toHaveBeenCalled();
    });

    it.skip('sets the state of messages', async ()=>{
        //jest.useFakeTimers();
        const wrapper = shallow(component);
        expect.assertions(1);
        api.botReply = jest.fn(()=> new Promise(resolve=>{message:'bot reply'}));
        expect(api.botReply()).resolves.toBeTruthy();
        //jest.runAllTimers();
    });
});