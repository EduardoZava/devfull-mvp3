// File: client/src/components/MovieCard.js
import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

// Este componente exibe os detalhes de um único filme
function MovieCard({ movie, editMovie, deleteMovie }) {
    // É crucial verificar se 'movie' existe antes de tentar exibir seus detalhes
    if (!movie) {
        return null; // Não renderiza nada se não houver filme
    }

    return (
        <li className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between border border-gray-200">
            {/* IMAGEM DO PÔSTER */}
            {movie.poster && ( // Renderiza o pôster apenas se a URL existir
                <div className="flex-shrink-0 mb-4 mx-auto w-full max-w-[200px] h-auto"> {/* Contêiner para a imagem, centralizado */}
                    <img 
                        src={movie.poster} 
                        alt={`Pôster do filme ${movie.title}`} 
                        className="rounded-lg shadow-md w-full h-auto object-cover"
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x450/cccccc/ffffff?text=Pôster+Indisponível"; }} // Fallback
                    />
                </div>
            )}
            {!movie.poster && ( // Exibe um placeholder se não houver pôster
                <div className="flex-shrink-0 mb-4 mx-auto w-full max-w-[200px] h-auto bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 text-center p-4">
                    Pôster Indisponível
                </div>
            )}

            {/* Detalhes do Filme */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{movie.title} ({movie.year})</h3>
                
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

                <div className="mb-4">
                    <strong className="text-gray-700">Sinopse:</strong>
                    <p className="text-gray-600 text-sm line-clamp-3">{movie.plot || 'N/A'}</p> {/* Limita a sinopse para manter o tamanho do card */}
                </div>

                {/* Reviews, se houverem */}
                {movie.reviews && movie.reviews.length > 0 && (
                    <div className="mb-4">
                        <strong className="text-gray-700">Reviews:</strong>
                        <ul className="list-disc list-inside text-gray-600 text-sm ml-4">
                            {movie.reviews.map((review, index) => (
                                <li key={index}>"{review.user_opinion}" - {review.user_rating}/10</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Botões de Ação para o filme */}
            <div className="flex justify-end space-x-2 mt-4">
                <button 
                    onClick={() => editMovie(movie.imdb_id)} 
                    type="button"
                    className="p-2 rounded-full hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    title="Editar Filme"
                >
                    <FiEdit size={20} color="#251FC5"/>
                </button>
                
                <button 
                    onClick={() => deleteMovie(movie.imdb_id)} 
                    type="button"
                    className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                    title="Excluir Filme"
                >
                    <FiTrash2 size={20} color="#DC2626"/>
                </button>
            </div>
        </li>
    );
}

export default MovieCard;