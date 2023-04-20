import { StyleSheet, View } from 'react-native';
import React from 'react';
import Styles from '../../Styles'
import { Button, ListItem, Text } from '@rneui/themed';



export default function JylyStart( {navigation} ) {

const [checked, setChecked] = React.useState([false, false]);

  return (
    <View style={styles.container}>
        <View style={{ flex:1, justifyContent: 'space-evenly', paddingBottom: 10 }}>
            <Button>Add users</Button>
        </View>
        <View style={{ flex: 9 }}>
            <View style={{ flex: 8 }}>
                <Text>Choose JYLY players:</Text>
                <ListItem bottomDivider topDivider>
                    <ListItem.CheckBox
                        // Use ThemeProvider to change the defaults of the checkbox
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checked={checked[0]}
                        onPress={() => setChecked([!checked[0], checked[1]])}
                    />
                    <ListItem.Content>
                        <ListItem.Title>User 1</ListItem.Title>
                        <ListItem.Subtitle>CA, US</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </View>
            <View style={{ flex: 1, alignItems: 'center'}}>
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