import { NavigationContainer } from '@react-navigation/native';
import { HomeStackNavigator } from './navigation/StackNavigator';
import { ThemeProvider, createTheme } from '@rneui/themed';

const theme = createTheme({
  components:{
    Button: {
     containerStyle: {
        margin: 5,
        backgroundColor: 'rgba(52, 52, 52, 0.0)'
      },
      buttonStyle: {
        width: "100%",
        borderRadius: 35,
      },
      titleStyle: {
        color: "white",
      }

    },
    Text: {
      style: {
        fontSize: 20,
      },
      h1style: {
        fontSize: 35,
      },
      h4Style: {
        fontSize: 20
      }
      
    }
  
  }
});

// Navigation structure:
// https://reactnavigation.org/docs/hiding-tabbar-in-screens/
export default function App() {


  return (
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
  );
}


