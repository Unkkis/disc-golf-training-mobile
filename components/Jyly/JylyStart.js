import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, ListItem, Text } from '@rneui/themed';





export default function JylyStart( {navigation} ) {


  return (
    <View style={styles.container}>
        
        <View style={{ flex: 9, alignItems: 'center' }}>
        <Text>JYLY game</Text>
            <View style={{ flex: 2, alignItems: 'center'}}>
            <Text>So, are you ready to start?</Text>
            <Button
                title="Start game"
                buttonStyle={{
                    borderColor: 'black',
                    borderRadius: 30
                }}
                containerStyle={{
                    width: 300
                }}
                titleStyle={{ fontWeight: 'bold' }}
                onPress={() => navigation.navigate('JylyGame')}
            />
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#fff',
      justifyContent: 'space-evenly'
    },
  });