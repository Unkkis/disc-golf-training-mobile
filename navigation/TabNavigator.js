import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
    tabBarInactiveBackgroundColor: '#E0E0E0',
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
  
      if (route.name === 'Traning') {
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
        <Tab.Screen name="Traning" component={Home} />
        <Tab.Screen name="Courses" component={FindCourse}  />
        <Tab.Screen name="Stats" component={Statistics} />
    </Tab.Navigator>
    );
};

export default BottomTabNavigator;