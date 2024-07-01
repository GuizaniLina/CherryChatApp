import React, { useState, useRef, useEffect } from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import this hook for navigation focus check
import firebase from '../config';
import * as ImagePicker from 'expo-image-picker';


export default function Profils({ route, navigation }) {
  const isFocused = useIsFocused(); // Check if the screen is focused
  const userId = firebase.auth().currentUser?.uid;
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [num, setNum] = useState('');
  const nomInputRef = useRef(null);
  const prenomInputRef = useRef(null);
  const numInputRef = useRef(null);
  const [defaultImage, setDefaultImage] = useState(true);
  const [urlImage, setUrlImage] = useState('');
  const database = firebase.database();

  useEffect(() => {
    // Load user profile data when the screen is focused
    if (isFocused) {
      loadUserProfile();
    }
  }, [isFocused]);

  const loadUserProfile = async () => {
    try {
      const snapshot = await database.ref(`Profils/${userId}`).once('value');
      const profileData = snapshot.val();

      if (profileData) {
        setNom(profileData.nom || '');
        setPrenom(profileData.prenom || '');
        setNum(profileData.numero || '');
        setUrlImage(profileData.url || '');
        setDefaultImage(!profileData.url); // Set default image if URL is not available
      }
    } catch (error) {
      console.error('Error loading user profile:', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled ) {
      setDefaultImage(false);
      const assets = result.assets;
      const uri = assets[0].uri;
      setUrlImage(uri);
    }
  };

  const uploadImageLocalToFirebaseStorage = async () => {
    const blob = await imageToBlob(urlImage);
    const storage = firebase.storage();
    const ref_mesimages = storage.ref('Mesimages');
    const ref_image = ref_mesimages.child(`${userId}_${Math.random()}.jpg`);

    await ref_image.put(blob);
    const imageUrl = await ref_image.getDownloadURL();
    return imageUrl;
  };

  const imageToBlob = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
    return blob;
  };

  const updateProfile = async () => {
    try {
      const ref_profils = database.ref('Profils');
      const ref = ref_profils.child(userId);
      const imageUrl = await uploadImageLocalToFirebaseStorage();

      ref.set({
        id: userId,
        nom: nom,
        prenom: prenom,
        numero: num,
        url: imageUrl,
      });
    

      // Optionally, you can show a success message or navigate to another screen.
      // Example: navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    
    }
  };

  return (
    <ImageBackground source={require('../assets/bg.jpg')} style={styles.container} blurRadius={0.7}>
      <Text style={styles.text}>My Profile</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image style={styles.image} source={defaultImage ? require('../assets/upload.png') : { uri: urlImage }} />
      </TouchableOpacity>

      <TextInput
        onChangeText={(text) => setNom(text)}
        style={styles.textinput}
        blurOnSubmit={true}
        ref={nomInputRef}
        placeholder="Name"
        value={nom}
      />
      <TextInput
        onChangeText={(text) => setPrenom(text)}
        style={styles.textinput}
        blurOnSubmit={true}
        ref={prenomInputRef}
        placeholder="Last Name"
        value={prenom}
      />
      <TextInput
        onChangeText={(text) => setNum(text)}
        style={styles.textinput}
        blurOnSubmit={true}
        ref={numInputRef}
        placeholder="Phone Number"
        value={num}
      />
      <Button style={styles.btn} onPress={updateProfile} title="Update Profile"></Button>
    
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
    width: 200,
    height: 60,
    fontWeight: 'bold',
  },
  text: {
    textAlignVertical: 'center',
    color: '#b6212c',
    marginBottom: 20,
    fontWeight: 'bold',
    fontSize: 28,
  },
  btn: {
    backgroundColor: '#9BBEC8',
    margin: 2,
    width: 110,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
});