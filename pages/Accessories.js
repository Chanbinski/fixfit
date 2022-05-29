import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Header } from '../navigation/Header';

const Accessories = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Accessories</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.startButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
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

export default Accessories;