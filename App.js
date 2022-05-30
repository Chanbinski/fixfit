import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Auth from './pages/Authentication';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';

import { Header } from './navigation/Header';
import CameraModal from './components/CameraModal';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator> 
      {
        true? ( //change to true to render home screen
          <Stack.Group>
            <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          </Stack.Group>
        )
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Intro = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>fixfit</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.startButton}
        >
          <Text>Let's get started!</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
    </View>
  )
}

const Home = () => {
  return (
    <View style={styles.container}>
        <Text>Home</Text>
        <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 15,
  },
  startButton: {
    backgroundColor: '#ffff00',
    borderRadius: 15,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6%',
    marginBottom: 25,
  }
});

export default App;