import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Button from '../components/Button';

describe('testing Button', ()=>{
    let bool = false;
    const component = <Button children={'button title'} onClick={()=>{}} danger={bool ? true : false} />;
    it('should render depends on the danger property', ()=>{
        const wrapper = shallow(component);
        expect(toJSON(wrapper)).toMatchSnapshot('danger = false');
        wrapper.setProps({danger: true});
        expect(toJSON(wrapper)).toMatchSnapshot('danger = true');
    });

    /** @deprecated: testing as snapshot, instead. */
    it.skip('should render with a proper class name', ()=>{
        const wrapper = shallow(component);
        expect(wrapper.find('button').hasClass('bg-indigo-dark')).toBeTruthy();
        wrapper.setProps({danger: true});
        expect(wrapper.find('button').hasClass('bg-red-dark')).toBeTruthy();
    });
});

