import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, ScrollView, ActivityIndicator } from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const App = () => {

  //Definimos el state para guardar la moneda 
  const [moneda, guardarMoneda] = useState('');
  //Definimos el state para guardar la criptomoneda 
  const [criptomoneda, guardarCriptomoneda] = useState('');
  //Definimos el state para habilitar o no la cotizacion
  const [consultarAPI, guardarConsultarAPI] = useState(false);
  //resultado de la cotizacion de la criptomoneda, usado en Cotizacion
  const [resultado, guardarResultado] = useState({});
  //para visualizar o no el spinner
  const [cargando, guardarCargando] = useState(false);

  useEffect( () => {

    const cotizarCriptomonedas = async () => {
        // evitamos la ejecución la primera vez, ya que no hay cambios si moneda esta vacia
        //if(moneda === '') return;

        if(consultarAPI){
          // consultar la api para obtener las criptomonedas
          const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

          const resultado = await axios.get(url); //funciona tambien sin get (por defecto implementa get)
          //console.log(resultado.data.DISPLAY[criptomoneda][moneda]);

          //Actualizamos el state con el valor de la criptomoneda seleccionada
          //guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

          //guardarConsultarAPI(false);

          //mostrar el spinner
          guardarCargando(true);

          //ocultar el spinner y mostrar el resultado luego de 3 segundos
          setTimeout(() => {

            //guardar cotizacion
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);

            //Actualizamos el state para deshabilitar la cotizacion
            guardarConsultarAPI(false);

            //cambiar el estado de cargando
            guardarCargando(false);

          }, 3000);
        }          
    }

    cotizarCriptomonedas();

  }, [consultarAPI]);

    // Mostrar spinner o resultado (carga condicional de componente en un intervalo de tiempo)
    const componente = cargando ? <ActivityIndicator size='large' color='red'/> :  <Cotizacion  resultado={resultado} />

  return (

    <ScrollView>

      <Header />
      
      <Image style={styles.imagen}
        source={ require('./assets/img/cryptomonedas.png') }
      />

      <View style={styles.contenido}> 
        <Formulario 
          moneda={moneda}
          criptomoneda={criptomoneda}
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
          guardarConsultarAPI={guardarConsultarAPI}
        />
      </View>

      <View style={ { marginTop: 40 } }>
        { componente }        
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
