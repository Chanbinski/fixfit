
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../navigation/Header';

// import { Canvas } from "@react-three/fiber";
// import Human from '../components/Human'

const HomePage = () => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text>Home Page</Text>
        <StatusBar style="auto" />
        {/* <Canvas style={{ background: "#171717" }}>
          <Suspense fallback={null}>
            <Human />
          </Suspense>
        </Canvas> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomePage;