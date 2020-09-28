import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Cotizacion = ( { resultado } ) => {

  // si el objeto llega vacio no se ejecuta nada
  if ( Object.keys(resultado).length === 0 ) return null;

  return (
    <View style={styles.resultado}>
      <Text style={ [styles.texto, styles.precio] }>
        <Text style={styles.span}>{resultado.PRICE}</Text>
      </Text>
      <Text style={styles.texto}>Precio mas alto del dia:{' '}
        <Text style={styles.span}>{resultado.HIGHDAY}</Text>
      </Text>
      <Text style={styles.texto}>Precio mas bajo del dia:{' '}
        <Text style={styles.span}>{resultado.LOWDAY}</Text>
      </Text>
      <Text style={styles.texto}>Variacion ultima 24 hs:{' '}
        <Text style={styles.span}>{resultado.CHANGEPCT24HOUR}</Text>
      </Text>
      <Text style={styles.texto}>Ultima actualizacion:{' '}      
        <Text style={styles.span}>{resultado.LASTUPDATE}</Text>
      </Text>    
    </View>
  );
};

const styles = StyleSheet.create({
  resultado: {
    backgroundColor: '#5E49E2',
    padding: 20
  },
  texto: {
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    marginBottom: 10    
  },
  precio: {
    fontSize: 38,
  },
  span: {
    fontFamily: 'Lato-Black'
  }
});

export default Cotizacion;