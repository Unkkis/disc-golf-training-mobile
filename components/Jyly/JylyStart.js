import { StyleSheet, View } from 'react-native';
import React from 'react';
import Styles from '../../Styles'
import { Button, ListItem, Text } from '@rneui/themed';
import UserContext from '../../UserContext';



export default function JylyStart( {navigation} ) {

const userContext = React.useContext(UserContext); 

  return (
    <View style={styles.container}>
        
        <View style={{ flex: 9, alignItems: 'center' }}>
        <Text>JYLY game</Text>
            <View style={{ flex: 8 }}>
                
                
                <View style={{ flex: 1, alignItems: 'center'}}>
                <Text>If you are not {userContext.user.username} you can change user here:</Text>
                    <Button
                        title="Change user"
                        buttonStyle={{
                            borderColor: 'black',
                            borderRadius: 30
                        }}
                        containerStyle={{
                            width: 300
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                        //onPress={() => navigation.navigate('JylyGame')}
                    />
            </View>
            </View>
            <View style={{ flex: 2, alignItems: 'center'}}>
            <Text>So {userContext.user.name}, are you ready to start?</Text>
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