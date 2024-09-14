import App from './App'
import { createRoot } from 'react-dom/client'

const $root: HTMLElement = document.getElementById( 'root' )!
createRoot( $root ).render( <App /> )
