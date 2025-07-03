/**
 * Componente de Barra de Busca.
 * Permite ao usuário digitar um termo e acionar uma busca, com um ícone de busca.
 *
 * @param {object} props - As propriedades do componente.
 * @param {function(string): void} props.onSearch - Função de callback a ser chamada com o termo de busca.
 * @param {string} [props.placeholder="Buscar..."] - Texto de placeholder para o input.
 * @param {string} [props.buttonText="Buscar"] - Texto do botão de busca.
 */
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './searchbar.css'; // Certifique-se de ter um arquivo CSS para estilos adicionais, se necessário

function SearchBar({ onSearch, placeholder = "Buscar..." }) {
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
        <form onSubmit={handleSubmit} className="form-flex-items">
            {/* Contêiner para o ícone e input, usando flex para alinhamento */}
            <div className="relative flex-grow flex items-center">
               {/* Input de busca */}
                <input
                    type="text"
                    className="flex-grow pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={handleChange}
                    aria-label={placeholder}
                />
            </div>
            {/* Botão de busca */}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!searchTerm.trim()} // Desabilita o botão se o termo de busca estiver vazio
            >
                <FiSearch size={24} color="#251FC5" />
            </button>
        </form>
    );
}

export default SearchBar;