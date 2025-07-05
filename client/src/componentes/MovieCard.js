// File: client/src/components/MovieCard.js
import React from 'react';
import { MdStarBorder } from 'react-icons/md';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';
import { FiTrash } from 'react-icons/fi';
import MovieReviews from './MovieReviews'; // Importar o componente de Reviews

import './moviecard.css';

// Este componente exibe os detalhes de um único filme
function MovieCard({ movie, editMovie, deleteMovie }) {

    const navigate = useNavigate();

    // É crucial verificar se 'movie' existe antes de tentar exibir seus detalhes
    if (!movie) {
        return null; // Não renderiza nada se não houver filme
    }
    
    
    const containerStyle = {
            height: '120px', // Fixed height for the scrollable area
            overflowY: 'scroll', // Enable vertical scrolling
            border: '2px solid #ccc', // Optional: add a border for visual clarity
            padding: '10px',
    };

    async function editMovie(imdbId) {
        console.log('Editando filme com IMDb ID:', imdbId);
        const data = { imdbId: imdbId }

        try {
            const response = await api.pos("/api/v1/search-review", data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
        try {
            navigate(`/review`,data);
        } catch (err) {
            alert('Falha na edição do filme! Tente novamente!');
        }
    }

    return (
        <li
            className="li-container" 
           
        >
            <div className='text-center mb-4'> {/* Centraliza o título do catálogo */}
                <h1 className="text-3xl font-bold text-gray-800 mb-6 w-full">Catálogo de Filmes</h1>
            </div>
            {/* IMAGEM DO PÔSTER */}
            <div className="flex-shrink-0 mb-4 mx-auto w-full max-w-[200px] h-auto"> {/* Contêiner para a imagem, centralizado */}
                <img 
                    src={movie.poster} 
                    alt={`Pôster do filme ${movie.title}`} 
                    className="rounded-lg shadow-md w-full h-auto object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x450/cccccc/ffffff?text=Pôster+Indisponível"; }} // Fallback para imagem
                />
            </div>

             {/* Detalhes do Filme - flex-grow para ocupar o espaço restante, flex-col para layout em coluna, min-h-0 para permitir rolagem em filhos */}
            <div className="flex-grow flex flex-col min-h-0"> 
                <strong className="text-gray-700">Título Filme:</strong>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title} ({movie.year})</h3>
                
                {/* NOVO: Layout de grade para os detalhes do filme usando classes CSS personalizadas */}
                <div className="movie-details-grid"> {/* Aplicada a classe CSS 'movie-details-grid' */}
                    <div className="movie-detail-item"> {/* Aplicada a classe CSS 'movie-detail-item' */}
                        <strong className="text-gray-700">IMDb ID:</strong>
                        <p className="text-gray-600">{movie.imdb_id || 'N/A'}</p>
                    </div>

                    <div className="movie-detail-item">
                        <strong className="text-gray-700">Gênero:</strong>
                        <p className="text-gray-600">{movie.genre || 'N/A'}</p>
                    </div>

                    <div className="movie-detail-item">
                        <strong className="text-gray-700">Diretor:</strong>
                        <p className="text-gray-600">{Array.isArray(movie.director) ? movie.director.join(', ') : movie.director || 'N/A'}</p> 
                    </div>
                    
                    <div className="movie-detail-item">
                        <strong className="text-gray-700">Atores:</strong>
                        <p className="text-gray-600">{Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || 'N/A'}</p>
                    </div>

                    <div className="movie-detail-item">
                        <strong className="text-gray-700">IMDb Avaliação:</strong>
                        <p className="text-gray-600">{movie.imdb_rating || 'N/A'}</p>
                    </div>
                </div> {/* Fim do grid */}

                {/* SINOPSE COM CAIXA DE ROLAGEM */}
                {/* flex-none para que o conteúdo da sinopse não "empurre" o container pai */}
                <div className="mb-4 flex-none"> 
                    <strong className="text-gray-700">Sinopse:</strong>
                    {/* H-40 é uma altura (160px). overflow-y-auto mostra a barra apenas se necessário. */}
                    <div style={containerStyle}>
                        <p>{movie.plot || 'N/A'}</p>
                    </div>
                </div>

                {/* COMPONENTE DE REVIEWS */}
                {/* Passa o array de reviews do filme para o novo componente */}
                {/* flex-none para garantir que as reviews não afetem a sinopse */}
                <div className="flex-none">
                    <MovieReviews reviews={movie.reviews} />
                </div>
            </div>

            {/* Botões de Ação para o filme - também com flex-shrink-0 */}
            <div className="flex justify-end space-x-2 mt-4 flex-shrink-0">
                <button 
                    onClick={() => editMovie(movie.imdb_id)} 
                    type="button"
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Adcionar Opnião"
                >
                    <MdStarBorder size={24} color="#251FC5"/>
                </button>
                
                <button 
                    onClick={() => deleteMovie(movie.imdb_id)} 
                    type="button"
                    className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Excluir Filme"
                >
                    <FiTrash size={24} color="251FC5"/>
                </button>
            </div>
        </li>
    );
}

export default MovieCard;
