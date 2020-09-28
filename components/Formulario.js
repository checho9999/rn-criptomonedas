import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Alert } from 'react-native';
import { Picker } from '@react-native-community/picker'
import axios from 'axios';

const Formulario = ( { moneda, criptomoneda, guardarMoneda, guardarCriptomoneda, guardarConsultarAPI } ) => {

  //Definimos el state para obtener y guardar la lista de criptomonedas 
  const [criptomonedas, guardarCriptomonedas] = useState([]);

  useEffect( () => {

    const obtenerCriptomonedas = async () => {

        // consultar la api para obtener las criptomonedas
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

        const resultado = await axios.get(url); //funciona tambien sin get (por defecto implementa get)
        console.log(resultado.data.Data);

        //Actualizamos el state con el valor de la criptomoneda seleccionada
        guardarCriptomonedas(resultado.data.Data);
        //console.log(resultado.data.Data);
    }

    obtenerCriptomonedas();

  }, []);

  //Actualizamos el state con el valor de la moneda seleccionada
  const obtenerMoneda = moneda => {
      //console.log(moneda);
      guardarMoneda(moneda);
  }

  //Actualizamos el state con el valor de la criptomoneda seleccionada
  const obtenerCriptomoneda = cripto => {
    //console.log(moneda);
    guardarCriptomoneda(cripto);
}

  //Habilitamos o no la cotizacion en base a los datos ingresados por el usuario
  const cotizarPrecio = () => {
    //Validamos que los datos ingresados por el usuario sean correctos  
    if (moneda.trim() === '' || criptomoneda.trim() === ''){
        mostrarAlerta();
        return;
    }

    //Actualizamos el state para habilitar la cotizacion
    //console.log('Cotizando...');  
    guardarConsultarAPI(true);
    
  }

  //Mostramos una alerta para el caso de los datos ingresados por el usuario no sean validos
   const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios',
            [
                { text: 'OK' }
            ]
        )

    }

  return (
    <View>
        <Text style={styles.label}>Moneda</Text>

        <Picker
            itemStyle={ {height: 120} }
            selectedValue={moneda} 
            onValueChange={ moneda => obtenerMoneda(moneda) }         
        >
            <Picker.Item label='- Seleccione -' value='' />
            <Picker.Item label='Dolar Estadounidense' value='USD' />
            <Picker.Item label='Peso Mexicano' value='MXN' />
            <Picker.Item label='Euro' value='EUR' />
            <Picker.Item label='Libra Esterlina' value='GBP' />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>

        <Picker
            itemStyle={ {height: 120} } 
            selectedValue={criptomoneda}            
            onValueChange={ cripto => obtenerCriptomoneda(cripto) }
        >
            <Picker.Item label='- Seleccione -' value='' />
            { criptomonedas.map( cripto => ( 
                <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} />
            ) ) }
        </Picker>

        <TouchableHighlight style={styles.btnCotizar}
            onPress={ () => cotizarPrecio() }    
        >
            <Text style={styles.textoCotizar}>Cotizar</Text>
        </TouchableHighlight> 

    </View>
  );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20 
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario;