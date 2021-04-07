import React from 'react';
import { Line } from 'react-chartjs-2'
import { useState, useEffect } from 'react';



function LineChart(){
    
    const [grafico, setGrafico] = useState([])
    const [urlParam, setUrlParam] = useState('https://ckn-api.herokuapp.com/relatorios/diario');
    

    

  useEffect(()=> { 
  
      fetch(urlParam)
        .then((r)=> r.json())
        .then((json)=>{
            setGrafico(
                    json.sort((a,b)=> {
                        return a.id - b.id
                    })
           
                
            )
            if (urlParam === 'https://ckn-api.herokuapp.com/relatorios/diario'){
              atualizaCotacaoBox(json[json.length-1].valor)
            }
            
        })
        
  },[urlParam]);

  function atualizaCotacaoBox(ultimoValor) {
    const selectValor = document.querySelector('.valor');
    selectValor.innerHTML = `R$ ${ultimoValor}`

    
  }

  function updateValue(e) {
    setUrlParam(`https://ckn-api.herokuapp.com/relatorios/${e.target.value}`)
    
    }

  useEffect(() => {
    const selectElement = document.querySelector('.seletor-relatorio');
    selectElement.addEventListener('change', updateValue);
  });


  

    const data = {
        labels: grafico.map(function(r){
            if (urlParam === 'https://ckn-api.herokuapp.com/relatorios/diario'){
             return r.data
        }
            if (urlParam === 'https://ckn-api.herokuapp.com/relatorios/semanal'){
            return r.semana
        }
        else{
          return r.mes
        }


      }),
        datasets:[
           {
               label: 'CKN',
               data: grafico.map(r => r.valor.toFixed(2)),
               color: 'rgb(255, 99, 132)',
               
                               

              

           }
           
          
        ],
        options: {        
          legend: {
            display: false
          }
        }
        
    }

    return(

        <Line data = {data}/>
    )
}

export default LineChart