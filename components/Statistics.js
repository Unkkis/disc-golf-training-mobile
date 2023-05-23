import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import Styles from '../Styles'
import { CustomHeader } from './Misc';
import PointsTable, { StatsTable } from './Jyly/Table';
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

const db = SQLite.openDatabase('discgolfdb.db');

export default function Statistics() {
  const [ allStats, setAllStats ] = useState([]);
  const [ rounds, setRounds ] = useState();
  const [ stats, setStats ] = useState([]);

  useEffect(() => {
    updateAllStats();
  }, []);
  
  const updateAllStats = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists stats (id integer primary key not null, points integer, from5 integer, from6 integer, from7 integer, from8 integer, from9 integer, from10 integer);');
      tx.executeSql('select * from stats;', [], (_, { rows }) =>
        setAllStats(rows._array)
      );
    }, null, updateStats());
    setRounds(allStats.length);
    console.log('Stats updated');
    console.log(allStats);
  }

  const clearStatsDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('drop table if exists stats');
    }, null, console.log('Stats cleared from database'));
  }

  const updateStats = () => {
    let newStats = {
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    }
    for (let i = 0; i < allStats.length; i++) {
      newStats[5] += allStats[i]['from5']
      newStats[6] += allStats[i]['from6']
      newStats[7] += allStats[i]['from7']
      newStats[8] += allStats[i]['from8']
      newStats[9] += allStats[i]['from9']
      newStats[10] += allStats[i]['from10']
    }
    setStats(newStats)
    setRounds(allStats.length);
    console.log('Stats updated');
    console.log(allStats);
  }

  
  return (
    <View style= {styles.container}>
      <CustomHeader />
      <View style={{flex: 6}}>
        <Text h4>Rounds played: {rounds}</Text>
        <StatsTable stats= {stats} />
        <Text h4>Top points: </Text>
      </View>
      <View style={{flex: 2}}>
        <Button 
              title= "Update stats"
              onPress={() => updateStats()}
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