import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { API_URL, API_KEY } from '@env';

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
      latitudeDelta: 0.000215,
      longitudeDelta: 0.000148,
    })
    setLocation(location.coords)
  })()}, []);

  const getCoordinates = () => {
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

  const findAddress = () => {
    getCoordinates();
  }


  return (
    <View style={StyleSheet.absoluteFillObject}>
      <MapView style={styles.map}
        region={ region }
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
      <View style={styles.container} >
        <TextInput style={{ flex: 2}}
          onChangeText={text=> setAddress(text)} 
          value={address}
          placeholder="Enter address to find nearest Disc Golf establishments"
        />
      <Button style={{ flex: 2 }}
        title='SHOW'
        onPress={findAddress}
        />

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    height: '90%',
  },
});