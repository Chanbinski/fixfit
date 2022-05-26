import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import {  MaterialIcons } from '@expo/vector-icons';


export function Header () {
    let [fontsLoaded] = useFonts({
        'SFPro': require('../assets/fonts/SF-Pro-Display-Bold.otf'),
      });

    return (
        <View style={styles.header}>
            <Text style={styles.headerText}> Fixfit </Text>
            <MaterialIcons name='menu' size={30} style={styles.icon} />
        </View>
        
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: "#fff",
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'SFPro',
        color: '#000',
        letterSpacing: 1,
        position: 'absolute',
        left: 20,
        top: '50%',
    },
    icon: {
        position: 'absolute',
        right: 20,
        top:'50%'
    }
});
