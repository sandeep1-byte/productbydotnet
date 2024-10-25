import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateCategory from './Components/Category/CreateCategory'
import GetCategory from './Components/Category/GetCategory'
import EditCategory from './Components/Category/EditCategory'
import Signup from './Components/User/Signup';
import SignIn from './Components/User/Signin';

function App() {
    return <Router>
        <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/createCategory" element={<CreateCategory />} />
            <Route path="/getCategory" element={<GetCategory />} />
            <Route path="/edit/:id" element={<EditCategory />} /> {/* Route for editing a category */}
        </Routes>
    </Router>
}

export default App
