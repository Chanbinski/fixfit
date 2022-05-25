import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function CameraComp() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [previewVisible, setPreviewVisible] = useState(null);
  const [image, setImage] = useState(null);
  const [chooseImage, setChooseImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setChooseImage(result.uri);
    }
  };

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
    setImage(null);
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
          <TouchableOpacity
            style={styles.chooseButton}
            onPress={pickImage}>
            <Text style={styles.text}> Choose Photo </Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

