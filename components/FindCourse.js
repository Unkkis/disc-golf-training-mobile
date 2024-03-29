
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from '@rneui/themed';
import React, { useState, useEffect } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { API_URL, API_KEY, API_URL2 } from '@env';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

export default function App() {
  const [ address, setAddress ] = useState('');
  const [ region, setRegion ] = useState();
  const [ markerVisibility, setMarkerVisibility] = useState(false);
  const [ results, setResults ] = useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  //https://reactnavigation.org/docs/use-focus-effect/
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        getCurrentLocation();
      };
    }, [])
  );

  const getCurrentLocation = () => {
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
    })()
  }

  const getCoursesWitLocation = () => {
    fetch(`${API_URL2}?location=${region.latitude}%2C${region.longitude}&radius=20000&keyword=disc%20golf&key=${API_KEY}`)
    .then(response => response.json())
    .then((result) => {
      setResults(result.results)
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
    <View style={styles.container}>
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
        <TextInput style={styles.textinput}
          onChangeText={text=> setAddress(text)} 
          value={address}
          placeholder='Click "show" to use current location or type address here'
        />
      <Button 
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
    ...StyleSheet.absoluteFillObject,
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  },
  textinput: {
    backgroundColor: '#E0E0E0',
    height: 20,
  }
});