import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import firebase from '../config';


export default function CreateUser(props) {
    const auth = firebase.auth();
    const [confirmpassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [pwd,setPwd] = useState('');
    const refinput2 = useRef(null);
    const refinput3 = useRef(null);
    const refinput4 = useRef(null);
    const refinput5 = useRef(null);
    const navigation = useNavigation();


  return (
    <ImageBackground  source={require("../assets/bg.jpg")}
    style={styles.container} blurRadius={1}> 
    <View
    style={{
        width: "90%",
        height: 500,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 0, 51, 0.17)',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
      <Text style={{
        color: '#fff',
        fontWeight: "bold",
        marginBottom: 25,
      }}>Sign up</Text>

      <View style={{ flexDirection: 'row'}}>
        <Text style={styles.text}> Email : </Text>
        <TextInput 
            
            ref={refinput3}
            onSubmitEditing={()=>{ refinput4.current.focus();}}
            blurOnSubmit={false}
            keyboardType='email-address'
            onChangeText={text => setEmail(text)}
            style={styles.textinput} placeholder="Email"  ></TextInput>
      </View>

      <View style={{ flexDirection: 'row'}}>
        <Text style={styles.text}> Password : </Text>
        <TextInput 
            secureTextEntry={true}
            ref={refinput4}
            onSubmitEditing={()=>{ refinput5.current.focus();}}
            blurOnSubmit={false}
            onChangeText={text => setPwd(text)}
            style={styles.textinput} placeholder="password"  ></TextInput>
      </View>

      <View style={{ flexDirection: 'row'}}>
        <Text style={styles.text}> Confirm Password : </Text>
        <TextInput 
            secureTextEntry={true}
            ref={refinput5}
           
            blurOnSubmit={true}
            onChangeText={text => setConfirmPassword(text)}
            style={styles.textinput} placeholder="confirm password"  ></TextInput>
      </View>

      <Button style={styles.btn} onPress={()=>{
            if (pwd === confirmpassword){
                auth.createUserWithEmailAndPassword(email, pwd)
                .then(()=>{
                    // navigation
                    props.navigation.replace('Accueil', {currentid:auth.currentUser.uid});
                })
                .catch((err)=>{alert(err);});
            }
      }

      } title='Sign up' textColor='#fff'>Sign up</Button>
      <TouchableOpacity style={{
        paddingRight: 10,
        width: "100%",
        alignItems: "flex-end",
        marginTop: 10,
      }}>
      <Text 
        onPress={()=>{
          navigation.navigate("Auth")
        } }
        style={{
        color: '#fff',
        fontWeight: "bold",
      }}>Already have an account</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#005',
          alignItems: 'center',
          justifyContent: 'center',
        },
         textinput: {
            marginBottom: 5,
            backgroundColor: '#fff5',
            width: "65%",
            height: 60,
        },
        text: {
            width: 100,
            textAlignVertical: 'center',
            color: '#fff',
            
        },
        btn: {
          backgroundColor: "'rgba(191, 44, 74, 0.7)'",
          margin: 2,
          width: 110,
}})