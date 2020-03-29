import React , { useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { FiPower,FiTrash2 } from 'react-icons/fi'
import './styles.css';
import api from '../../services/api';

export default function Profile(){
    const [incident,setIncident] = useState([])
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    useEffect( 
        () => {
            api.get('/profile', {
                                    headers : {Authorization : ongId                                        }
                    }).then(response => {setIncident(response.data)})
        },[ongId]
        )

        async function handleDeleteIncident(id){
            try{
                await api.delete(`/incidents/${id}`, {headers : {Authorization : ongId}} );
                setIncident(incident.filter(incident => incident.id !== id ))
            }
            catch(err){
                alert(`Não foi possível deletar. Tente novamente mais tarde`);
            }

        }
        function handleLogout(){
            localStorage.clear();
            history.push("/");
        }
    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt = "Be the hero" />
                    <span>Bem vindo, {ongName}</span>

                <Link className = "button" to = "/incidents/new">Cadastrar novo Caso</Link>
                <button type= "button" onClick = {handleLogout}>
                    <FiPower size = {18} color = "#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados :</h1>
            <ul>
                {incident.map(
                    incident => (
                            <li key ={incident.id}>
                                <strong> CASO: </strong>
                                <p> {incident.title}</p>

                                <strong> DESCRIÇÃO: </strong>
                                <p> {incident.description}</p>

                                <strong> VALOR: </strong>
                                <p>{Intl.NumberFormat('pt-BR', { style : 'currency', currency : 'BRL'}).format(incident.value)}</p>
                                <button type="button" onClick = { ()=> handleDeleteIncident(incident.id)}>
                                    <FiTrash2 size = {20} color = "#a8a8b3" />
                                </button>
                            </li>

                    )
                )}
            </ul>
        </div>

    )
}