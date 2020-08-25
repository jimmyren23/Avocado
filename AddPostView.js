import React, {useState, useRef} from 'react';
import {Overlay, Input, Button} from 'react-native-elements';
import { Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
// The AddPostView is a button for adding Posts. When the button is pressed, an
// overlay shows up to request user input for the new Post name. When the
// "Create" button on the overlay is pressed, the overlay closes and the new
// Post is created in the realm.
export function AddPostView() {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [newPostName, setNewPostName] = useState('');
  const [newPostDescription, setNewPostDescription] = useState('');
  const [rating, setRating] = useState();

  const navigation = useNavigation();

  return (
    <>
        <TextInput
          placeholder="New Post Name"
          onChangeText={(text) => setNewPostName(text)}
          multiline={true}
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        />
        <TextInput
          placeholder="Description"
          onChangeText={(text) => setNewPostDescription(text)}
          multiline={true}
          numberOfLines={1}
        />
        {rating >= 0 && rating <= 10 ?
          <>
          <TextInput
            placeholder="Rating (out of 10)"
            onChangeText={(text) => setRating(text)}
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          />
          <Button
            title="Create"
            onPress={() => {
              setOverlayVisible(false);
              firestore()
              .collection('Avocado')
              .add({
                Date: (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
                Description: newPostDescription,
                Title: newPostName,
                Rating: rating,
              })
              .then(() => {
                console.log('New Post added!');
              });
              navigation.navigate('Feed');
            }}
          />
          </>
           :
           <>
           <TextInput
             placeholder="Rating (out of 10)"
             onChangeText={(text) => setRating(text)}
             style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
           />
         <Button title ="Create"/>
         <Text> Rating must be between 0 and 10! </Text>
       </>}
    </>
  );
}
