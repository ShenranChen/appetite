import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { View,  Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { useUser } from './global-user.jsx'
import Review from './review.jsx'

const Profile = () => {
  const {user} = useUser();

  const [currUser, setCurrUser] = useState([]);
  const [usersReviews, setUsersReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFetched, setUserFetched] = useState(false);
  const [profilePhotoString, setProfilePhotoString] = useState("");
  const [useDefaultPhoto, setUseDefaultPhoto] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8081/api/users/${user}`)
    .then(response => {
      setCurrUser(response.data)
      setUsersReviews(response.data.reviews) //should be array of review IDs [34329f432e90, 42c342da34, 54352b452f43]
      setUserFetched(true);
      setProfilePhotoString(response.data.profilePhoto);
    })
    .catch(error => console.error("AAAAAAAAAAAAAAA" + error));
    
    
  }, [user]);

  useEffect(() => {

    if (userFetched && usersReviews) {
      for (let i = 0; i < usersReviews.length; i++) {
        axios.get(`http://localhost:8081/api/reviews/${usersReviews[i]}`)
        .then(response => {
          setReviews(prevData => [...prevData, response.data])
        })
        .catch(error => console.error("oopsies" + error));
      }
    }
  }, [userFetched, usersReviews])


  if (profilePhotoString != "") {
    setUseDefaultPhoto(false);
  }

  return (
    <>
    <View style={{flex: 1, alignItems:"center", justifyContent: "center", gap: 20}}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "start", margin: 20 }}>
        
        {currUser.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <Text variant="titleLarge">{currUser.firstName}'s Profile</Text>
        {useDefaultPhoto && <Image 
          source={require("../../assets/default-profile-icon.jpg")}  
          style={{width: 200, height: 200, borderRadius: 200/ 2}} />} 
        {!useDefaultPhoto && <Image 
          source={{uri : 'data:image/jpeg;base64,${profilePhotoString}'}}  
          style={{width: 200, height: 200, borderRadius: 200/ 2}} />} 
        <Text variant="bodyMedium">Name: {currUser.firstName + " " + currUser.lastName}</Text>
        <Text variant="bodyMedium">Year: {currUser.year}</Text>
        <Text variant="bodyMedium">Reviews Posted: {currUser.reviews.length}</Text>
        </>
      )}
      </View>
      <View style={{flex: 2, alignItems: "end",  justifyContent: "space-evenly", margin: 20, gap: 10}}>
        <Text variant="titleMedium">Your reviews:</Text>
        <ScrollView >
        {
          reviews.length === 0 ? (
            <Text>Loading...</Text>
          ) : (
            reviews.map((value, index) => (
            <Review key={index} itemName={value.item} rating={value.rating} caption={value.caption} />
          ))
          )
        }
        </ScrollView>
      </View>
    </View>
    </>
  );
};

export default Profile;
