import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import {  MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CameraPage from '../pages/CameraPage';


export default function CameraComp(changeMode) {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(null);
  const [chooseImage, setChooseImage] = useState(null);
  const navigation = useNavigation();

  const takePicture = async () => {
    const photo = await cameraRef.current.takePictureAsync();
    console.log(photo);
    setPreviewVisible(true);
    setChooseImage(photo);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const savePhoto = () => {};

  const retakePicture = () => {
    setChooseImage(null);
    setPreviewVisible(false);

  }

  return (
    <View style={styles.container}>
      {previewVisible && chooseImage ? (
            <CameraPreview photo={chooseImage} retakePicture={retakePicture} savePhoto={savePhoto}  />
          ) : (
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.flipContainer}>
          <TouchableOpacity
            style={styles.flipButton}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {navigation.navigate("Camera");}}>
            <MaterialIcons name='close' size={30} style={styles.chooseButton} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={takePicture}
          style={styles.picButton}/> 
      </Camera>
          )}
    </View>
  );
}

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  console.log('Success', photo)
  return (
    <View style={styles.imagePrev}>
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={styles.text}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={savePhoto}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text style={styles.text}> Save </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  imagePrev: {
    backgroundColor: 'transparent',
    flex: 1,
    width: '100%',
    height: '100%'
  },
  picButton: {
    width: 70,
    height: 70,
    bottom: 20,
    borderRadius: 50,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
  flipContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  flipButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    flex: 0.1,
  },
  chooseButton: {
    position: 'absolute',
    top: 30,
    left: 30,
    flex: 0.1,
    color: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});