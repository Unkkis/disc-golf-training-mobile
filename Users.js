import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Dialog } from '@rneui/themed';

const db = SQLite.openDatabase('coursedb.db');

export default function Users() {
    const [ currentUser, setCurrentUser ] = useState({user: {}});
    const [ users, setUsers ] = useState([])

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists users (id integer primary key not null, username text, name text, loggedin boolean);');
    }, null, updateList); 
  }, []);

  // Save course
  const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql('insert into course (credits, title) values (?, ?);', [parseInt(credit), title]);    
      }, null, updateList
    )
  }

  // Update courselist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from course;', [], (_, { rows }) =>
        setCourses(rows._array)
      ); 
    });
  }

  // Delete course
  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from course where id = ?;`, [id]);
      }, null, updateList
    )    
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
        <View>
            <Text>Tekstiä Dialogista</Text>
        </View>
  );
}
const styles = StyleSheet.create({
    container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
    },
    listcontainer: {
     flexDirection: 'row',
     backgroundColor: '#fff',
     alignItems: 'center'
    },
   });