import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
  Button,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import { ref, uploadBytes, uploadBytesResumable, uploadString, getDownloadURL } from "firebase/storage";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuthentication } from '../../utils/hooks/useAuthentication';
import { storage, db } from '../../config/firebase'
import { setDoc, doc } from 'firebase/firestore'
import { useIsFocused } from '@react-navigation/native'


const EditPost = ({route}) => {
    const isFocused = useIsFocused()
    const navigation = useNavigation();
    const { item } = route.params;

    const [ url, setUrl ] = useState('');
    const [ caption, setCaption ] = useState('');
    const [ uploading, setUploading ] = useState(false);
    
    useEffect(() => {
      setCaption(item.caption);
      console.log(url);
      setUrl(item.imageUrl);
    }, [isFocused])

    const sharePost = async () => {

      setUploading(true);

      const dateTime = item.postName;
      const imageRef = ref(storage, `${item.email}/images/${dateTime}`);

        try {
            const postRef = doc(db, "users", item.email, "posts", dateTime);
            setDoc(postRef, {
              name: dateTime,
              url: item.imageUrl,
              caption: caption
            })
    
            setUploading(false);
            setCaption('');
            setUrl('');
            navigation.navigate("Social");
        }
        catch(error) {
            console.log(error);
        }
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
            title="Edit" 
            onPress={sharePost}
          />
        </View>
      )
    }
    
    return (
      <SafeAreaView style={styles.imagePrev}>
        <PostHeader />
          <View style={{ marginVertical: 10, justifyContent: 'center', alignItems: 'center' }}>
              { uploading && <Text style={{ color: 'gray' }}>Uploading in progress...</Text> }
          </View>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View 
            style={styles.comment}
          >
            <Image
                source={{uri : url}}
                style={styles.itemPhoto}
            />
            <TextInput 
                value={caption}
                style={styles.input}
                multiline={true}
                textAlignVertical="top"
                placeholder="Comment..."
                onChangeText={(text) => setCaption(text)}
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
    },
    wheel: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

export default EditPost;