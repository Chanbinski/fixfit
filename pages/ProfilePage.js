import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Avatar} from 'react-native-paper';
import Divider from '../components/PickerModal/components/divider/Divider';
import { Header } from '../navigation/Header';
import React, { useState } from 'react';

const arr = [1,2,3];

const ProfilePage = () => {
  const navigation = useNavigation();
  const [count, setCount] = useState(-1);

  const getPics = () => {
    setCount(count + 1)
    return PICTURES
      .slice(count*3, count*3 + 3 + 1)
      .map(item => {
        return <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1006/200'}} />
      })
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Avatar.Image size={100} source={require('../assets/adaptive-icon.png')} style={styles.avatar}/>
        <Text style={styles.profilename}> Chanbin Park </Text>
        <Text style={styles.button}>Cal 25+2</Text>
        <TouchableOpacity
          style={styles.buttonfilled}
        >
          <Text> Edit Profile </Text>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
        <View style={styles.displayBar}> 
          <Text style={styles.textLeft}> Past six days </Text>
          <TouchableOpacity>
            <Text style={{fontSize: 16}} onPress={() => {navigation.navigate('Closet')}}> See more </Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.displayBar}>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1002/200'}} />
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1006/200'}} />
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1008/200'}} />
        </View>
        <View style={styles.displayBar}>
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1002/200'}} />
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1006/200'}} />
          <Image style={styles.image} source={{uri: 'https://picsum.photos/id/1008/200'}} />
        </View> */}
        <ScrollView style={{width: "100%", }}>
          <Images />
        </ScrollView>
        
      </View>
    </>
  );
}

const Images = () => {
  const results = [];
  const len = PICTURES.length;

  for (var i = 0; i < len; i+= 3) {
    if (len - i >= 3) {
      results.push(
        <View style={styles.displayBar}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+1].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+2].imageUrl}} />
        </View>
      );
    } else if (len - i == 2) {
      results.push(
        <View style={styles.displayBar}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+1].imageUrl}} />
        </View>
      );
    } else {
      results.push(
        <View style={styles.displayBar}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
        </View>
      );
    }
  }

  console.log(results);

  return (
    <>
      {results}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    marginBottom: '5%',
    marginTop: '10%'
  },
  profilename: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: '2%',
  }, 
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#3b3b3b",
    marginBottom: '2%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 5,
    fontSize: 15,
    marginBottom: 12,
  }, 
  buttonfilled: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    borderRadius: '20',
    backgroundColor:'#DCDCDC',
    marginBottom: 20,
    boxShadow: 10,
  },
 
  textLeft: {
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1,
    fontSize: 16,
    paddingLeft: 8,
  },
  displayBar: {
    flex: 3,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1,
    marginLeft: '2%',
    marginRight: '2%',
    aspectRatio: 1/1,
  },
});

const PICTURES = [
  {
    imageUrl: 'https://picsum.photos/id/1002/200',
  },
  {
    imageUrl: 'https://picsum.photos/id/1006/200',
  },
  {
    imageUrl: 'https://picsum.photos/id/1008/200',
  },
  {
    imageUrl: 'https://picsum.photos/id/1002/200',
  },
  {
    imageUrl: 'https://picsum.photos/id/1006/200',
  },

];

export default ProfilePage;