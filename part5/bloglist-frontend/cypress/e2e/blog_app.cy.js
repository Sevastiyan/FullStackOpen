/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Admin',
      username: 'admin',
      password: 'admin',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Username:')
    cy.contains('Password:')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login')
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('Logged in as Admin')
    })

    it('fails with wrong credentials', function () {
      cy.get('#login-button').click()
      cy.contains('Wrong Username or Password')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({
          username: 'admin',
          password: 'admin',
        })
      })

      it('A blog can be created', function () {
        cy.contains('Blogs')
        cy.get('#new-blog-form-button').click()
        cy.get('#title').type('A note from testing service')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('Test URL')
        cy.get('#create-blog-button').click()
        cy.contains('A note from testing service')
      })

      describe('when a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'A blog from testing service',
            author: 'My Name',
            url: 'someurl',
          })
        })
        it('A user can like a blog', function () {
          cy.contains('view').click()
          cy.contains('like').click()
          cy.contains('1')
        })

        it('A user can delete a blog', function () {
          cy.contains('view').click()
          cy.contains('remove').click()
          cy.get('html').should('not.contain', 'A blog from testing service')
        })
      })
      describe('when a blog exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'A blog from testing service',
            author: 'My Name',
            url: 'someurl',
          })
          cy.contains('view').click()
          cy.contains('like').click()

          cy.createBlog({
            title: 'A second blog from testing service',
            author: 'My Name',
            url: 'someurl',
          })
        })

        it.only('Multiple blogs are ordered', function () {
          cy.get('.blog')
            .eq(0)
            .should('contain', 'A blog from testing service')
          cy.get('.blog')
            .eq(1)
            .should('contain', 'A second blog from testing service')
        })
      })
    })
  })
})
