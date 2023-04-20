import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from "./StackNavigator";
import Statistics from '../components/Statistics';
import Discs from '../components/Discs'
import FindCourse from '../components/FindCourse';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from "../components/Home";


const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarStyle: { height: 80},
    tabBarInactiveTintColor: 'black',
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
  
      if (route.name === 'Games') {
        iconName = 'apps';
      } else if (route.name === 'Stats') {
        iconName = 'bar-chart';
      } else if (route.name === 'Courses') {
        iconName = 'compass'
      } else if (route.name === 'Discs') {
        iconName = 'disc'
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
});

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions= {screenOptions}
            >
        <Tab.Screen name="Games" component={Home} />
        <Tab.Screen name="Discs" component={Discs} />
        <Tab.Screen name="Courses" component={FindCourse}  />
        <Tab.Screen name="Stats" component={Statistics} />
    </Tab.Navigator>
    );
};

export default BottomTabNavigator;