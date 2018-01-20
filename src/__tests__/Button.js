import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Button from '../components/Button';

test('the button should show a proper class name', ()=>{
    const wrapper = shallow((
        <Button onClick={()=>{}} danger={true}>
         <div>testing</div>
        </Button>
    ));
    expect(wrapper.find('.bg-red-dark').exists()).toBeTruthy();
});