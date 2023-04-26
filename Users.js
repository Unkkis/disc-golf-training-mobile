import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Keyboard } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Dialog, ListItem } from '@rneui/themed';
import { UserDialogContext } from './UserContext';



export default function Users() {
    const db = SQLite.openDatabase('discgolfdb.db');
    const userDialogContext = React.useContext(UserDialogContext);

    const [ users, setUsers ] = useState([])
    const [ username, setUsername ] = useState("");
    const [ name, setName ] = useState("");
    const [ expanded, setExpanded ] = useState(true);
    const [ showNewUser, setShowNewUser ] =useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists users (id integer primary key not null, username text, name text, loggedin boolean);');
    }, null, updateList); 
  }, []);

  // Save user
  const saveUser = () => {
    db.transaction(tx => {
        tx.executeSql('insert into users (username, name) values (?, ?);', [username, name]);   
      }, null, updateList);
    
    setUsername('');
    setName('');
    Keyboard.dismiss();
    setShowNewUser(false);
    setExpanded(true);
    console.log("user saved")
  }

  // Update userlist
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from users;', [], (_, { rows }) =>
        setUsers(rows._array)
      );
    }, null, null);
    console.log("Users updated") 
  }

  // Delete course
  const deleteUser = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from users where id = ?;`, [id]);
      }, null, updateList) 
    console.log("Delete painettu")   
  }

  const chooseUser = (id, username, name) => {
    console.log(id + " painettu")
    db.transaction(tx => {
      tx.executeSql('UPDATE users SET loggedin = false;');
      tx.executeSql('UPDATE users SET loggedin = true WHERE id = ?;', [id])
    }, null, updateList)
    userDialogContext(false);
  }



  return(
    <View>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>List Accordion</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
          setShowNewUser(false);
        }}
      >
        {users.map((l, i) => (
          <ListItem key={i} onPress={() => chooseUser(l.id, l.username, l.name)}   bottomDivider>
            <ListItem.Content >
              <ListItem.Title>Username: {l.username}</ListItem.Title>
              <ListItem.Subtitle>Logged in: {l.loggedin}</ListItem.Subtitle>
            </ListItem.Content>
            <Button title="Delete" onPress={() => deleteUser(l.id)} />
            <ListItem.Chevron />
          </ListItem>
        ))}
      </ListItem.Accordion>
      <ListItem.Accordion 
        content= {
          <ListItem.Content>
            <ListItem.Title>Add new user</ListItem.Title>
          </ListItem.Content>
        } 
        isExpanded={showNewUser}
        onPress={() => {
          setShowNewUser(!showNewUser);
          setExpanded(false);
        }}
        title="Add User">  
   
        <ListItem>
          <View> 
            <TextInput placeholder='Username' style={{marginTop: 10, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(username) => setUsername(username)}
            value={username}/> 
            <TextInput placeholder='Full name' style={{marginTop: 10, marginBottom: 10, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => setName(name)}
            value={name}/>
            <Button title="Add new user" onPress={saveUser} />
      
          </View> 
        </ListItem>

          </ListItem.Accordion>

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