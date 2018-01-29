import React from 'react';
import { render } from 'enzyme';
import TypingIndicator from '../components/Bot/TypingIndicator';

describe('testing the TypingIndicator component', ()=>{ 
    it('renders the component when typing is true', ()=>{
        const wrapper = render(<TypingIndicator typing= {true} />);
        expect(wrapper.hasClass('TypingIndicator')).toBeTruthy()
    });

    it('should not render the component when typing is false', ()=>{
        const wrapper = render(<TypingIndicator typing={false} />);
        expect(wrapper.hasClass('TypingIndicator')).toBeFalsy()
    });
});