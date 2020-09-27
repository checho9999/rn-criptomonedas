import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker'

const Formulario = () => {

  //Definimos el state para guardar las monedas 
  const [moneda, guardarMoneda] = useState('');

  //Actualizamos el state con el valor de la moneda seleccionada
  const obtenerMoneda = moneda => {
      //console.log(moneda);
      guardarMoneda(moneda);
  }
    
  return (
    <View>
        <Text style={styles.label}>Moneda</Text>

        <Picker
            onValueChange={ moneda => obtenerMoneda(moneda) }
        >
            <Picker.Item label='- Seleccione -' value='' />
            <Picker.Item label='Dolar Estadounidense' value='USD' />
            <Picker.Item label='Peso Mexicano' value='MXN' />
            <Picker.Item label='Euro' value='EUR' />
            <Picker.Item label='Libra Esterlina' value='GBP' />
        </Picker>

        <Text style={styles.label}>Criptomoneda</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    }
});

export default Formulario;