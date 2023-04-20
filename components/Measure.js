import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import Mapview, { Marker } from 'react-native-maps';

//https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8
//https://github.com/vikrantnegi/react-native-location-tracking

export default function Measure() {
  const [location, setLocation ] = useState(null);
  const [ region, setRegion ] = useState([]);

  useEffect(() => {
    (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted' ) {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High} );
    setRegion({
      'latitude': location.coords.latitude,
      'longitude': location.coords.longitude,
      latitudeDelta: 0.0009,
      longitudeDelta: 0.0009,
    })
  })()}, []);


  return (
    <View style={StyleSheet.absoluteFillObject}>
        <Mapview 
          style={{ height:'100%' }}
          region = { region }
        />
    </View>
  );
}