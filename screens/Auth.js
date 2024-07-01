import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { BackHandler,Image,ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from '../config';


export default function Auth(props) {
  const auth = firebase.auth();
    const [email, setEmail] = useState('linaguizani2019@gmail.com');
    const [pwd,setPwd] = useState('123456');
    const refinput2 = useRef();
    const navigation = useNavigation();
    
  return (
    <ImageBackground 
      source={require("../assets/bg.jpg")}
      style={styles.container}  blurRadius={1.3}>
         
        
        <View
        style={{
            width: "90%",
            height: 450,
            borderRadius: 20,
            backgroundColor: 'rgba(255, 0, 51, 0.17)',
            alignItems: 'center',
            justifyContent: 'center',
            //marginTop: 60,
        }}
        >
          <Image style={styles.image} source={require('../assets/logo.png')} />
        <Text 
        style={{
            fontSize: 32,
            color: 'rgba(191, 44, 74, 1)',
            fontWeight: "bold",
            marginBottom: 20,
        }}>Authentification</Text>
      <TextInput 
        onSubmitEditing={()=>{ refinput2.current.focus();}}
        blurOnSubmit={false}
        keyboardType='email-address'
        onChangeText={text => setEmail(text)}
        style={styles.textinput} placeholder="Email"  ></TextInput>
      
      <TextInput 
        ref={refinput2}
        secureTextEntry={true} onChangeText={text => setPwd(text)}
        style={styles.textinput} placeholder="Password"></TextInput>
      <View style={{ flexDirection: 'row'}} >
      <Button style={styles.btn }  textColor='#fff'  onPress={()=>{
           
                auth.signInWithEmailAndPassword(email, pwd)
                .then(()=>{
                   const currentid=auth.currentUser.uid;
                    // navigation
                    props.navigation.navigate('Accueil',{currentid:currentid});
                })
                .catch((err)=>{alert(err);});
            
      }} title='Log in'>Log in</Button>
        <Button style={styles.btn} textColor='#fff' onPress={()=>{
          BackHandler.exitApp()
          //fermer l'application
         }}title='Cancel'>Cancel</Button>
      </View>
      
      <TouchableOpacity style={{
        paddingRight: 10,
        width: "100%",
        alignItems: "flex-end",
        marginTop: 10,
      }}>
      <Text 
        onPress={()=>{
          navigation.navigate("CreateUser")
        }}
        style={{
          fontSize :10,
          color: '#000',
         fontWeight: "bold",
      }}>Create account </Text>
      </TouchableOpacity>
      <StatusBar Style="light" />
      </View>
      
    </ImageBackground>
  );

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
    width: "70%",
    height: 60,
  },
  btn: {
    backgroundColor: "'rgba(191, 44, 74, 0.7)'",
    margin: 2,
    width: 110,
    
  },
  image: {
    width: 130,
    height: 130,
    //marginBottom: 10,
    //marginTop: 10,
}
});