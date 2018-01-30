import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';

jest.mock('../index');
describe('mount the app to root', ()=>{
    it('should render at the mount point', ()=>{
        document.body.innerHTML = `<div id="mock"></div>`
        const mountPoint = document.getElementById('mock');
        ReactDOM.render(<App />, mountPoint);
    });
});
