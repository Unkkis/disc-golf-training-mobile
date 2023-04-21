import React from 'react';
import { View } from 'react-native'
import Styles from '../Styles'
import { Button, Text, Chip } from '@rneui/themed';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomHeader } from './Misc';
import UserContext from '../UserContext';



export default function Home({ navigation }) {
    const userContext = React.useContext(UserContext);

    return (
        <View style={Styles.container}>
            <CustomHeader />
            <View style={{ flex: 2, justifyContent: 'center', padding: 40 }}><Text>Hi {userContext.user.username}.</Text><Text>Welcome to DG trainer, your app for Disc golf training. Chooose your medicine from below.</Text></View>
            <View style={{flex: 2, justifyContent: 'space-around' }}>
                <Chip size='lg' onPress={() => navigation.navigate('JYLY')}>JYLY</Chip>
                <Chip size='lg' onPress={() => navigation.navigate('Measure')}>Measure distance</Chip>
                <Chip size='lg'   
                    ViewComponent={LinearGradient} // Don't forget this!
                    linearGradientProps={{
                        colors: ['#FF9800', '#F44336'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                    }}
                    onPress={() => navigation.navigate('Help')}
                    >Rules/Help</Chip>
                    <Chip size='lg' /*onPress={() => navigation.navigate('Measure')}*/>Change user</Chip>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-end' }}><Text>Made by Unkkis Enterprises</Text></View>
        </View>
    );
}