describe('App.js', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000/');
    });

    it('posts new content', ()=>{
        cy.get('#title').type('E2E Testing Title');
        cy.get('#content').type('My first content');
        cy.get('input[value="Create"').click();
        cy.get('article').first().contains('E2E Testing Title');
    });
})