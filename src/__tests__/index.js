import React from 'react';
import { shallow, remder, mount } from 'enzyme';
import * as api from '../api';

describe('testing functions in api/index.js', ()=>{
    it('should gererate an id', ()=>{
        expect(api.generateID()).toHaveLength(10);
    });

    describe('Post', ()=>{
        const title = 'test title';
        const content = 'test content';
        const author = 'test author';
        beforeEach(()=>{
            localStorage.setItem('posts', 
                JSON.stringify(
                    [{title: 'TITLE', id: '1'}, {title: 'Another TITLE', id: '2'}]
                ))
        });
        afterEach(()=>{
            localStorage.clear();
        });

        it('should create a post object and store it to the storage', ()=>{
            const object = api.createPostObject(title, content, author);
            expect(object).toMatchObject({ title, content, author });
            api.storePostObject(object);
            const storedData = JSON.parse(localStorage.getItem('posts'));
            expect(storedData).toEqual(object);
        });
        
        it('should fetch posts in the local storage', ()=>{
            expect(api.fetchAllPosts()).toHaveLength(2);
        });
    
        it.skip('should store a post object to the local storage', ()=>{
            const object = api.createPostObject(title, content, author);
        });
        it('should remove a post object from the local storage', ()=>{
            api.removePost('1');
            const storedData = JSON.parse(localStorage.getItem('posts'));
            expect(storedData).toHaveLength(1);
        });
    });

    describe('Comments', ()=>{
        const comment = 'test comment';
        const postId = 'pid';
        const author = 'author';
        it('should create a comment object and store it', ()=>{
            const commentObject = {...api.createCommentObject(comment, postId, author), id: 'ididid'};
            expect(commentObject).toEqual(
                expect.objectContaining({ comment, postId, author })
            );

            api.storeCommentObject(commentObject);
            const storedData = JSON.parse(localStorage.getItem('comments'));
            expect(storedData).toEqual(
                expect.objectContaining({ comment, postId, author })
            );
        });
        //it('should store a comment object');
        
        it('should remove a comment and update comment list', ()=>{
            api.removeComment('ididid');
            expect(localStorage.getItem('comments')).toBe('[]');
        });

        it('should return filtered comments', ()=>{
            //localStorage.clear();
            const comments = [{postId: 'mockId'}];
            localStorage.setItem('comments', comments);
            const filteredComment = api.filterComments(comments, 'mockId');
            expect(filteredComment).toEqual(comments);
        });
    });

    describe('Persona', ()=>{
        it('should return currentPersona');
        it('should return all personas');
        it('should store the current persona to local storage');
    });

    describe('Bot response', ()=>{
        it('generates Random interger, and return one response based on the number');
        //it('should return one response');
    });
});