
import { StyleSheet, View, FlatList } from 'react-native';
import { Button, Text } from '@rneui/themed';
import { CustomHeader } from './Misc';
import { StatsTable } from './Jyly/Table';
import * as SQLite from 'expo-sqlite';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ShareStats from './Share';

const db = SQLite.openDatabase('discgolfdb.db');

export default function Statistics() {
  const [ allStats, setAllStats ] = useState([]);
  const [ rounds, setRounds ] = useState();
  const [ stats, setStats ] = useState([]);
  const [ topPoints, setTopPoints ] = useState([ ]);

  useEffect(() => {
    readDatabase();
  }, []);

  //to update page when navigating to page
  useFocusEffect(
    React.useCallback(() => {
      readDatabase();
      return () => {
      };
    }, [])
  );

  useEffect(() => {
    updateStats()
    updateTopPoints();
  }, [allStats]);

  const readDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists stats (id integer primary key not null, points integer, infrom5 integer, totalfrom5 integer, infrom6 integer, totalfrom6 integer, infrom7 integer, totalfrom7 integer,  infrom8 integer, totalfrom8 integer, infrom9 integer, totalfrom9 integer, infrom10 integer, totalfrom10 integer);');
      tx.executeSql('select * from stats;', [], (_, { rows }) =>
        setAllStats(rows._array)
      );
    }, (error) => {console.log("error", error)}, null);
    setRounds(allStats.length);

  }

  //in case database wipe button is needed or for testing
  const clearStatsDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('drop table if exists stats');
    }, null, console.log('Stats cleared from database'));
  }

  // forming data so table component accepts it.
  const updateStats = () => {
    let newStats = {
      5: {in: 0, total: 0},
      6: {in: 0, total: 0},
      7: {in: 0, total: 0},
      8: {in: 0, total: 0},
      9: {in: 0, total: 0},
      10: {in: 0, total: 0},
    }
    for (let i = 0; i < allStats.length; i++) {
      newStats[5]["in"] += allStats[i]['infrom5']
      newStats[5]["total"] += allStats[i]['totalfrom5']
      newStats[6]["in"] += allStats[i]['infrom6']
      newStats[6]["total"] += allStats[i]['totalfrom6']
      newStats[7]["in"] += allStats[i]['infrom7']
      newStats[7]["total"] += allStats[i]['totalfrom7']
      newStats[8]["in"] += allStats[i]['infrom8']
      newStats[8]["total"] += allStats[i]['totalfrom8']
      newStats[9]["in"] += allStats[i]['infrom9']
      newStats[9]["total"] += allStats[i]['totalfrom9']
      newStats[10]["in"] += allStats[i]['infrom10']
      newStats[10]["total"] += allStats[i]['totalfrom10']
    }
    setStats(newStats)
    setRounds(allStats.length);
    console.log('Stats updated');
  }

  // calculating top5 round scores
  const updateTopPoints = () => {
    const points = allStats.map((round) => round['points'])
    points.sort(function(a, b){return b-a}); 
    setTopPoints(points.slice(0,5))
  }

  
  
  return (
    <View style= {styles.container}>
      <CustomHeader />
      <View style={{flex: 5}}>
        <Text h2>JYLY statistics</Text>
        <Text h4>Rounds played: {rounds}</Text>
        <Text h4>Stats from all rounds:</Text>
        <StatsTable stats= {stats} />
        
      </View>
      <View style={{flex: 5}}>
        <Text h4>Top5 round scores: </Text>
        <FlatList  
            data={topPoints}
            renderItem={({ item, index }) =>
           
            <Text h4>{index+1}: {item}</Text>
    
        }
      />

      </View>
      <ShareStats message={`Hi. My best JYLY score is ${topPoints[0]}. What is yours?`}/>
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