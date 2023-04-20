import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../Styles'
import { CustomHeader } from './Misc';


export default function Discs() {


  return (
    <View>
      <CustomHeader />
        <Text>Discs in this page</Text>
    </View>
  );
}