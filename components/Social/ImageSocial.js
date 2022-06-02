import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {MaterialIcons } from '@expo/vector-icons';


const ImageSocial = ({route}) => {
    const {photo} = route.params;
    const navigation = useNavigation();
    
    console.log('Previewing', photo)
    return (
      <View style={styles.imagePrev}>
        <ImageBackground
          source={{uri: photo && photo.uri}}
          style={{ flex: 1 }}>
            <TouchableOpacity>
              <MaterialIcons name='close' size={30} style={styles.cancelButton} onPress={() => {
                  navigation.navigate('Social');
              }}/>
            </TouchableOpacity>
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

export default ImageSocial;