import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Styles from '../Styles'
import { CustomHeader } from './Misc';


export default function FindCourse() {


  return (
    <View>
      <CustomHeader />
        <Text>Find disc golf course</Text>
    </View>
  );
}