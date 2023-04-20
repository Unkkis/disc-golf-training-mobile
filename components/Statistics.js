import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../Styles'
import { CustomHeader } from './Misc';


export default function Statistics() {


  return (
    <View>
      <CustomHeader />
        <Text>Statistics page</Text>
    </View>
  );
}