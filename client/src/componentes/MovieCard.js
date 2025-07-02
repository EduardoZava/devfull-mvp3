// File: client/src/components/MovieCard.js
import React from 'react';
import { MdStarBorder } from 'react-icons/md';
import { FiTrash } from 'react-icons/fi';
import MovieReviews from './MovieReviews'; // Importar o componente de Reviews

// Este componente exibe os detalhes de um único filme
function MovieCard({ movie, editMovie, deleteMovie }) {
    // É crucial verificar se 'movie' existe antes de tentar exibir seus detalhes
    if (!movie) {
        return null; // Não renderiza nada se não houver filme
    }

    
    const containerStyle = {
            height: '150px', // Fixed height for the scrollable area
            overflowY: 'scroll', // Enable vertical scrolling
            border: '2px solid #ccc', // Optional: add a border for visual clarity
            padding: '10px',
    };

    return (
        <li
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200"
            // Removida a altura fixa em 'px' para o <li> para que ele se ajuste ao conteúdo dentro de uma grade.
            // A altura será gerenciada pela grade pai, mas a sinopse terá sua própria rolagem interna.
        >
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
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title} ({movie.year})</h3>
                
                <div className="mb-2">
                    <strong className="text-gray-700">IMDB:</strong>
                    <p className="text-gray-600">{movie.imdb_id || 'N/A'}</p>
                </div>

                <div className="mb-2">
                    <strong className="text-gray-700">Gênero:</strong>
                    <p className="text-gray-600">{movie.genre || 'N/A'}</p>
                </div>

                <div className="mb-2">
                    <strong className="text-gray-700">Diretor:</strong>
                    <p className="text-gray-600">{Array.isArray(movie.director) ? movie.director.join(', ') : movie.director || 'N/A'}</p> 
                </div>
                
                <div className="mb-2">
                    <strong className="text-gray-700">Atores:</strong>
                    <p className="text-gray-600">{Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || 'N/A'}</p>
                </div>

                <div className="mb-2">
                    <strong className="text-gray-700">IMDb Avaliação:</strong>
                    <p className="text-gray-600">{movie.imdb_rating || 'N/A'}</p>
                </div>

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
