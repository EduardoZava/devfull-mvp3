// File: client/src/pages/Movies/index.js
import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
// Importar os ícones de Material Design para as setas de navegação
import { MdArrowBack, MdArrowForward } from 'react-icons/md'; 
import Header from '../../componentes/Header'; // Certifique-se que o caminho está correto
import api from '../../services/api';
import MovieCard from '../../componentes/MovieCard'; // Certifique-se que o caminho está correto
import Footer from '../../componentes/Footer';
import './styles.css';


//import SearchBar from '../../componentes/SearchBar';


export default function Movies() {
    // Estado para armazenar TODOS os filmes carregados
    const [allMovies, setAllMovies] = useState([]);
    // Estado para paginação
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 1; // <--- AJUSTADO: Número de filmes por página (ex: 2 linhas de 3 filmes)

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            // Usando Promise.allSettled para carregar filmes em paralelo e capturar falhas individuais
            const fetchPromises = imdbIdsToLoad.map(async (imdb_id) => {
                const data = { imdb_id: imdb_id };
                try {
                    const response = await api.post(`/api/v1/search-movie`, data);
                    if (response.data && response.data.length > 0) {
                        // Verifica se o filme já foi carregado
                        const movieData = { ...response.data[0] }; // Copia os dados do filme
  
                        return movieData;
                    }
                    return null;
                } catch (innerError) {
                    console.warn(`Filme com IMDb ID ${imdb_id} não encontrado ou erro ao buscar:`, innerError);
                    return null;
                }
            });

            const results = await Promise.allSettled(fetchPromises);
            results.forEach(result => {
                if (result.status === 'fulfilled' && result.value) {
                    fetchedMovies.push(result.value);
                }
            });

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
        console.log('Editando filme com IMDb ID:', imdbId);
        const data = { imdbId: imdbId }

        // try {
        //     const response = await api.put("/api/v1/search-review", data);
        //     console.log(response.data);
        // } catch (error) {
        //     console.error('Error fetching reviews:', error);
        // }
        try {
            navigate(`/review`,data);
        } catch (err) {
            alert('Falha na edição do filme! Tente novamente!');
        }
    }

    async function deleteMovie(imdbId) {
        try {
            setAllMovies(prevMovies => {
                const updatedMovies = prevMovies.filter(movie => movie.imdb_id !== imdbId);
                const newTotalPages = Math.ceil(updatedMovies.length / moviesPerPage);
                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                } else if (newTotalPages === 0) {
                    setCurrentPage(1);
                }
                return updatedMovies;
            });
            alert(`Filme com IMDb ID ${imdbId} excluído.`);
        } catch (err) {
            alert('Falha na exclusão! Tente novamente!');
        }
    }

    async function logout() {
        try {
            console.log("logout");
            localStorage.clear();
            navigate('/');
        } catch (err) {
            alert('Falha no Logout! Tente novamente!');
        }
    }

    
    return (
        <div className="movie-container min-h-screen p-4 flex flex-col items-center" style={{ backgroundColor: 'black', color: 'white' }}>

            <Header 
                userName={user_name} 
                onLogout={logout} 
            />
            
            
            {loading && <p className="text-center text-blue-500 w-full">Carregando filmes...</p>}
            {error && <p className="text-center text-red-600 w-full">{error}</p>}
            
            {displayedMovies.length > 0 ? (
                // Renderiza a lista de filmes usando MovieCard em uma grade
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-5xl mx-auto">
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
                !loading && !error && allMovies.length === 0 && <p className="text-center text-gray-500 mt-8 w-full">Nenhum filme disponível. Tente carregar alguns filmes.</p>
            )}
            {/* Controles de Paginação */}
            {totalPages > 1 && ( 
                <div className="controle-paginacao" style={{ color: 'white' }}>
                    <center>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1 || loading}
                        aria-label="Página Anterior"
                    >
                        <MdArrowBack size={20} className="mr-1" />
                        <span className="hidden sm:inline">Anterior</span>
                    </button>
                    <span className="text-lg font-semibold text-gray-200">Página {currentPage} de {totalPages}</span>
                    <button
                        className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages || loading}
                        aria-label="Próxima Página"
                    >
                        <span className="hidden sm:inline">Próxima</span>
                        <MdArrowForward size={20} className="ml-1" />
                    </button>
                    </center>
                </div>
            )}
            <Footer
                loadMultipleMovies={loadMultipleMovies}
                loading={loading}
            />
        </div>
    );
}
