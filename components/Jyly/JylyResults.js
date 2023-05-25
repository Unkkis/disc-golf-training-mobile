import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Styles from '../../Styles';
import { Button, Text } from '@rneui/themed';
import PointsTable, { StatsTable } from './Table';
import * as SQLite from 'expo-sqlite';
import ShareStats from '../Share';

const db = SQLite.openDatabase('discgolfdb.db');

export default function JylyResults( {navigation, route}) {

  const [ stats, setStats ] = useState({})

  const calculate_stats = () => {
    let newStats = {
      5: {in: 0, total: 0},
      6: {in: 0, total: 0},
      7: {in: 0, total: 0},
      8: {in: 0, total: 0},
      9: {in: 0, total: 0},
      10: {in: 0, total: 0},
    }
    throws = route.params.throws
    for (let i = 0; i < throws.length; i++) {
      const from = throws[i][1]
      const howManyIn = throws[i][2]
      const total = 5
      newStats[from]["in"] += howManyIn
      newStats[from]["total"] += total
    }
    return newStats
  }

  useEffect(() => {
    setStats(calculate_stats())
    db.transaction(tx => {
      tx.executeSql('create table if not exists stats (id integer primary key not null, points integer, infrom5 integer, totalfrom5 integer, infrom6 integer, totalfrom6 integer, infrom7 integer, totalfrom7 integer,  infrom8 integer, totalfrom8 integer, infrom9 integer, totalfrom9 integer, infrom10 integer, totalfrom10 integer);');
    }, (error) => {console.log("Error creating database", error)}, null); 
  }, [])

  const saveStats = () => {
    const currentdate = new Date()
    console.log(currentdate)
    db.transaction(tx => {
        tx.executeSql('insert into stats (points, infrom5, totalfrom5, infrom6, totalfrom6, infrom7, totalfrom7, infrom8, totalfrom8, infrom9, totalfrom9, infrom10, totalfrom10) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', [route.params.points, stats[5]["in"], stats[5]["total"], stats[6]["in"], stats[6]["total"], stats[7]["in"], stats[7]["total"], stats[8]["in"], stats[8]["total"], stats[9]["in"], stats[9]["total"], stats[10]["in"], stats[10]["total"]]);   
      }, (error) => {console.log("Error inserting to database", error)}, console.log('Stats saved to database'));
    
  }
  

  const go_home_pressed = () =>{
    navigation.navigate('Home')
    saveStats()
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
        <ShareStats message={`I just played a round of JYLY and got ${route.params.points} points!!`}/>
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
    flex: 10,
  },
  statsContainer: {
    flex: 5,
  },
  buttonContainer: {
    flex: 3,
  },



});