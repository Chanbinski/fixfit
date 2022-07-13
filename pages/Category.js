import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Header } from '../navigation/Header';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { useIsFocused } from '@react-navigation/native';
import { set } from 'firebase/database';

const auth = getAuth();

const Category = (props) => {
  const [imageURLs, setImageURLs] = useState([]);
  const [urls, setUrls] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "users", props.email, props.name));
      const querySnapshot = await getDocs(q);
      setUrls([]);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const obj = {
          url: doc.data().url
        }
        console.log('set');
        setUrls(urls => [...urls, obj]);
      });
      setUrls(urls => urls.reverse());
    }
    try {
      fetchData();
    } catch(error) {
      console.log(error);
    }
  }, [isFocused]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Text>{props.name}</Text> */}
        {urls.map(url => (
          console.log(url.url),
          <Image style={styles.image} source={{uri: url.url}} />
        ))}
        {/* <Image style={styles.image} source={{uri: urls[0]}} /> */}
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