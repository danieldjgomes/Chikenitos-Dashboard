import React from 'react';

function Cotacao(props){
    return(
        <div>
        <h2>{props.nome}</h2> CKN {props.valor}
        </div>

    )
}


export default Cotacao