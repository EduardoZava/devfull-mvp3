// File: client/src/components/SearchBar.js

import React, { useState } from 'react';
import { FiSearch} from 'react-icons/fi';

/**
 * Componente de Barra de Busca.
 * Permite ao usuário digitar um termo e acionar uma busca.
 *
 * @param {object} props - As propriedades do componente.
 * @param {function(string): void} props.onSearch - Função de callback a ser chamada com o termo de busca.
 * @param {string} [props.placeholder="Buscar..."] - Texto de placeholder para o input.
 * @param {string} [props.buttonText="Buscar"] - Texto do botão de busca.
 */
function SearchBar({ onSearch, placeholder = "Buscar...", buttonText = "Buscar" }) {
    // Estado para armazenar o valor atual do input de busca
    const [searchTerm, setSearchTerm] = useState('');

    /**
     * Lida com a mudança no input de busca.
     * @param {React.ChangeEvent<HTMLInputElement>} e - O evento de mudança.
     */
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    /**
     * Lida com o envio do formulário (clique no botão de busca).
     * Chama a função onSearch passada via props com o termo atual.
     * @param {React.FormEvent<HTMLFormElement>} e - O evento de envio do formulário.
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão de recarregar a página
        if (searchTerm.trim()) { // Garante que o termo não seja vazio ou apenas espaços
            onSearch(searchTerm.trim());
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 p-4 bg-white rounded-lg shadow-md">
            {/* Search input */}
            <input
                type="text"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
                aria-label={placeholder}
            />
            {/* Search button with Material Design icon */}
            <button
                type="submit"
                className="flex items-center justify-center p-2 bg-blue-500 rounded-md hover:bg-blue-600 transition-colors ml-2"
                aria-label="Search"
            >
                {/* Material Design Search Icon (SVG) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                </svg>
            </button>
        </form>
    );
}

export default SearchBar;