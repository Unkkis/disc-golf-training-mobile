import React, { useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Mapview, { Marker, Polyline } from 'react-native-maps';
import { Button, Text } from '@rneui/themed';
import { getDistance } from 'geolib';

//https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8
//https://github.com/vikrantnegi/react-native-location-tracking

export default function Measure() {
  const [location, setLocation ] = useState(null);
  const [ region, setRegion ] = useState([]);
  const [ markerVisible, setMarkerVisible ] = useState(false);
  const [ endMarkerVisible, setEndMarkerVisible ] = useState(false);
  const [ startVisible, setStartVisible ] = useState(true);
  const [ startLocation, setStartLocation ] = useState();
  const [ endLocation, setEndLocation ] = useState();
  const [ shotLength, setShotLength] = useState();


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
      latitudeDelta: 0.000215,
      longitudeDelta: 0.000148,
    })
    setLocation(location.coords)
  })()}, []);

  const startButtonPressed = () =>{
    setStartVisible(false);
    setShotLength(0);
    setEndMarkerVisible(false);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
      }
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setStartLocation(location);
      setLocation(location.coords)
      setMarkerVisible(true);
      })();

  }

  const endButtonPressed = () =>{
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
      }
      let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setEndLocation(location);
      const length = getDistance(
        { latitude: startLocation.coords.latitude, longitude: startLocation.coords.longitude },
        { latitude: endLocation.coords.latitude, longitude: endLocation.coords.longitude }
      );
      setShotLength(length);
      setStartVisible(true);
      setEndMarkerVisible(true);
      })();
  }

  


  return (
    <View style={styles.container}>
        <Mapview style={styles.map}
          region = { region }
          mapType='hybrid'
        >
          {markerVisible ? (
          <Marker
          image={require("../assets/tee.jpg")} 
          coordinate={{latitude: startLocation.coords.latitude, longitude: startLocation.coords.longitude }}
          />) : (<></>)}
          {endMarkerVisible ? (  
            <>      
          <Marker
          image={require("../assets/kori.jpg")}
          pinColor='green'
          coordinate={{latitude: endLocation.coords.latitude, longitude: endLocation.coords.longitude }}
          />
          <Polyline
          coordinates = {[
            { latitude: startLocation.coords.latitude, longitude: startLocation.coords.longitude },
            { latitude: endLocation.coords.latitude, longitude: endLocation.coords.longitude }
          ]}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
          />
          </>  
          ) : (<></>)}
        </Mapview>
        <View style={styles.overlay}>
          <TouchableOpacity >
            <Text h4>Your shot was: {shotLength}m</Text>
          </TouchableOpacity>
          {startVisible ? 
          <Button 
            title="Start"
            onPress={() => startButtonPressed()}
            style={{position: "absolute", bottom: 50}}
            />
            : 
            <Button 
            title="End"
            onPress={() => endButtonPressed()}
            style={{position: "absolute", bottom: 50}}
            />
          }
        </View>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%'
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(1, 255, 255, 1)',
  },
});