import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';

const ProfilePage = () => {
  return (
    <>
      <View style={styles.container}>
        <Avatar.Image size={50} source={require('../assets/adaptive-icon.png')} />
        <Text> Chanbin Park </Text>
        <Button title="Edit profile"> </Button>
        <Divider />
        <Button title="Edit profile"> </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfilePage;