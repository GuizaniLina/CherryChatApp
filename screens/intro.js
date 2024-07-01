import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { BackHandler,Image,ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import firebase from '../config';


export default function Intro() {
  
    const refinput2 = useRef();
    const navigation = useNavigation();
    
  return (
    <ImageBackground 
      source={require("../assets/cherry2.jpg")}
      style={styles.container}  >
         
        
        <View>
         
     
     
    
           
                
                
                    
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Auth')}>
      <Text style={styles.buttonText}>Let's Start</Text>
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
  
  },
 
  btn: {
    backgroundColor: "'rgba(191, 44, 74, 0.7)'",
    marginTop: 150,
    width: 200,
    height : 50
    
  },
  image: {
    width: 200,
    height: 200,
    //marginBottom: 10,
    marginTop: 100,
    
},
buttonContainer: {
    backgroundColor: '#e5a0ad',
    padding: 15,
    borderRadius: 10,
    marginTop: 450,
    width :250,
    
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
