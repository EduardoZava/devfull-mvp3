import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login';
import Movies from './pages/Movies';
import NewReview from './pages/Review';


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/movies" element={<Movies />}/>
                <Route path="/" exact element={<Login />}/>
                <Route path="/review" element={<NewReview />}/>
            </Routes>
        </BrowserRouter>
    );
}