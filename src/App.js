import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Coin from './pages/Coin';
import Compare from './pages/Compare';
import Watchlist from './pages/Watchlist';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    useEffect(() => {
        let cursor = document.getElementById('cursor');
        let cursorPointer = document.getElementById('cursor-pointer');

        document.body.addEventListener('mousemove', function (e) {
            return ((cursor.style.left = e.clientX + 'px'),
                (cursor.style.top = e.clientY + 'px'),
                (cursorPointer.style.left = e.clientX + 'px'),
                (cursorPointer.style.top = e.clientY + 'px'));
        });

        document.body.addEventListener('mousedown', function (e) {
            return ((cursor.style.height = '0.5rem'),
                (cursor.style.width = '0.5rem'),
                (cursorPointer.style.height = '3rem'),
                (cursorPointer.style.width = '3rem'));
        });

        document.body.addEventListener('mouseup', function (e) {
            return ((cursor.style.height = '0.3rem'),
                (cursor.style.width = '0.3rem'),
                (cursorPointer.style.height = '2rem'),
                (cursorPointer.style.width = '2rem'));
        });
    }, []);

    return (
        <div className='App'>
            <ToastContainer />
            <div className='cursor' id='cursor' />
            <div className='cursor-pointer' id='cursor-pointer' />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/coin/:id' element={<Coin />} />
                    <Route path='/compare' element={<Compare />} />
                    <Route path='/watchlist' element={<Watchlist />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
