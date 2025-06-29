import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Movies from './pages/Movies';
import NewBook from './pages/NewBook';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />}/>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/book/new/:bookId" element={<NewBook />}/>
            </Routes>
        </BrowserRouter>
    );
}