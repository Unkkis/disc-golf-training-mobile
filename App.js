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

const openDatabase = () =>{
  const database = SQLite.openDatabase('discgolfdb.db');
  return database
}
// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {
  const [ currentUser, setCurrentUser ] = useState({user: {}});
  const [visible, setVisible] = useState(false);
  const [ users, setUsers ] = useState([]);

 /* const [ users, setUsers ] = useState([])*/

  useEffect(() => {
    db = openDatabase()
    db.transaction(tx => {
      tx.executeSql('select * from users where loggedin=1;', [], (_, { rows }) =>
      setUsers(rows._array)
      );
    }, null, null);
    
    
  }, [console.log("App sivun: ", users)]);

  const toggleUserDialog = () => {
    setVisible(!visible);
  };

  return (
    <UserContext.Provider value={currentUser}>
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


