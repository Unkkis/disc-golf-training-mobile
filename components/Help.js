import { StyleSheet, View } from 'react-native';
import { Text } from "@rneui/themed";



export default function Help() {


  return (
    <View style={styles.container}>
        <Text h2>Help and rules</Text>
        <Text h3>Jyly:</Text>
        <Text style={styles.text}>Jyly is the putting practice game for disgolfers.</Text>
        <Text style={styles.text}>Before starting, you should mark distances from your basket. Add markers to 5 meters, 6m, 7m, 8m, 9m and 10m.</Text>
        <Text style={styles.text}>You start by putting 5 times from 10 meters. How many you get in, decides where you will throw your next 5. If you hit all 5, throw from 10m. If you hit 4, throw from 9m. If you hit 1, throw from 6m. If you hit 0, throw from 5m. </Text>
        <Text style={styles.text}>You get points according to distance and throwins. From 10m you get 10 points, from 9 meters 9 points and so on. 5 meter putts grant you 5 points each.</Text>
        <Text style={styles.text}>Play for 20 rounds, and see how many points you get.</Text>
        <Text style={styles.text}>The app will tell you where to throw and how many points you have gathered.</Text>
        <Text h3>Measure distance:</Text>
        <Text style={styles.text}>First click "Start GPS" when you want GPS tracking to start. You will see your current position and accuracy of the GPS after that.</Text>
        <Text style={styles.text}>When accuracy is at suitable level (as low as possible) press "Set Start". After that, start walking to your disc.</Text>
        <Text style={styles.text}>After you have walked to your disc, check if accuracy is at suitable level and press "End".</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
  },
  text: {
    left: 10,
    right: 10,
    fontSize: 16,
  }

});