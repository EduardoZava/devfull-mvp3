// File: client/src/pages/NotFound/index.js
import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css'; // Importar estilos específicos para a página 404
/**
 * Componente de Página 404 (Não Encontrado).
 * Exibe uma mensagem de erro quando uma rota não é encontrada e oferece
 * um link para retornar à página inicial.
 */
function NotFound() {
    return (
        <div className="flex-items-center">
            <div className="bg-white p-8 sm:p-10 lg:p-12 rounded-xl shadow-lg text-center max-w-md w-full">
                <h1 className="text-6xl sm:text-7xl font-extrabold text-blue-600 mb-4">
                    404
                </h1>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Página Não Encontrada
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>
                <Link
                    to="/" // Altere para a rota da sua página inicial, se for diferente
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Voltar para a Página Inicial
                </Link>
            </div>
        </div>
    );
}

export default NotFound;