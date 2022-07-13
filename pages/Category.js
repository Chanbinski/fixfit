import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, FlatList, SafeAreaView } from 'react-native';
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
      console.log(urls);
    } catch(error) {
      console.log(error);
    }
    
  }, [isFocused]);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            data={urls}
            renderItem={({ item }) => <Item item={item} />}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      </View>
    </>
  );
}

const Item = ({item}) => {
  const [isVisible, setVisible] = useState(false);

  const deletePost = async () => {
    await deleteDoc(doc(db, "users", item.email, "posts", item.postName));

    const storageRef = ref(storage, `${item.email}/images/${item.postName}`);

    try {
      deleteObject(storageRef);
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', paddingVertical: 15}}>
      <Image style={styles.image} source={{ uri: item.url }}  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center", 
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    paddingTop: 10
  },
});

export default Category;