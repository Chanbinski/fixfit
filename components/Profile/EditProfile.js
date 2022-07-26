import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    ImageBackground,
    Image,
    Button,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { namedQuery } from '@firebase/firestore';
import { getTsBuildInfoEmitOutputFilePath } from 'typescript';

const EditProfile = (props) => {

    const [username, setUsername] = useState(props.username);
    const [name, setName] = useState(props.name);
    const [email, setEmail] = useState(props.email);
    const [bio, setBio] = useState('');

    const EditHeader = () => {

        const navigation = useNavigation();
      
        return (
          <View style={headerStyles.header}>
            <Button 
              title="Cancel" 
              onPress={() => navigation.navigate('Profile')}
            />
            <Text style={headerStyles.titleText}>Edit Profile</Text>
            <Button 
              title="Edit" 
            />
          </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <EditHeader />
            <ScrollView 
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <Avatar.Image size={100} source={require('../../assets/adaptive-icon.png')} style={styles.avatar}/>
                <TouchableOpacity style={{marginBottom: 30}}>
                    <Text style={{color: 'gray'}}>Change Profile Image</Text>
                </TouchableOpacity> 
                <View style={styles.inputContainer}>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTitle}>Username</Text>
                        <TextInput 
                            value={username}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTitle}>Name</Text>
                        <TextInput 
                            value={name}
                            style={styles.input}
                    />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTitle}>Email</Text>
                        <TextInput 
                            value={email}
                            style={styles.input}
                    />
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.inputTitle}>Bio</Text>
                        <TextInput 
                            value={bio}
                            style={styles.input}
                    />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const headerStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: '6%',
        backgroundColor: '#fff',
        borderBottomColor: '#808080',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    titleText: {
        fontSize: 18,
        fontWeight: '600',
    }
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    avatar: {
        marginBottom: '5%',
        marginTop: '5%'
    },
    input: {
        flex: 1,
        marginVertical: 10,
        paddingHorizontal: 6,
        marginLeft: 20,
        fontSize: 16,
    },
    inputBox: {
        flexDirection: 'row',
        width: '80%',
        marginBottom: 20,
        borderBottomColor: '#808080',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    inputTitle: {
        flex: 0.4,
    }
})

export default EditProfile
