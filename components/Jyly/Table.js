// This component from:
//https://www.npmjs.com/package/react-native-table-component

import React, { Component, useState, useEffect} from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

LogBox.ignoreLogs(['Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.']);

export default function PointsTable(props) {
    const [points, setPoints] =  useState({
      tableHead: ['Round', 'From', 'In basket', 'Points'],
      tableData: [
        [],

      ]
    })
    
    
    useEffect(()=>{
        setPoints({...points, tableData: props.throws});
    }, [props])

    


    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={points.tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={points.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={points.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
    )
    
}

export function StatsTable(props) {
  const [stats, setStats] =  useState({

    tableHead: ['Distance', 'How many in', 'Total shots', '% in'],
    tableData: [
      [],

    ]
  })
  
  useEffect(()=>{
    let stats_array = []
    for (const from in props.stats){
      stats_array.push([`${from} m`, props.stats[from]["in"], props.stats[from]["total"], `${((props.stats[from]["in"]/props.stats[from]["total"])*100).toFixed()} %` ])
    }
    setStats({...stats, tableData: stats_array})
  }, [props])



  return (
    <View style={styles.container}>
      <Table borderStyle={{borderWidth: 1}}>
        <Row data={stats.tableHead} flexArr={[1, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data={stats.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
          <Rows data={stats.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
  )
  
}



const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 10, backgroundColor: '#fff' },
  head: {  height: 30,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 18  },
  text: { textAlign: 'center' }
});