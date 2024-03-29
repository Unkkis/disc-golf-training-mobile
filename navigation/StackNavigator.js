import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Measure from "../components/Measure";
import Help from "../components/Help";
import BottomTabNavigator from "./TabNavigator";
import Jyly from "../components/Jyly/Jyly";
import JylyResults from "../components/Jyly/JylyResults";


const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="Home" component={BottomTabNavigator} />
            <Stack.Screen options={{headerShown: false}} name="JYLY" component={JylyStackNavigator} />
            <Stack.Screen options={{headerShown: false}} name="Measure" component={Measure} />
            <Stack.Screen name="Help" component={Help} />
        </Stack.Navigator>
      );
}

const JylyStackNavigator = () => {
    return ( 
        <Stack.Navigator>         
            <Stack.Screen name="JylyGame" component={Jyly} options={{ title: 'JYLY Putting game' }} />
            <Stack.Screen name="JylyResults" component={JylyResults} options={{ title: 'RESULTS', headerBackVisible: false, gestureEnabled: false }} />
        </Stack.Navigator>

    )
}

export { HomeStackNavigator };