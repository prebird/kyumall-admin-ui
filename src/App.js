import Main from 'pages/main/Main'
import TermManage from 'pages/members/TermManage'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />}></Route>
                <Route path="/members/term-manage" element={<TermManage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App