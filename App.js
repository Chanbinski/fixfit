import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigation/TabNavigator';
import { Header } from './navigation/Header';
import CameraModal from './components/CameraModal';
import {Picker} from '@react-native-picker/picker';
import React, { useState, useEffect, useRef } from 'react';
import PickerModal from "react-native-picker-modal";

const App = () => {
  const [isVisible, setVisible] = useState(true);

  return (
    // <NavigationContainer>
    //   <TabNavigator />
    // </NavigationContainer>
    <PickerModal
  title="You can either take a picture or select one from your album."
  isVisible={isVisible}
  data={["Take a photo", "Select from album"]}
  onPress={(selectedItem) => {
    Alert.alert("Alert", selectedItem);
  }}
  onCancelPress={() => {
    setVisible(false);
  }}
  onBackdropPress={() => {
    setVisible(false);
  }}
/>
  );
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