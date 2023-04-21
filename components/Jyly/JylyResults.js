import { StyleSheet, View } from 'react-native';
import React from 'react';
import Styles from '../../Styles';
import { Button, Text } from '@rneui/themed';
import PointsTable from './Table';


export default function JylyResults( {navigation, route}) {

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Jyly results page</Text>
        <Button 
            title= "Go home"
            onPress={() => navigation.navigate('Home')}
        />
        <Text>points: {route.params.points}</Text>
        <PointsTable throws= {route.params.throws}/>
      </View>
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