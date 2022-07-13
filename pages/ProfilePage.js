import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import { Avatar } from 'react-native-paper';
import Divider from '../components/PickerModal/components/divider/Divider';
import { Header } from '../navigation/Header';
import React, { useState } from 'react';
import {  MaterialIcons } from '@expo/vector-icons';
import PickerModal from '../components/PickerModal/PickerModal';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthentication } from '../utils/hooks/useAuthentication';


const auth = getAuth();

const ProfilePage = (props) => {
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}> {props.username} </Text>
        <MaterialIcons name='menu' size={30} style={styles.icon} onPress={() => setVisible(true)} />
        <PickerModal
          title= "You can either take a picture or select one from your album."
          isVisible={isVisible}
          data={["About", "Sign out"]}
          onPress={(selectedItem) => {
            if (selectedItem === 'About') {
              navigation.navigate('CameraCloset');
              setVisible(false);
            } else {
              setVisible(false);
              signOut(auth);
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
      <ProfileBody name={props.name} />
    </>
  );
}

const ProfileBody = (props) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
        <Avatar.Image size={100} source={require('../assets/adaptive-icon.png')} style={styles.avatar}/>
        <Text style={styles.profilename}>{props.name}</Text>
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
        <ScrollView style={styles.displayBox}>
          <Images />
        </ScrollView>
      </View>
  );
}

const Images = () => {
  const results = [];
  const len = PICTURES.length;

  for (var i = 0; i < len; i+= 3) {
    if (len - i >= 3) {
      results.push(
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+1].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+2].imageUrl}} />
        </View>
      );
    } else if (len - i == 2) {
      results.push(
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
          <Image style={styles.image} source={{uri: PICTURES[i+1].imageUrl}} />
        </View>
      );
    } else {
      results.push(
        <View style={styles.row}>
          <Image style={styles.image} source={{uri: PICTURES[i].imageUrl}} />
        </View>
      );
    }
  }

  return (
    <>
      {results}
    </>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
      width: '100%',
      height: '100%',
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
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    height: '12%',
    backgroundColor: '#fff',
  },
  headerText: {
    flexDirection: "row", 
    alignItems: "center", 
    flex: 1,
    fontSize: 20,
    paddingLeft: 8,
    top: '65%',
    fontWeight: '400',
  },
  icon: {
    flexDirection: "row", 
    alignItems: "center", 
    top:'62%',
    paddingRight: 5
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
    marginBottom: 10,
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
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  displayBox: {
    flex: 3,
    marginHorizontal: 'auto',
    width: '100%',
  },
  image: {
    width: 105,
    flexDirection: "row", 
    alignItems: "center", 
    marginLeft: '3%',
    marginRight: '3%',
    aspectRatio: 1/1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 4
  }
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