import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../../Styles'
import { Button, Text, Dialog } from '@rneui/themed';
import PointsTable from './Table';
import UserContext from '../../UserContext';


export default function Jyly( {navigation} ) {
  const userContext = React.useContext(UserContext);
  const [ points, setPoints ] = useState(0);
  const [ where, setWhere ] = useState(10);
  const [round, setRound ] = useState(0);
  const [throws, setThrows] = useState([]);
  const [visible, setVisible] = useState(false);

  const removePoints = () => {
    if (round > 0) {
      setRound(round-1);
      setWhere(throws[throws.length -1][1])    
      setThrows((throws) => (throws.slice(0, -1)));
    }
  }

  const addPoints = (value) => {

    let rounds = round
    let pisteet = 0;

    switch (value){
      case 0:
        setWhere(5);
        break;
      case 1:
        setWhere(6);
        break;
      case 2:
        setWhere(7);
        break;
      case 3:
        setWhere(8);
        break;
      case 4:
        setWhere(9);
      case 5:
        setWhere(10);
        break;
    }

    pisteet = where * value
  
    rounds += 1;
    setThrows(throws => [...throws,[rounds, where, value, pisteet]] );
    setRound(rounds);
  }

  const endGame = () => {
    navigation.navigate('JylyResults', {points, throws});
  }

  useEffect(() => {
    let kokonaispisteet = 0;
    throws.forEach((round) => {
      kokonaispisteet += round[3];
    })
    setPoints(kokonaispisteet); 
  }, [throws])

  useEffect(()=>{
    if (round >= 20){
      toggleDialog();
    }
}, [round])

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Player: {userContext.user.username}</Text>
        <Text>Total Points: {points}</Text>
        <Text>Now throw from: {where} meters </Text>
        <PointsTable throws= {throws}/>
        
      </View>
      

        <Text>How many went in:</Text>
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
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={() => addPoints(3)}>
          <Text style={styles.bottomButtons}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPoints(4)}>
          <Text style={styles.bottomButtons}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => addPoints(5)}>
          <Text style={styles.bottomButtons}>5</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.button} onPress={() => removePoints()}>
          <Text style={styles.bottomButtons}>Del.</Text>
        </TouchableOpacity> 
      </View>  
      <Dialog
        isVisible={visible}
        onBackdropPress={null}
      >
        <Dialog.Title title="Ending the game"/>
        <Text>If you want to end the game, press end game. If you need to correct score, click Return</Text>
        <Dialog.Actions>
          <Dialog.Button title="End Game" onPress={() => {endGame(); toggleDialog()}}/>
          <Dialog.Button title="Return" onPress={() => {removePoints(); toggleDialog()}}/>
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
      flex:1,
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      backgroundColor: '#2196F3',
      overflow: 'hidden',
    },
  bottomButtons: {
      backgroundColor: 'blue',
      padding: 20,
      color: 'white',
      textAlign: 'center',
  }, 

});