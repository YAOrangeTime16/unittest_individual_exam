import React from 'react';
import { shallow, remder, mount } from 'enzyme';
import * as api from '../api';
import { storePostObject } from '../api';

test('it should gererate an id', ()=>{
    expect(api.generateID()).toHaveLength(10);
});

describe('testing Post api', ()=>{
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
        const mockData = [{title: 'TITLE'}, {title: 'Another TITLE'}];
        localStorage.setItem('posts', JSON.stringify(mockData));
        expect(api.fetchAllPosts()).toHaveLength(2);
    });

    it('should store a post object to the local storage', ()=>{
        const mockObject = {title: 'mock title'};
        api.storePostObject(mockObject);
        expect(localStorage.getItem('posts')).toMatch('mock title');
    });

    it('should remove a post object from the local storage', ()=>{
        const postId = '1';
        const mockData = [{id: '1'}, {id: '2'}];
        const checkingValue = [{id: '1'}];
        const getItem = (key)=>JSON.parse(localStorage.getItem(key));
        localStorage.setItem('posts', JSON.stringify(mockData));
        expect(getItem('posts')).toEqual( expect.arrayContaining(checkingValue) );
        api.removePost(postId);
        expect(getItem('posts')).not.toEqual( expect.arrayContaining(checkingValue) );
    });
});

describe('Testing comment api', ()=>{
    it('should create a comment object');
    it('should store a comment object');
    it('should return filtered comments');
    it('should remove a comment and update comment list');
});

describe('Testing persona api', ()=>{
    it('should return currentPersona');
    it('should return all personas');
    it('should store the current persona to local storage');
});

describe('Testing Bot response api', ()=>{
    it('should generate Random interger');
    it('should return one response');
});