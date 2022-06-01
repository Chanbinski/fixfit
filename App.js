import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Auth from './pages/Authentication';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigator';

import { Header } from './navigation/Header';
import CameraModal from './components/CameraModal';
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect, useRef } from 'react';
import PickerModal from "react-native-picker-modal";

const Stack = createNativeStackNavigator();

const App = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator> 
      {
        true? ( //change to true to render home screen (true = user is logged in, false = user is not logged in)
          <Stack.Group>
            <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
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