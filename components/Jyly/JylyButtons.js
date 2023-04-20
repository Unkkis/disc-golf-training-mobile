import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Styles from '../../Styles'
import { Button, Text } from '@rneui/themed';


export default function Jyly( {navigation} ) {
  const [ points, setPoints ] = useState(0);
  const [ where, setWhere ] = useState(10);
  const [round, setRound ] = useState(1);

  const addPoints = (value) => {
    let rounds = round
    console.log(value)
   /* switch (value){
      case 0:
        setPoints(points+value);
        setRound(rounds+1)
        setWhere(5);
        break;
      case 1:
        setPoints(points+value)
        setRound(rounds+1)
        setWhere(6)
        break;
    }
    if (rounds >= 20){
      navigation.navigate('JylyResults', {points});
    }*/
  }

  return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => addPoints(0)}>
          <Text style={styles.bottomButtons}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPoints(1)}>
          <Text style={styles.bottomButtons}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPoints(2)}>
          <Text style={styles.bottomButtons}>2</Text>
        </TouchableOpacity>      
    </View>

  );
}



const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        paddingTop: 40,
        backgroundColor: '#ddd',
    },
    button: {
        flex:1,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        backgroundColor: '#2196F3'
      },
    bottomButtons: {
        backgroundColor: 'blue',
        padding: 20,
        color: 'white'
    },    
    bottomButtons2: {
        backgroundColor: 'violet',
        padding: 20,
        flex: 1
    },
    bottomButtons3: {
        backgroundColor: 'coral',
        padding: 30,
        flex: 1
    },

});