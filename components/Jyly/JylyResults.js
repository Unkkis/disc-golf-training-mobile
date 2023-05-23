import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../../Styles';
import { Button, Text } from '@rneui/themed';
import PointsTable, { StatsTable } from './Table';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('discgolfdb.db');

export default function JylyResults( {navigation, route}) {

  const [ stats, setStats ] = useState({})

  const calculate_stats = () => {
    let newStats = {
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    }
    throws = route.params.throws
    for (let i = 0; i < throws.length; i++) {
      const from = throws[i][1]
      const how_many = throws[i][2]
      newStats[from] += how_many
    }
    return newStats
  }

  useEffect(() => {
    setStats(calculate_stats())
    db.transaction(tx => {
      tx.executeSql('create table if not exists stats (id integer primary key not null, points integer, from5 integer, from6 integer, from7 integer, from8 integer, from9 integer, from10 integer);');
    }, null, null); 
  }, [])

  const saveStats = () => {
    const currentdate = new Date()
    console.log(currentdate)
    db.transaction(tx => {
        tx.executeSql('insert into stats (points, from5, from6, from7, from8, from9, from10) values (?, ?, ?, ?, ?, ?, ?);', [route.params.points, stats[5], stats[6], stats[7], stats[8], stats[9], stats[10]]);   
      }, null, console.log('Stats saved to database'));
    
  }
  

  const go_home_pressed = () =>{
    navigation.navigate('Home')
    saveStats()
    db.transaction(tx => {
      tx.executeSql('select * from stats;', [], (_, { rows }) =>
        console.log(rows._array)
      );
    }, null, null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.resultsContainer}>
        <Text h3>Total points this round: {route.params.points}</Text>
        <PointsTable throws= {route.params.throws}/>
      </View>
      <View style={styles.statsContainer}>
          <Text h3>Round stats:</Text>
          <StatsTable stats= {stats} />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
              title= "Go home"
              onPress={() => go_home_pressed()}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  resultsContainer: {
    flex: 6,
  },
  statsContainer: {
    flex: 3,
  },
  buttonContainer: {
    flex: 1,
  },
  button: {
      borderRadius: 10,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      backgroundColor: '#2196F3',
      overflow: 'hidden',
    },


});