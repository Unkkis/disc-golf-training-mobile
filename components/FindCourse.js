import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_URL, API_KEY, API_URL2 } from '@env';
import * as Location from 'expo-location';

export default function App() {
  const [ address, setAddress ] = useState('');
  const [ coordinates, setCoordinates ] = useState({
    latitude: 60.200692,
    longitude: 24.934302});
  const [ region, setRegion ] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.322,
    longitudeDelta: 0.221,
  });
  const [ markerVisibility, setMarkerVisibility] = useState(false);
  const [ results, setResults ] = useState([]);

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
      latitudeDelta: 0.0215,
      longitudeDelta: 0.0148,
    })
  })()}, []);

  const getCoursesWitLocation = () => {
    fetch(`${API_URL2}?location=${region.latitude}%2C${region.longitude}&radius=20000&keyword=disc%20golf&key=${API_KEY}`)
    .then(response => response.json())
    .then((result) => {
      setResults(result.results)
      setCoordinates({
        'latitude': result.results[0].geometry.location.lat, 
        'longitude': result.results[0].geometry.location.lng
      })
      setRegion({
        'latitude': result.results[0].geometry.location.lat,
        'longitude': result.results[0].geometry.location.lng,
        latitudeDelta: 0.322,
        longitudeDelta: 0.221,
       })
    })
    .then(setMarkerVisibility(true))
    .catch(error => console.log('error', error))
    ;
  }

  const getCourseswithAddress = () => {
    fetch(`${API_URL}?query=disc%20golf%20in%20${address}&key=${API_KEY}`)
    .then(response => response.json())
    .then((result) => {
      setResults(result.results)
      setCoordinates({
        'latitude': result.results[0].geometry.location.lat, 
        'longitude': result.results[0].geometry.location.lng
      })
      setRegion({
        'latitude': result.results[0].geometry.location.lat,
        'longitude': result.results[0].geometry.location.lng,
        latitudeDelta: 0.322,
        longitudeDelta: 0.221,
       })
    })
    .then(setMarkerVisibility(true))
    .catch(error => console.log('error', error))
    ;
  }

  const findButtonPressed = () => {
    if (address == ''){
      console.log("ei osoitetta")
      getCoursesWitLocation();
    }
    else{
    getCourseswithAddress();
    }
  }


  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView style={styles.map}
        region={ region }
        provider={PROVIDER_GOOGLE}
      >
        {markerVisibility ? (
          results.map((result, index) => (      
          <Marker
            key={index}
            coordinate={{latitude: result.geometry.location.lat, longitude : result.geometry.location.lng}}
            title={result.name}
            description={result.formatted_address} />
          ))
          ) : (<></>)}
      </MapView>
      <View style={styles.overlay} >
        <TextInput style={{ }}
          onChangeText={text=> setAddress(text)} 
          value={address}
          placeholder='Click "show" for current location or enter another address'
        />
      <Button style={{}}
        title='SHOW'
        onPress={findButtonPressed}
        />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 10,
    left: 30,
    backgroundColor: '#E0E0E0'
  },
  textinput: {
    backgroundColor: 'grey',
    height: 20,
  }
});