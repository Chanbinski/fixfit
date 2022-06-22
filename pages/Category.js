import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Header } from '../navigation/Header';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

const Category = (props) => {
  const [user, setUser] = useState({});
  const [imageURLs, setImageURLs] = useState([]);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const getImages = () => {
    if (user) {
        const listRef = ref(storage, `${user.email}/${props.name}`);
        setImageURLs([]);
        listAll(listRef).then((res) => {
            res.items.forEach((itemRef) => {           
                const path = itemRef._location.path_;
                const urlRef = ref(storage, path);

                getDownloadURL(urlRef).then((url) => {
                  console.log("Downloaded");
                  setImageURLs(oldArray => [...oldArray, url].sort().reverse()); //When we do sort outside, it gives an error
                });
            });
        }).catch((error) => {
            console.log(error);
        });
    }
  };

  useEffect(() => {
    getImages();
  }, [user]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Text>{props.name}</Text> */}
        {imageURLs.map(url => (
          // console.log(url)
          <Image style={styles.image} source={{uri: url}} />
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: 'center',
    marginLeft: '10%',
    flex: 1,
    marginVertical:  '5%',
  },
});

export default Category;