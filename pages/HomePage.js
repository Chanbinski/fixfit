
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Header } from '../navigation/Header';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';

// import { Canvas } from "@react-three/fiber";
// import Human from '../components/Human'

const auth = getAuth();

const HomePage = () => {

  const { user } = useAuthentication();

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text>{user.email}</Text>
        <StatusBar style="auto" />
        {/* <Canvas style={{ background: "#171717" }}>
          <Suspense fallback={null}>
            <Human />
          </Suspense>
        </Canvas> */}
        <Button title="Sign Out" onPress={() => signOut(auth)} />
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