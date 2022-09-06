import '@picocss/pico/css/pico.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import "sweetalert2/dist/sweetalert2.min.css"
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')
})

export default app