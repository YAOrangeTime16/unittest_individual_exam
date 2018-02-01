import React from 'react';
import { render, shallow } from 'enzyme';
import AvatarSelector from '../components/AvatarSelector';

describe('avatars', ()=>{
    const component = <AvatarSelector currentPersona='Zac' />;
    
    it('renders the component', ()=>{
        const wrapper = render(component);
        expect(wrapper.find('img')).toBeTruthy();
    });

    it('returns an image based on currentPersona', ()=>{
        const wrapper = shallow(component);
        expect(wrapper.containsMatchingElement(<img src='zac.png' />)).toEqual(true);
        wrapper.setProps({ currentPersona: 'Esmeralda'});
        expect(wrapper.containsMatchingElement(<img src='esmeralda.png' />)).toEqual(true);
        wrapper.setProps({ currentPersona: 'Morgana'});
        expect(wrapper.containsMatchingElement(<img src='morgana.png' />)).toEqual(true);
        wrapper.setProps({ currentPersona: 'Zac'});
        expect(wrapper.containsMatchingElement(<img src='zac.png' />)).toEqual(true);
    });
});