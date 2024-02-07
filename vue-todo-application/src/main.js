import { createApp } from 'vue' // Import the createApp function from the Vue library
import App from './App.vue' // Imports the main Vue component (App.vue) that will be mounted on the application.

// Imports the Bootstrap and Bootstrap icons file
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"

createApp(App).mount('#app') // Mounts the Vue application instance to the HTML element with the ID "app"
