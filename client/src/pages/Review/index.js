import React, {useState} from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './styles.css';

import logoImage from '../../assets/logo-omdb.png';

export default function NewReview() {

    const [imdbId, setImdbId] = useState('');
    const [userOpinion, setUserOpinion] = useState('');
    const [userRating, setUserRating] = useState('');
    const [idExiste, setIdExiste] = useState('');
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function saveOrUpdate(e) {
        e.preventDefault();

        setError("");

        // Validação básica

        if (!imdbId || !userOpinion || !userRating) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        if (Number(userRating) < 1 || Number(userRating) > 10) {
            
            setError("A nota do usuário deve ser entre 1 e 10.");
            return;
        }
        

        const data = {
            imdb_id: imdbId,
            user_opinion: userOpinion,
            user_rating: Number(userRating) // Garante que a nota seja um número
        };

        try {
            // ALTERAÇÃO CRUCIAL: Usando api.post e a URL '/api/v1/search-reviews' conforme sua instrução.
            // IMPORTANTE: Este endpoint é para BUSCAR reviews e retorna uma LISTA.
            // Se a intenção é SALVAR/ATUALIZAR uma review, o endpoint e o método geralmente seriam diferentes (ex: POST /api/v1/reviews/ ou PUT /api/v1/reviews/{id}).
            const response = await api.post(`/api/v1/search-review`, data); 

            const fetchedReviews = response.data; // A resposta é uma LISTA de reviews

            console.log('Reviews recebidas da busca:', fetchedReviews);

            if (!fetchedReviews || fetchedReviews.length === 0) {

                // Se o imdbId NÃO está na lista salva no localStorage, prossiga normalmente
                const imdbIdsToLoad = JSON.parse(localStorage.getItem("imdbIdsToLoad") || "[]");
                if (!imdbIdsToLoad.includes(imdbId)) {
                    // imdbId não está na lista, prossiga seguir para inclusao
                    const response = await api.post(`/api/v1/create-review`, data); 
                    if (response.data || fetchedReviews.length > 0){
                        alert("Inclusao realizada com sucesso!" )
                        setIdExiste('s')
                        imdbIdsToLoad.add(imdbId);
                    }
                    else
                    {
                        //Opcional: Limpar os campos se nenhuma review for encontrada
                        setImdbId('');
                        setUserOpinion('');
                        setUserRating('');
                        setIdExiste('')
                        return;
                    }

                }
                


            }
            
            // ASSUNÇÃO: Se reviews foram encontradas, você quer usar a primeira para preencher os campos.
            // Isso é uma interpretação da sua instrução, pois a função é 'saveOrUpdate'
            // mas o endpoint é 'search-review' que retorna uma lista.
            const firstReview = fetchedReviews[0];

            //alert('Busca de review realizada com sucesso! Exibindo a primeira review encontrada.');

            // Atualiza os estados com os dados da PRIMEIRA review retornada
            setImdbId(firstReview.imdb_id);
            setUserOpinion(firstReview.user_opinion);
            setUserRating(firstReview.user_rating);

            navigate('/review',data); // Navega de volta para a lista de reviews

        } catch (err) {
            console.error('Erro ao processar a requisição:', err);
            // Mensagem de erro mais específica, se disponível na resposta da API
            const errorMessage = err.response && err.response.data && err.response.data.detail
                               ? err.response.data.detail
                               : 'Erro ao realizar a operação! Tente novamente.';
            alert(errorMessage);
        }
    }

    return (
        <div className="new-review-container">
            <div className="content">
                <section className="form">
                    <img src={logoImage} alt="OMDB"/>
                    <h1>{idExiste === '' ? 'Novo' : 'Atualizar'} Opnião</h1>
                    <p>Entre com o Review e click on {idExiste === '' ? `'Novo'` : `'Atualizar'`}!</p>
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
                        value={userOpinion}
                        onChange={e => setUserOpinion(e.target.value)}
                    />
                    <input
                        placeholder="Nota do Usuário"
                        value={userRating}
                        onChange={e => setUserRating(e.target.value)}
                    />
                    <button className="button" type="submit">{idExiste === '' ? 'Novo' : 'Atualizar'}</button>
                    {error && <p className="new-review-error">{error}</p>}
                </form>
            </div>
        </div>
    );
}