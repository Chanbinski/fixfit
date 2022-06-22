import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {MaterialIcons } from '@expo/vector-icons';
import PickerModal from '../PickerModal/PickerModal';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { storage } from '../../config/firebase';
import { ref, uploadBytes } from "firebase/storage";


const ImageCloset = ({route}) => {
    const {photo} = route.params;
    const navigation = useNavigation();
    const [isVisible, setVisible] = useState(false);
    const { user } = useAuthentication();
    
    const savePhoto = async (category) => {
      const dateTime = Date.now() + '';
      const imageRef = ref(storage, `${user.email}/${category}/${dateTime}`);
  
      const img = await fetch(photo.uri);
      const bytes = await img.blob();
  
      uploadBytes(imageRef, bytes).then((snapshot) => {
        console.log("Upload Successful.");
      });
    }

    console.log('Previewing', photo)
    return (
      <View style={styles.imagePrev}>
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{ flex: 1 }}>
            <TouchableOpacity>
              <MaterialIcons name='close' size={30} style={styles.cancelButton} onPress={() => {
                  navigation.navigate('Closet');
              }}/>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                setVisible(true); 
              }} 
              style={ styles.secondScreen }>
              <Text style={styles.text}> Save </Text>
            </TouchableOpacity>
            <PickerModal
          title="Choose a category that you would like to save to."
          isVisible={isVisible}
          data={["Accessories", "Outerwear", "Tops", "Bottoms", "Dresses/Skirts", "Shoes"]}
          onPress={(selectedItem) => {
            savePhoto(selectedItem);
            setVisible(false);
            navigation.navigate('Closet');
          }}
          onCancelPress={() => {
            setVisible(false);
          }}
          onBackdropPress={() => {
            setVisible(false);
          }}
        />
        </ImageBackground>
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    sectionHeader: {
      fontWeight: '700',
      fontSize: 19,
      color: '#000000',
      marginTop: 20,
      marginBottom: 10,
    },
    item: {
      paddingRight: 20
    },
    itemPhoto: {
      width: 200,
      height: 200,
    },
    itemText: {
      color: '#000000',
      marginTop: 5,
    },
    imagePrev: {
      backgroundColor: 'transparent',
      flex: 1,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    cancelButton: {
      position: 'absolute',
      top: 40,
      left: 40,
      flex: 0.1,
      color: '#fff',
    },
    secondScreen: {
        position: 'absolute',
        bottom: 40,
        right: 40,
        flex: 0.1,
        color: '#fff',
    },
    text: {
        fontSize: 20,
        color: 'white',
    },
  });

export default ImageCloset;