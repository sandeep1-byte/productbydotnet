import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS here

createRoot(document.getElementById('root')).render(
    <App />
)