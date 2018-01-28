import React from 'react';
import { shallow, render, mount } from 'enzyme';
import PersonaSwitcher from '../components/PersonaSwitcher';

describe('testing PersonaSwitcher', ()=>{
    const component = <PersonaSwitcher currentPersona='' changePersona={jest.fn()} />;
    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('div.fixed pin-t pin-r')).toBeTruthy();
    });

    it('calls onChange and send a value to it', ()=>{
        const wrapper = shallow(component);
        const target = {target: {value: 'target value'}};
        wrapper.find('select').simulate('change', target);
        expect(wrapper.find('select').props().onChange).toHaveBeenCalledWith(target);
  
    });
});