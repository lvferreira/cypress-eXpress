const { defineConfig } = require('cypress')
const allureWriter = require('@shelex/cypress-allure-plugin/writer')

module.exports = defineConfig({
	projectId: 'x68y5a',
	e2e: {
		baseUrl: 'http://localhost:8080',
		env: {
			apiUrl: 'http://localhost:3333/',
		},
		viewportWidth: 1920,
		viewportHeight: 1080,
		setupNodeEvents(on, config) {
			// implement node event listeners here
			allureWriter(on, config)
			return config
		},
	},
})
