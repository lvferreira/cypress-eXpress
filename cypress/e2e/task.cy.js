describe('tasks', () => {
    // beforeEach(() => {
    //     cy.request({
    //         url: 'http://localhost:3333/helper/tasks/',
    //         method: 'DELETE',
    //         body: { name: 'Read a node.js book' }
    //     }).then(response => {
    //         expect(response.status).to.eq(204)
    //     })
    // })
    let testData;

    before(() => {
        cy.fixture('tasks')
            .then(t => {
                testData = t
            })
    })

    context('create', () => {
        it('should create a new task', () => {
            const task = testData.task
            cy.deleteTaskByName(task)

            cy.createTask(task)

            cy.contains('main div p', task.name)
                .should('be.visible')
        })
        it('should not allow duplicate task', () => {
            const task = testData.dupe
            cy.deleteTaskByName(task)
            cy.postTask(task)

            cy.createTask(task)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')
        })
        it('should validate required field', () => {
            cy.createTask()
            cy.isRequired('This is a required field')
        })
    })
    context('update', () => {
        it('should close a task', () => {
            const task = testData.task
            cy.deleteTaskByName(task)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=_listItemToggle]')
                .click()

            cy.contains('', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })
        it('should delete a task', () => {
            const task = testData.task
            cy.deleteTaskByName(task)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=_listItemDeleteButton]')
                .click()

            cy.contains('', task.name)
                .should('not.exist')

        })
    })
})