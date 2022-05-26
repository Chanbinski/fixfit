import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";

import {
  FontAwesome,
  MaterialCommunityIcons,
  SimpleLineIcons
} from "@expo/vector-icons";

import Feather from 'react-native-vector-icons/Feather';

const SocialPage = () => {
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
              <Image style={{ width: 35, height: 35, borderRadius: '100%' }} source={{ uri: item.profilePic }}/>
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

export default SocialPage;