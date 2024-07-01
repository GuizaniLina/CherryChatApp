import React, { useState, useEffect } from 'react';
import { ImageBackground, Text, FlatList, StyleSheet, TextInput, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import firebase from '../config';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = firebase.auth().currentUser?.uid;

  useEffect(() => {
    const chatRef = firebase.database().ref('GroupChat/Messages');

    // Listen for new messages
    const onNewMessage = (snapshot) => {
      const newMessage = snapshot.val();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    chatRef.on('child_added', onNewMessage);

    // Clean up listener when component unmounts
    return () => {
      chatRef.off('child_added', onNewMessage);
    };
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      return;
    }
  
    const messageRef = firebase.database().ref('GroupChat/Messages').push();
    const user = firebase.auth().currentUser;
    const userId = user ? user.uid : '';
    
    // Fetch the user's profile from Profils collection
    const userProfileSnapshot = await firebase.database().ref(`Profils/${userId}`).once('value');
    const userProfile = userProfileSnapshot.val();
    const photoURL = userProfile ? userProfile.url || '' : '';
  
    // Save the message to the database
    await messageRef.set({
      userId: userId,
      text: message,
      photoURL: photoURL,
    });
  
    // Clear the input field
    setMessage('');
  };

  const isCurrentUser = (messageUserId) => messageUserId === userId;

  return (
    <ImageBackground
      source={require('../assets/cherry.jpg')}
      style={styles.container}
      blurRadius={2}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={isCurrentUser(item.userId) ? styles.currentUserMessageContainer : styles.otherUserMessageContainer}>
               <Image source={{ uri: item.photoURL }} style={!isCurrentUser(item.userId) && styles.otherUserPhoto} />
              <Text style={isCurrentUser(item.userId) ? styles.currentUserMessageText : styles.otherUserMessageText}>{item.text}</Text>
              <Image source={{ uri: item.photoURL }} style={isCurrentUser(item.userId) && styles.currentUserPhoto } />
            </View>
          )}
        />
        <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity onPress={handleSendMessage}>
            <Image
              source={require('../assets/send.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  keyboardAvoidingView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
    borderColor: '#b6212c',
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
  },
 currentUserMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#e5a0ad',
    borderRadius: 8,
  },

  otherUserMessageContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
    maxWidth: '80%',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#cc637b',
    borderRadius: 8,
  },

  currentUserPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 5,
  },
  
  otherUserPhoto: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },

  currentUserMessageText: {
    color: 'black',
    maxWidth: '80%', // Add maxWidth for the text
  },

  otherUserMessageText: {
    color: 'black',
    maxWidth: '80%', // Add maxWidth for the text
  },
});