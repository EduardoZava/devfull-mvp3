// File: client/src/pages/Movies/index.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
// Importar os ícones de Material Design para as setas de navegação
import { MdArrowBack, MdArrowForward } from 'react-icons/md'; // <--- NOVO: Ícones de seta


import api from '../../services/api';
import MovieCard from '../../componentes/MovieCard';

import './styles.css';

import logoImage from '../../assets/logo-omdb.png';

export default function Movies() {
    // Estado para armazenar TODOS os filmes carregados
    const [allMovies, setAllMovies] = useState([]);
    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 3; // Número de filmes por página (para uma grade 3x3, por exemplo)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const auth_token = localStorage.getItem('auth_token');
    const user_name = localStorage.getItem('user_name');

    const navigate = useNavigate();

    // IDs de 20 filmes para carregar
    const imdbIdsToLoad = [
        "tt1375666", "tt0816692", "tt0111161", "tt0468569", "tt0109830",
        "tt0133093", "tt0110357", "tt0167260", "tt0102926", "tt0068646",
        "tt0076759", "tt0120737", "tt0120815", "tt0372784", "tt0099685",
        "tt0071562", "tt0050083", "tt0118799", "tt0095327", "tt0110912"
    ];

    // Função para carregar múltiplos filmes
    async function loadMultipleMovies(e) {
        if (e) e.preventDefault();

        setLoading(true);
        setError(null);
        setAllMovies([]); // Limpa filmes anteriores ao recarregar
        setCurrentPage(1); // Volta para a primeira página ao recarregar

        const fetchedMovies = [];

        try {
            for (const imdb_id of imdbIdsToLoad) {
                const data = { imdb_id: imdb_id };
                try {
                    const response = await api.post(`/api/v1/search-movie`, data);
                    if (response.data && response.data.length > 0) {
                        fetchedMovies.push(response.data[0]);
                    }
                } catch (innerError) {
                    console.warn(`Filme com IMDb ID ${imdb_id} não encontrado ou erro ao buscar:`, innerError);
                }
            }
            setAllMovies(fetchedMovies); // Define TODOS os filmes carregados
            console.log("Todos os filmes carregados:", fetchedMovies);

            if (fetchedMovies.length === 0) {
                alert('Nenhum filme foi carregado. Verifique os IDs ou a conectividade da API.');
            }
            
        } catch (mainError) {
            console.error("Erro principal ao carregar filmes:", mainError);
            setError('Erro ao carregar filmes! Tente novamente.');
            alert('Erro ao carregar filmes! Tente novamente!');
        } finally {
            setLoading(false);
        }
    }

    // Calcular filmes a serem exibidos na página atual
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const displayedMovies = allMovies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(allMovies.length / moviesPerPage);

    // Handlers de paginação
    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    // Carregar filmes automaticamente ao montar o componente
    useEffect(() => {
        loadMultipleMovies();
    }, []);

    async function editMovie(imdbId) {
        try {
            navigate(`/movie/new/${imdbId}`);
        } catch (err) {
            alert('Falha na edição do filme! Tente novamente!');
        }
    }

    async function deleteMovie(imdbId) {
        try {
            // Lógica real para chamar a API de exclusão (descomente quando implementar)
            // await api.delete(`/api/movie/v1/${imdbId}`, {
            //     headers: { Authorization: `Bearer ${auth_token}` }
            // }); 
            
            // Após a exclusão, atualize a lista de filmes removendo o filme excluído
            // Isso funciona filtrando de 'allMovies' e resetando a página se necessário
            setAllMovies(prevMovies => prevMovies.filter(movie => movie.imdb_id !== imdbId));
            // Ajuste a página atual se a última página ficar vazia
            if (currentPage > 1 && displayedMovies.length === 1 && allMovies.length - 1 === indexOfFirstMovie) {
                setCurrentPage(prevPage => prevPage - 1);
            }
            alert(`Filme com IMDb ID ${imdbId} excluído.`);
        } catch (err) {
            alert('Falha na exclusão! Tente novamente!');
        }
    }

    async function logout() {
        try {
            localStorage.clear();
            navigate('/');
        } catch (err) {
            alert('Falha no Logout! Tente novamente!');
        }
    }
    
    return (
        <div className="movie-container bg-gray-50 min-h-screen p-4">
            <header className="flex items-center justify-between p-4 bg-white shadow rounded-lg mb-6">
                <img src={logoImage} alt="OMDB Logo" className="h-10"/>
                <span className="text-lg text-gray-700">Bem vindo, <strong>{user_name ? user_name.toUpperCase() : 'Convidado'}</strong>!</span>
                <div className="flex items-center space-x-4">
                    <Link className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200" to="/book/new/0">Adicionar Novo Filme</Link>
                    <button onClick={logout} type="button" className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <FiPower size={18} color="#251FC5" />
                    </button>
                </div>
            </header>

            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Catálogo de Filmes</h1>
            
            {loading && <p className="text-center text-blue-500">Carregando filmes...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            
            {/* Renderiza a lista de filmes usando MovieCard */}
            {displayedMovies.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {displayedMovies.map(movie => (
                        <MovieCard 
                            key={movie.imdb_id} 
                            movie={movie} 
                            editMovie={editMovie} 
                            deleteMovie={deleteMovie} 
                        />
                    ))}
                </ul>
            ) : (
                !loading && !error && allMovies.length === 0 && <p className="text-center text-gray-500 mt-8">Nenhum filme disponível. Tente carregar alguns filmes.</p>
            )}

            {/* Controles de Paginação */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1 || loading}
                >
                    <MdArrowBack size={20} className="mr-1" /> {/* MUDANÇA AQUI: MdArrowBack */}
                    <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="text-lg font-semibold text-gray-700">Página {currentPage} de {totalPages}</span>
                <button
                    className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || loading}
                >
                    <span className="hidden sm:inline">Próxima</span>
                    <MdArrowForward size={20} className="ml-1" /> {/* MUDANÇA AQUI: MdArrowForward */}
                </button>
            </div>

            {/* O botão "Carregar Filmes (3x)" agora é um "Recarregar Todos os Filmes" */}
            <div className="text-center mt-6">
                <button 
                    className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    onClick={loadMultipleMovies} 
                    type="button"
                    disabled={loading}
                >
                    {loading ? 'Carregando Todos...' : 'Recarregar Todos os Filmes'}
                </button>
            </div>
        </div>
    );
}