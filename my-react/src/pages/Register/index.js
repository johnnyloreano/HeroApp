import React, { useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
export default function Register(){


    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();
        const data = {
            name,
            email,
            phone,
            uf,
            city
        };
            console.log(data);
        try{
            const result = await api.post('ongs',data);
            alert(`Cadastro realizado com sucesso! Seu ID de acesso é ${result.data.id}`)    
            history.push("/");
        }
        catch(e){
            alert(`Não foi possivel realizar o cadastro. Espere um momento e tente novamente. ${e}`);
        }
    }
    return(
        <div className="register-container">
            <div className="content">
                <section>

                    <img src={logoImg} alt="Be the Hero" />
                    <h1> Cadastro </h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG. </p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size = {16} color="#E02041" />
                            Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit= {handleRegister} >
                    <input placeholder= "Nome da ONG" 
                        value = {name}
                        onChange = {e => setName(e.target.value)}
                    />
                    <input type="email" placeholder= "E-mail" 
                        value = {email}
                        onChange = {e => setEmail(e.target.value)}
                    />
                    <input placeholder= "Telefone" 
                        value = {phone}
                        onChange = {e => setPhone(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade" 
                        value = {city}
                        onChange = {e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" style={{width: 80}}  
                            value = {uf}
                            onChange = {e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type = "submit" >Cadastrar</button>
                </form>
            </div>
        </div>

    );

}