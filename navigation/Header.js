import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {  MaterialIcons } from '@expo/vector-icons';


export function Header () {
    let [fontsLoaded] = useFonts({
        'SFPro': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      });

    if (!fontsLoaded) {
    return null;
    }

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}> fixfit </Text>
            {/* <MaterialIcons name='menu' size={30} style={styles.icon} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '13%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontWeight: '800',
        fontSize: 40,
        color: '#000',
        position: 'absolute',
        left: 10,
        top: '55%',
    },
    icon: {
        position: 'absolute',
        right: 20,
        top:'50%'
    }
});
