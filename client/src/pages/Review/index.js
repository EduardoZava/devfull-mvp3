import React, {useState, useEffect, use} from 'react';
import {useNavigate, useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';

import logoImage from '../../assets/logo-omdb.png';

export default function NewReview(){

    const { reviewId } = useParams();

    
    const [imdbId, setImdbId] = useState('');
    const [user_opinion, setUserOpnion] = useState('');
    const [user_rating, setUserRating] = useState('');
  
    const navigate = useNavigate();
    
    const auth_token = localStorage.getItem('auth_token');
    const user_name = localStorage.getItem('user_name');

    useEffect(() => {
        if (reviewId === '0') return;
        else loadReviews();
    }, [reviewId]);

    async function loadReviews(e) {
        if (e) e.preventDefault();
        const imdbId = "tt0133093"; // Example IMDb ID for "The Matrix"
        try {

            const data = {
                "imdb_id": e.data.imdb_id || imdbId,
            };
            console.log( data)

            const response = await api.post(`/api/v1/search-review`,data) ;

            if (!response.data || response.data.length === 0) {
                alert('Não foram encontrados comentários para este filme!');
                return;
            }
            
            setImdbId(response.data.imdb_id);
            setUserOpnion(response.data.user_opinion);
            setUserRating(response.data.user_rating);
            console.log('comentários:', response.data);
            

        } catch (err) {
            alert('Erro recuperando comentários! Tente novamente!');
            
        }
        navigate('/review');
    }

    async function saveOrUpdate(e){
        e.preventDefault();

        const data = {
        
            imdb_id: e.imdb_id,
            user_opinion: e.user_opinion,
            user_rating: e.user_rating
        
        };

        try {
            if (imdbId !== '0') {
                await api.post('/api/v1/create-review', data);
            } else {
                await api.post('/api/v1/search-review', data);
            }
        } catch (error) {
            alert('Falha ao salvar ou atualizar o review! Tente novamente!');
        }
        navigate('/review');
    };

    return (
        <div className="new-review-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="OMDB"/>
                    <h1>{reviewId === '0' ? 'Novo' : 'Atualizar'} Opnião</h1>
                    <p>Entre com o Review e click on {reviewId === '0' ? `'Novo'` : `'Atualizar'`}!</p>
                    <Link className="back-link" to="/movies">
                        <FiArrowLeft size={16} color="#251fc5"/>
                        Home
                    </Link>
                </section>
                <form onSubmit={saveOrUpdate}>
                    <input
                        placeholder="IMDb ID"
                        value={imdbId}
                        onChange={e => setImdbId(e.target.value)}
                    />
                    <input
                        placeholder="Opnião do Usuário"
                        value={user_opinion}
                        onChange={e => setUserOpnion(e.target.value)}
                    />
                    <input
                        placeholder="Nota do Usuário"
                        value={user_rating}
                        onChange={e => setUserRating(e.target.value)}
                    />


                    <button className="button" type="submit">{reviewId === '0' ? 'Novo' : 'Atualizar'}</button>
                </form>
            </div>
        </div>
    );
}