// File: client/src/components/MovieReviews.js
import React from 'react';

// Componente para exibir uma lista de reviews de um filme, limitado a 2
function MovieReviews({ reviews }) {
    // Verifica se há reviews e se é um array
    if (!reviews || !Array.isArray(reviews) || reviews.length === 0) {
        return null; // Não renderiza nada se não houver reviews
    }

    // Pega apenas os primeiros 2 reviews, conforme solicitado
    const reviewsToDisplay = reviews.slice(0, 2);

    return (
        <div className="mt-4 border-t border-gray-200 pt-4">
            <strong className="text-gray-700 text-md block mb-2">Avaliações (Reviews):</strong>
            <ul className="space-y-2">
                {reviewsToDisplay.map((review, index) => (
                    <li key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
                        <p className="text-gray-800 text-sm italic mb-1">"{review.user_opinion}"</p>
                        <p className="text-gray-600 text-xs text-right">Avaliação: <strong>{review.user_rating}/10</strong></p>
                    </li>
                ))}
                {reviews.length > 2 && ( // Mensagem ajustada para mais de 2 reviews
                    <p className="text-gray-500 text-xs text-center mt-2">...e mais {reviews.length - 2} avaliações.</p>
                )}
            </ul>
        </div>
    );
}

export default MovieReviews;
