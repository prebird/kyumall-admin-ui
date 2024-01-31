import Main from 'pages/main/Main'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App