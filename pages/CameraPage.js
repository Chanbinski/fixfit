import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import React, { useState } from 'react';
import CameraComp from '../components/CameraComp';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const CameraPage = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  console.log(modeStatus);
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage}/>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Use the camera" onPress={() => {navigation.navigate('CameraComp')}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CameraPage;