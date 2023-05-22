import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './navigation/StackNavigator';

// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {


  return (

      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
  );
}


