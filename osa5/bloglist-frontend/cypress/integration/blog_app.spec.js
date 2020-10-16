describe('Blog app test', function () {
  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })
  Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { author, title, url, likes },
      headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
      }
    })
    cy.visit('http://localhost:3000')
  })

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Crash Test Dummy',
      username: 'ctd',
      password: 'Salasana_'
    }
    const user2 = {
      name: 'Real Crash Test',
      username: 'rct',
      password: 'Salasana_'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened, and login form is shown', function () {
    cy.contains('Login to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ctd')
      cy.get('#password').type('Salasana_')
      cy.get('#login-button').click()

      cy.get('.success')
        .should('contain', 'logged in as Crash Test Dummy')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('ctd')
      cy.get('#password').type('Yleissana')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'ctd', password: 'Salasana_'
      })
    })
    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('We created this with cypress')
      cy.get('#author').type('Tester Test')
      cy.get('#url').type('www.thislink.doesnt.work')
      cy.get('#blog-create').click()

      cy.get('.success')
        .should('contain', 'created new blog titled: "We created this with cypress"')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('Title: We created this with cypress, Author: Tester Test')
    })
    it('A blog can be liked', function () {
      cy.createBlog({
        title: 'We created this with cypress',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
        likes: 0,
      })
      cy.get('#blog-showhide').click()
      cy.contains('Likes: 0')
      cy.get('#blog-like').click()
      cy.contains('Likes: 1')
      cy.get('#blog-like').click()
      cy.contains('Likes: 2')
    })
    it('A blog can be removed by user that made it', function () {
      cy.createBlog({
        title: 'We created this with cypress',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
      })
      cy.get('#blog-showhide').click()
      cy.get('#blog-remove').click()
      cy.get('.success')
        .should('contain', 'removed blog titled: "We created this with cypress"')
      cy.get('html').should('not.contain', 'Title: We created this with cypress, Author: Tester Test')
    })
    it('A blog cannot be removed by other users', function () {
      cy.createBlog({
        title: 'We created this with cypress',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
      })
      cy.get('#button-logout').click()
      cy.login({
        username: 'rct', password: 'Salasana_'
      })
      cy.get('#blog-showhide').click()
      cy.get('html').should('not.contain', '#blog-remove')
    })
    it('Blog list is sorted by likes', function () {
      cy.createBlog({
        title: 'First blog',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
        likes: 1
      })
      cy.createBlog({
        title: 'Second blog',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
        likes: 3
      })
      cy.createBlog({
        title: 'Third blog',
        author: 'Tester Test',
        url: 'www.thislink.doesnt.work',
        likes: 5
      })
      let initialBlogs = []
      let finalBlogs = []
      cy.get('[id^=blog-showhide]').click({ multiple: true })
      initialBlogs = []
      //generating array of likes, expecting highes to be first and decending from there..
      cy.get('.blogStyle').then(($blog) => {
        cy.get($blog).each((blog) => {
          cy.get(blog[0]).within(() => {
            cy.get('#blog-likes').should(($likes) => {
              const text = $likes.text()
              initialBlogs.push(parseFloat(text))
            })
          })
        })
        //comparing all the blogslikes to the first blog, expecting all of them to be smaller than the first
        cy.get(initialBlogs).each((blog) => {
          assert.isAtMost(blog, initialBlogs[0], 'fist blog is highest or same value')
          assert.isAtLeast(blog, initialBlogs[initialBlogs.length-1], 'last blog is lowest or same value')
        })
      })
      cy.contains('First blog').parent().find('#blog-like').as('button')
      for (let i = 0; i < 6; i++) {
        cy.get('@button').click({ multiple: true })
      }

      cy.get('.blogStyle').then(($blog) => {
        cy.get($blog).each((blog) => {
          cy.get(blog[0]).within(() => {
            cy.get('#blog-likes').should(($likes) => {
              const text = $likes.text()
              finalBlogs.push(parseFloat(text))
            })
          })
        })
        cy.get(finalBlogs).each((blog) => {
          assert.isAtMost(blog, finalBlogs[0], 'fist blog is highest or same value')
          assert.isAtLeast(blog, finalBlogs[finalBlogs.length-1], 'last blog is lowest or same value')
        })
      })
    })
  })


})