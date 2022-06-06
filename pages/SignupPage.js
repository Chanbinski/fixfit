import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Button } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 


const auth = getAuth();

const SignupPage = ({navigation}) => {

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        name: '',
        username: '',
        confirmedPassword: '',
        error: ''
    })

    async function signup() {
        if (value.email === '' || value.name === '' || value.username === '' || value.password === '') {
            setValue({
              ...value,
              error: 'There are mandatory fields you didn\'t fill out.'
            })
            return;
        } 

        if (value.password !== value.confirmedPassword) {
            setValue({
              ...value,
              error: 'Passwords don\'t match.'
            })
            return;
        }

        // try {
        //   await setDoc(doc(db, "users", value.email), {
        //     name: value.name,
        //     username: value.username,
        //   });
        // } catch (e) {
        //   setValue({
        //     ...value,
        //     error: error.message,
        //   })
        // }

        try {
          await createUserWithEmailAndPassword(auth, value.email, value.password);
          // navigation.navigate('Login')
        } catch (error) {
          setValue({
            ...value,
            error: error.message,
          })
        }
    }
    
    return (
      <>
        <SafeAreaView style={styles.container}>
          <Text style={styles.signuptitle}>Create your account</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value.name}
            onChangeText={(text) => setValue({ ...value, name: text })}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={value.username}
            onChangeText={(text) => setValue({ ...value, username: text })}
          >
          </TextInput>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          >
          </TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          >
          </TextInput>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={value.confirmedPassword}
            onChangeText={(text) => setValue({ ...value, confirmedPassword: text })}
            secureTextEntry={true}
          >
          </TextInput>
          <TouchableOpacity
            style={styles.buttonfilled}
            onPress={signup}
          >
            <Text 
            >Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text 
              onPress={() => navigation.navigate('Login')}
              style={{color: '#808080'}}
            >Already have an account?</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
  
    },
    signintitle: {
      fontSize: 70,
      fontWeight: '300',
      marginBottom: '10%',
      marginTop: '50%'
    }, 
    signuptitle: {
      fontSize: 30,
      fontWeight: '700',
      marginBottom: '10%',
      marginTop: '30%'
    }, 
    input: {
      width: '80%',
      height: 40,
      margin: 12,
      borderBottomWidth: 1,
      borderRadius: 5,
      borderColor: '#BEBEBE',
      padding: 10,
    },
    buttonfilled: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      height: 40,
      borderRadius: 5,
      backgroundColor:'#54BAB9',
      marginTop: 10,
      marginBottom: 20,
      boxShadow: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      borderRadius: 5,
      marginTop: 10,
    }
  });

export default SignupPage;