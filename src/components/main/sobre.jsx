import React, { useState } from 'react';
import {Jumbotron } from 'react-bootstrap';
import './sobre.css'

const Sobre = (props) => {
	const [isOpen, setIsOpen] = useState(false);
  
	const toggle = () => setIsOpen(!isOpen); 
  
	return (

	<Jumbotron>
   
  <div class="col-md-6 p-4 ps-md-0">
    <h5 class="mt-0">Columns with stretched link</h5>
    <p>Another instance of placeholder content for this other custom component. It is intended to mimic what some real-world content would look like, and we're using it here to give the component a bit of body and size.</p>
    <a href="#" class="stretched-link">Go somewhere</a>
    
        </div>
   

    </Jumbotron>
	  
	);
  }

export default Sobre;