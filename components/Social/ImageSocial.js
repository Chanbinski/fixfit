import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Button,
  Text,
  TouchㅌableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { ref, uploadBytes, uploadString } from "firebase/storage";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { storage } from '../../config/firebase'


const ImageSocial = ({route}) => {
    const { photo } = route.params;
    const [ description, setDescription ] = useState('');
    const navigation = useNavigation();
    const { user } = useAuthentication();

    async function uploadPost(uri) {

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
    
      const dateTime = Date.now() + '';
      const imageRef = ref(storage, `${user.email}/images/${dateTime}`);
      const descriptionRef = ref(storage, `${user.email}/description/${dateTime}`);
      
      const result = await uploadBytes(imageRef, blob);
      const result2 = await uploadString(descriptionRef, description);
    
      // We're done with the blob, close and release it
      blob.close();
      setDescription('');
      console.log("Upload Successful.")
      //return await getDownloadURL(fileRef);
    }

    const sharePost = () => {

      uploadPost(photo.uri);
      navigation.navigate("Social");
      
      // const dateTime = Date.now() + '';
      // const imageRef = ref(storage, `${user.email}/images/${dateTime}`)
      // const descriptionRef = ref(storage, `${description}/postDescription`)

      // const metadata = {
      //   contentType: 'image/jpg',
      // };

      // const blob = await new Promise((resolve, reject) => {
      //   const xhr = new XMLHttpRequest();
      //   xhr.onload = function () {
      //     resolve(xhr.response);
      //   };
      //   xhr.onerror = function (e) {
      //     console.log(e);
      //     reject(new TypeError("Network request failed"));
      //   };
      //   xhr.responseType = "blob";
      //   xhr.open("GET", photo.uri, true);
      //   xhr.send(null);
      // });
    
      // uploadBytes(imageRef, blob, metadata).then((snapshot) => {
      //   uploadString(descriptionRef, description).then((snapshot) => {
      //     console.log("Post successfully uploaded.");
      //     navigation.navigate('Social');
      //   });
      // });

    }

    const PostHeader = () => {

      const navigation = useNavigation();
    
      return (
        <View style={headerStyles.header}>
          <Button 
            title="Cancel" 
            onPress={() => navigation.navigate('Social')}
          />
          <Text style={headerStyles.titleText}>Post</Text>
          <Button 
            title="Share" 
            onPress={sharePost}
          />
        </View>
      )
    }
    
    return (
      <SafeAreaView style={styles.imagePrev}>
        <PostHeader />
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View 
            style={styles.comment}
          >
            <ImageBackground
                source={{uri: photo && photo.uri}}
                style={styles.itemPhoto}
            />
            <TextInput 
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                placeholder="Comment..."
                onChangeText={(text) => setDescription(text)}
            />
          </View> 
        </ScrollView>
      </SafeAreaView>
    )
};

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: '6%',
    backgroundColor: '#fff',
    borderBottomColor: '#808080',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600'
  }
})

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
      aspectRatio: 1,
      height: 80,
      margin: 8
    },
    itemText: {
      color: '#000000',
      marginTop: 5,
    },
    imagePrev: {
      backgroundColor: 'white',
      flex: 1,
      // width: '100%',
      // height: '100%'
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
    input: {
      flex: 1,
      marginVertical: 10,
      paddingHorizontal: 6,
    },
    comment: {
      flexDirection: 'row',
      height: 95,
      borderBottomColor: '#808080',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });

export default ImageSocial;