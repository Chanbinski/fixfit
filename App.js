import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClosetBody } from './components/ClosetBody.js';
import { Header } from './components/Header.js';



export default function App() {
  return (
    <>
      <Header/>
      <ClosetBody/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#ffff00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
