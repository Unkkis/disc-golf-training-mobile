import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/TabNavigator';
import { HomeStackNavigator } from './navigation/StackNavigator';
import JylyButtons from './components/Jyly/JylyButtons';
import { useEffect, useState } from 'react';
import { UserContext, UserDialogContext } from './UserContext';
import * as SQLite from 'expo-sqlite';
import { Dialog } from '@rneui/themed';
import Users from './Users';

const db = SQLite.openDatabase('discgolfdb.db');

// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {
  //for user selection and change
  const [ user, setUser ] = useState({user: {}});
  const value = { user, setUser };
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists users (id integer primary key not null, username text, name text, loggedin boolean);');
    }, null, updateList);
  }, [visible]);

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from users where loggedin=1;', [], (_, { rows }) =>
      setUser({user:{username: rows._array[0].username, name: rows._array[0].name}})
      );
    }, null, null);

  }

  const toggleUserDialog = () => {
    setVisible(!visible);
  };

  return (
    <UserContext.Provider value={value}>
      <UserDialogContext.Provider value={setVisible}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
      <Dialog
        isVisible={visible}
        onBackdropPress={toggleUserDialog}

      >            
      <Dialog.Title title="Choose user"/>
      <Users />

        
      </Dialog>
      </UserDialogContext.Provider>
    </UserContext.Provider>
  );
}


