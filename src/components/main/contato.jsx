import React, { useState } from 'react';
import {Jumbotron } from 'react-bootstrap';
import './contato.css'

const Contato = (props) => {
	const [isOpen, setIsOpen] = useState(false);
  
	const toggle = () => setIsOpen(!isOpen); 
  
	return (
        <Jumbotron className="contatcorpo">
        <div class="col-sm-4">
                <div class="card">
                    <div class="card-body">
                        <th class="card-title">Email</th>
                        <p class="card-text">equipesgpo@gmail.com</p>
                           </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <th class="card-title">Whatsapp</th>
                        <p class="card-text">(84) 99929-6169</p>
                           </div>
                </div>
        </div>
    </Jumbotron>
	);
  }

export default Contato;