// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createTask', (task = '') => {
    cy.visit('/')
    cy.get('#newTask').as('inputTask')
    if (task !== '') {
        cy.get('@inputTask')
            .type(task.name)
    }
    cy.contains('button', 'Create') //button[contains(text(), "Create")]
        .click()
})

Cypress.Commands.add('isRequired', (message) => {
    cy.get('@inputTask')
        .invoke('prop', 'validationMessage')
        .should((text) => {
            expect(
                message
            ).to.eq(text)
        })
})

Cypress.Commands.add('postTask', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + 'tasks',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: task
    }).then((response) => {
        expect(response.status).to.eq(201)
    })
})

Cypress.Commands.add('deleteTaskByName', (task) => {
    cy.request({
        url: Cypress.env('apiUrl') + 'helper/tasks/',
        method: 'DELETE',
        body: {
            name: task.name
        }
    }).then(response => {
        expect(response.status).to.eq(204)
    })
})