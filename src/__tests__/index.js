import React from 'react';
import { shallow, remder, mount } from 'enzyme';
import * as api from '../api';

test('it should gererate an id', ()=>{
    expect(api.generateID()).toHaveLength(10);
});

describe('post', ()=>{
    beforeEach(()=>{
        localStorage.setItem('posts', JSON.stringify([{title: 'TITLE'}, {title: 'Another TITLE'}]))
    });
    afterEach(()=>{
        localStorage.clear();
    });
    it('should create a post object', async ()=>{
        const title = 'test title';
        const content = 'test content';
        const author = 'test author';
        const object = api.createPostObject(title, content, author);
        expect(object).toMatchObject({ title, content, author });
    });
    
    it('should fetch posts in the local storage', ()=>{
        expect(api.fetchAllPosts()).toHaveLength(2);
    });

    it('should store a post object to the local storage', ()=>{
    });
    it('should remove a post object from the local storage');
});


test('it should create a comment object');
test('it should store a comment object');
test('it should return filtered comments');
test('it should remove a comment and update comment list');
test('it should return currentPersona');
test('it should return all personas');
test('it should store the current persona to local storage');
test('it should generate Random interger');
test('it should return one response');