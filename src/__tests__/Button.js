import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Button from '../components/Button';

test('the button should show a proper class name', ()=>{
    const wrapper = shallow((
        <Button onClick={()=>{}} danger={false}>
         <div>testing</div>
        </Button>
    ));
    expect(wrapper.find('button').hasClass('bg-indigo-dark')).toBeTruthy();
    wrapper.setProps({danger: true});
    expect(wrapper.find('button').hasClass('bg-red-dark')).toBeTruthy();
});