import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import PickerModal from '../components/PickerModal/PickerModal';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';


const SocialPage = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isVisible, setVisible] = useState(false);


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
    setVisible(false);
  }

  return (
    <View style={styles.container}>
        {preview && image ? (
          navigation.navigate('ImageSocial', {
            photo: image, 
          }),
          console.log(image),
          resetPicture()
      ) : (
        <>
     <View style={headerStyles.header}>
        <Text style={headerStyles.headerText}> Social </Text>
        <Ionicons name='camera' size={30} style={headerStyles.icon} onPress={() => setVisible(true)}/>
        <PickerModal
          title="You can either take a picture or select one from your album."
          isVisible={isVisible}
          data={["Take a photo", "Select from album"]}
          onPress={(selectedItem) => {
            if (selectedItem === 'Take a photo') {
              navigation.navigate('CameraSocial');
              setVisible(false);
            } else {
              pickImage();
            }
          }}
          onCancelPress={() => {
            setVisible(false);
          }}
          onBackdropPress={() => {
            setVisible(false);
          }}
        />
    </View>
    <SocialBody />
    </>
      )}
      </View>
  );
}

const SocialBody = () => {
  return (
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={POSTS}
            renderItem={({ item }) => <Post item={item} />}
          />
        </SafeAreaView>
      </View>
  );
}

const Post = ({item}) => {
  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 15}}>
      <View style={styles.top}>
          <View style={styles.topLeft}>
            <TouchableOpacity>
              <Image style={{ width: 35, height: 35, borderRadius: 100 }} source={{ uri: item.profilePic }}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.topLeftText}>{item.id}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-horizontal" size={26} color="black" />
          </TouchableOpacity>
      </View>

      <Image style={styles.image} source={{ uri: item.imageUrl }} />

      <View style={styles.bottom}>
        <View style={{ flexDirection: "row", alignItems: 'center', paddingVertical: 10}} >
          <TouchableOpacity>
            <Feather name="heart" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingLeft: 12 }}>
            <Feather name="message-circle" size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingLeft: 12 }}>
            <Feather name="download" size={24} />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginLeft: 'auto' }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>{item.likes}</Text>
              <MaterialCommunityIcons style={{paddingLeft: 1}} name="heart" size={15} color="black" />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 3 }}>
              <Text>{item.comments}</Text>
              <MaterialCommunityIcons  style={{paddingLeft: 1}} name="comment" size={15} color="black" />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'column', marginRight: "auto"}}>
          <Text style={{fontSize: 15}}>{item.caption}</Text>
        </View>
      </View>
    </View>
  );
}

const POSTS = [
  {
    id: "jjangu1015",
    profilePic: "https://picsum.photos/id/1/200",
    likes: 52,
    comments: 6,
    imageUrl: 'https://nextluxury.com/wp-content/uploads/guys-dapper-style-casual-wear-ideas-blue-dress-shirt.jpg',
    caption: "Casual, casual, and casual."
  },
  {
    id: "beachbaby",
    profilePic: "https://picsum.photos/id/10/200",
    likes: 530,
    comments: 60,
    imageUrl: 'https://i.pinimg.com/originals/ed/4c/2d/ed4c2d0639314c5eb8c4ab8adc0a6e41.jpg',
    caption: "King."
  },
  {
    id: "lebronJames23",
    profilePic: "https://picsum.photos/id/1002/200",
    likes: 88,
    comments: 1,
    imageUrl: 'https://i.pinimg.com/550x/e5/28/be/e528be85cbc45eb6207ab2a3dea1589c.jpg',
    caption: "I love James' new outfit."
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  top: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  topLeft: {
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1,
  },
  topLeftText: {
    fontSize: 16,
    paddingLeft: 8,
    fontWeight: "bold"
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 4/5,
    paddingTop: 0
  },
  bottom: {
    flexDirection: "column",
    paddingHorizontal: 12,
  }
});

const headerStyles = StyleSheet.create({
  header: {
      width: '100%',
      height: '13%',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#fff',
  },
  headerText: {
      fontWeight: 'bold',
      fontSize: 30,
      color: '#000',
      position: 'absolute',
      left: 10,
      top: '55%',
  },
  icon: {
    position: 'absolute',
    right: 20,
    top:'55%'
  },
});

export default SocialPage;