import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { View,  Image } from "react-native";
import { Text } from "react-native-paper";

const Profile = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8081/api/users")
    .then(response => setUsers(response.data))
    .catch(error => console.error("AAAAAAAAAAAAAAA" + error));
  }, []);

  return (
    <>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "start", margin: 20 }}>
      <Text variant="titleLarge">Jason's Profile</Text>
      <Image 
  source={require('../../assets/IMG_5264.jpg')}  
  style={{width: 200, height: 200, borderRadius: 200/ 2}} 
/>
      <Text variant="bodyMedium">{users}</Text>

      <Text variant="bodyMedium">Year: 2nd</Text>
      <Text variant="bodyMedium">Reviews Posted: 300</Text>
    </View>
    <View style={{flex: 1, alignItems: "flex-start",  justifyContent: "start", margin: 20}}>
      <Text variant="titleMedium">Your reviews:</Text>
    </View>
    </>
  );
};

export default Profile;
