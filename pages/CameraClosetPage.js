import { StyleSheet, View, Button, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import {  MaterialIcons } from '@expo/vector-icons';

const CameraPage = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
      setPreview(true);
    }
  };

  const resetPicture = () => {
    setImage(null);
    setPreview(false);
  }

  return (
    <View style={styles.container}>
      {preview && image ? (
        <ImagePreview photo={image} resetPicture={resetPicture} />
      ) : (
        <View>
          <Button title="Pick an image from camera roll" onPress={pickImage}/>
          <Button 
            title="Use the camera to add to your closet" 
            onPress={() => {navigation.navigate('CameraCloset')}} />
        </View>
      )}
    </View>
  );
}

const ImagePreview = ({photo, resetPicture}) => {
  console.log('Previewing', photo)
  return (
    <View style={styles.imagePrev}>
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{ flex: 1 }}>
          <TouchableOpacity onPress={resetPicture}>
            <MaterialIcons name='close' size={30} style={styles.cancelButton} onPress={resetPicture}/>
          </TouchableOpacity>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imagePrev: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  cancelButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    flex: 0.1,
    color: '#fff',
  },
});

export default CameraPage;