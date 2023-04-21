import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/TabNavigator';
import { HomeStackNavigator } from './navigation/StackNavigator';
import JylyButtons from './components/Jyly/JylyButtons';
import { useEffect, useState } from 'react';
import UserContext from './UserContext';
import * as SQLite from 'expo-sqlite';
import { Dialog } from '@rneui/themed';
import Users from './Users';

const db = SQLite.openDatabase('coursedb.db');

// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {
  const [ currentUser, setCurrentUser ] = useState({user: {}});
  const [visible, setVisible] = useState(false);

 /* const [ users, setUsers ] = useState([])


  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists users (id integer primary key not null, username text, name text, loggedin boolean);');
    }, null, updateList); 
  }, []);*/

  useEffect(() => {
    toggleDialog();
    setCurrentUser({user:{username: "Jussi", name: "Jussi Kosonen"}});
  }, []);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <UserContext.Provider value={currentUser}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
      >            
      <Dialog.Title title="Change users"/>
      <Users />
            <Dialog.Actions>
                <Dialog.Button title="End Game" />
                <Dialog.Button title="Return" />
            </Dialog.Actions>
        
      </Dialog>
    </UserContext.Provider>
  );
}


