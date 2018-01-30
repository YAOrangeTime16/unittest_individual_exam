import * as api from '../api';
import { storePostObject } from '../api';

describe('testing functions in api/index.js', ()=>{
    describe('ID GENERATOR', ()=>{
        it('should gererate an id', ()=>{
            expect(api.generateID()).toHaveLength(10);
        });
    });

    describe('POST', ()=>{
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
        describe('createPostObject & storePostObject', ()=>{
            it('should create a post object and store it to the storage', ()=>{
                const object = api.createPostObject(title, content, author);
                expect(object).toMatchObject({ title, content, author });
                api.storePostObject(object);
                const storedData = JSON.parse(localStorage.getItem('posts'));
                expect(storedData).toEqual(object);
            });
    
            it('should set default for title and content if they are undefined', ()=>{
                const object = api.createPostObject(undefined, undefined, author);
                expect(object).toEqual(expect.objectContaining({title: '', content: ''}))
            });
        });
        
        describe('fetchAllPosts', ()=>{
            it('should fetch posts in the local storage', ()=>{
                expect(api.fetchAllPosts()).toHaveLength(2);
            });
        });
    
        describe('removePost', ()=>{
            it('should remove a post object from the local storage', ()=>{
                api.removePost('1');
                const storedData = JSON.parse(localStorage.getItem('posts'));
                expect(storedData).toHaveLength(1);
            });
        });
    });

    describe('COMMENTS', ()=>{
        const comment = 'test comment';
        const postId = 'pid';
        const author = 'author';

        describe('createCommentObject & storeCommentObject', ()=>{
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
    
            it('should set default for comment if it is undefined', ()=>{
                const objectWithDefault = api.createCommentObject(undefined, postId, author);
                expect(objectWithDefault).toEqual(
                    expect.objectContaining({ comment: ''})
                );
            });
        });

        describe('fetchAllComments', ()=>{
            it('should fetch all comments from storage, if storage is empty it returns empty array', ()=>{
                localStorage.clear();
                expect(api.fetchAllCommments()).toHaveLength(0);
                const commentObject = {comment: 'test comment'};
                const comments = JSON.stringify(commentObject);
                localStorage.setItem('comments', comments);
                expect(api.fetchAllCommments()).toEqual(commentObject);
            });
        });
        
        describe('removeComment', ()=>{
            const comments = JSON.stringify([{id:'ID-1'}, {id: 'ID-2'}]);
            beforeEach(()=>{
                localStorage.setItem('comments', comments);
                localStorage.setItem('posts', comments);
            });
            
            
            it('should keep a comment if post and comment have different IDs', ()=>{
                api.removeComment('ID-3');
                const storage = localStorage.getItem('comments');
                expect(storage).toEqual(comments);
            });

            it('should remove a comment and update comment storage', ()=>{
                api.removeComment('ID-2');
                const updatedStorage = localStorage.getItem('comments');
                expect(updatedStorage).not.toContain('ID-2');
            });
        });

        describe('filterComments', ()=>{
            it('should return filtered comments', ()=>{
                const comments = [{postId: 'mockId'}];
                localStorage.setItem('comments', comments);
                const filteredComment = api.filterComments(comments, 'mockId');
                expect(filteredComment).toEqual(comments);
            });
        });
    });

    describe('PERSONA', ()=>{
        const personaOne = 'persona 1';
        describe('storeCurrentPersona', ()=>{
            it('should store the current persona to local storage', ()=>{
                api.storeCurrentPersona(personaOne);
                const newCurrentPersona = JSON.parse(localStorage.getItem('currentPersona'));
                expect(newCurrentPersona).toBe(personaOne);
            });
        });

        describe('fetchCurrentPersona', ()=>{
            it('should return currentPersona', ()=>{
                expect(api.fetchCurrentPersona()).toBe(personaOne);
            });
        });

        describe('fetchPersonas', ()=>{
            it('should return personas objects or empty array', ()=>{
                const personasArray = [{persona: 'persona 2'}, {persona: 'persona 3'}];
                const stringifiedPersona = JSON.stringify(personasArray);
                expect(api.fetchPersonas()).toEqual([]);
                localStorage.setItem('personas', stringifiedPersona);
                expect(api.fetchPersonas()).toEqual(personasArray);
            });
        });
    });

    describe('BOT RESPONSE', ()=>{
        jest.useFakeTimers();
        it('returns one message object', async ()=>{
            expect.assertions(2);
            expect(api.botReply()).resolves.toEqual(
                expect.objectContaining({
                    message: expect.any(String)
                })
            );
            jest.runAllTimers();
            expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expect.any(Number));
        });
/*
        it.skip('returns nothing if Promise fails', ()=>{
            expect.assertions(1);
            api.botReply = ()=> new Promise(
                ()=>{throw new Error ('promise failed!')}
            );
            expect(api.botReply()).rejects.toEqual(expect.any(Error));
        });
*/
    });
});