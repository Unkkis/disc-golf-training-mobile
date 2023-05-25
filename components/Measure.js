import React, { useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Mapview, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Button, Text } from '@rneui/themed';
import { getDistance } from 'geolib';


//https://medium.com/quick-code/react-native-location-tracking-14ab2c9e2db8
//https://github.com/vikrantnegi/react-native-location-tracking

let foregroundSubscription = null

export default function Measure() {
  const [ location, setLocation ] = useState(null);
  const [ region, setRegion ] = useState([]);
  const [ markerVisible, setMarkerVisible ] = useState(false);
  const [ currentRouteMarkerVisible, setcurrentRouteMarkerVisible ] = useState(false);
  const [ endMarkerVisible, setEndMarkerVisible ] = useState(false);
  const [ startLocation, setStartLocation ] = useState();
  const [ endLocation, setEndLocation ] = useState();
  const [ shotLength, setShotLength] = useState();
  const [buttonTitle, setButtonTitle ] = useState("Start GPS")
  const [ accuracy, setAccuracy ] = useState();
  const [ lengthVisible, setLengthVisible ] = useState(false);
  const [ accuracyVisible, setAccuracyVisible ] = useState(false);

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
      latitudeDelta: 0.00215,
      longitudeDelta: 0.00148,
    })
    setLocation(location.coords)
  })()}, []);

  useEffect(() => {
    if (!(startLocation == null)){
    //update length
    const currentLength = getDistance(
      { latitude: startLocation.latitude, longitude: startLocation.longitude },
      { latitude: location.latitude, longitude: location.longitude }
    );
    setShotLength(currentLength);
    console.log("Shot length updated")
    }
  }, [location]);

  // Start location tracking in foreground
  const startForegroundUpdate = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove()

    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.BestForNavigation,
      },
      position => {
        setLocation(position.coords);
        setEndLocation(position.coords);    
        setRegion({
          'latitude': position.coords.latitude,
          'longitude': position.coords.longitude,
          latitudeDelta: 0.00215,
          longitudeDelta: 0.00148,
        })
        setAccuracy((position.coords.accuracy).toFixed())
      }
    )
  }

    // Stop location tracking in foreground
    const stopForegroundUpdate = () => {
      foregroundSubscription?.remove()
    }
  const buttonPressed = (title) => {
    switch (title) {
      case "Start GPS":
        setLengthVisible(false);
        setShotLength(0);
        startForegroundUpdate(); //start getting GPS info
        setMarkerVisible(true);
        setEndMarkerVisible(false);
        setAccuracyVisible(true);

        setButtonTitle("Set Start")
        break;
      case "Set Start":
        setStartLocation(location)
        setcurrentRouteMarkerVisible(true);
        setLengthVisible(true);

        setButtonTitle("End")
        break;
      case "End":
        if (currentRouteMarkerVisible == true){
          setcurrentRouteMarkerVisible(false);
        }
        stopForegroundUpdate();
        const length = getDistance(
          { latitude: startLocation.latitude, longitude: startLocation.longitude },
          { latitude: endLocation.latitude, longitude: endLocation.longitude }
        );
        setShotLength(length);
        
        setEndMarkerVisible(true);
        setAccuracyVisible(false);
        setButtonTitle("Start GPS")
        break;
    }

    
  }
 


  return (
    <View style={styles.container}>
        <Mapview style={styles.map}
          region = { region }
          mapType='hybrid'
          provider={PROVIDER_GOOGLE}
        >
          {markerVisible ? (
          <>
          <Marker
          image={require("../assets/tee.jpg")} 
          coordinate={{latitude: location.latitude, longitude: location.longitude }}
          />
          </>
          ) : (<></>)}
          {currentRouteMarkerVisible ? (  
            <>  
          <Marker
          image={require("../assets/tee.jpg")} 
          coordinate={{latitude: startLocation.latitude, longitude: startLocation.longitude }}
          />
          <Marker
          image={require("../assets/kori.jpg")}
          pinColor='green'
          coordinate={{latitude: location.latitude, longitude: location.longitude }}
          />
          <Polyline
          coordinates = {[
            { latitude: startLocation.latitude, longitude: startLocation.longitude },
            { latitude: location.latitude, longitude: location.longitude }
          ]}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
          />
          </>  
          ) : (<></>)}
          {endMarkerVisible ? (  
            <>  
          <Marker
          image={require("../assets/tee.jpg")} 
          coordinate={{latitude: startLocation.latitude, longitude: startLocation.longitude }}
          />
          <Marker
          image={require("../assets/kori.jpg")}
          pinColor='green'
          coordinate={{latitude: endLocation.latitude, longitude: endLocation.longitude }}
          />
          <Polyline
          coordinates = {[
            { latitude: startLocation.latitude, longitude: startLocation.longitude },
            { latitude: endLocation.latitude, longitude: endLocation.longitude }
          ]}
          strokeColor={"#000"}
          strokeWidth={3}
          lineDashPattern={[1]}
          />
          </>  
          ) : (<></>)}
        </Mapview>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.textField}>
           {lengthVisible ? (<Text h4>Shot length: {shotLength}m</Text>) : (<></>)} 
           {accuracyVisible? ( <Text h4>Accuracy: {accuracy}</Text>) : (<></>)}
          </TouchableOpacity>
          <Button 
            title={buttonTitle}
            onPress={() => buttonPressed(buttonTitle)}
            style={{position: "absolute", bottom: 50}}
            />
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
  },
  textField: {
    backgroundColor: '#E0E0E0',
  }
});