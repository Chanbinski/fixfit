import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Header } from '../navigation/Header';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { storage, db } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL, listAll, deleteObject } from "firebase/storage";
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getDocs, collection, query, where, orderBy } from "firebase/firestore";

const auth = getAuth();

const Category = (props) => {
  const [user, setUser] = useState({});
  const [imageURLs, setImageURLs] = useState([]);
  const [urls, setUrls] = useState([]);

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
                  setImageURLs(oldArray => [...oldArray, url].reverse()); //When we do sort outside, it gives an error
                });
            });
        }).catch((error) => {
            console.log(error);
        });
    }
  };

  const fetchData = async () => {
    const q = query(collection(db, "users", user.email, props.name),orderBy("url", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const url = doc.data().url;
      console.log('set');
      setUrls(urls => [...urls, url])
    });
  }

  useEffect(() => {
    try {
      fetchData();
  } catch(error) {
      console.log(error);
  }
  }, [user]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Text>{props.name}</Text> */}
        {urls.map(url => (
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