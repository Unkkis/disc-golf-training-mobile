import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from './Styles';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/TabNavigator';
import { HomeStackNavigator } from './navigation/StackNavigator';
import JylyButtons from './components/Jyly/JylyButtons';

// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {

  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}


