import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Input, TextInput, TouchableOpacity, Button } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

const Login = ({navigation}) => {

    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
    })

    async function login() {
        if (value.email === '' || value.password === '') {
            setValue({
              ...value,
              error: 'Email and password are mandatory.'
            })
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, value.email, value.password);
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
          <Text style={styles.signintitle}>fixfit</Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
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
          <TouchableOpacity
            style={styles.buttonfilled}
            onPress={login}
          >
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text style={{color: '#808080'}}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
          >
            <Text 
              onPress={() => navigation.navigate('Signup')}
              style={{color: '#808080'}}
            >Sign Up for fixfit</Text>
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

export default Login;