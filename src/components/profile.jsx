import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios"

import { View,  Image, ScrollView } from "react-native";
import { Text, ToggleButton, List } from "react-native-paper";
import { useUser } from './global-user.jsx'
import { useNavigation } from '@react-navigation/native';
import Review from './review.jsx'


const Profile = () => {
  const { user } = useUser();

  const [currUser, setCurrUser] = useState([]);
  const [usersReviews, setUsersReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFetched, setUserFetched] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [value, setValue] = useState('reviews');
  const [favoritesComponents, setFavoritesComponents] = useState([]);
  const navigation = useNavigation();
  const [profilePhotoString, setProfilePhotoString] = useState("");
  const [useDefaultPhoto, setUseDefaultPhoto] = useState(true);


  useEffect(() => {
    axios.get(`http://localhost:8081/api/users/${user}`)
    .then(response => {
      setCurrUser(response.data)
      setUsersReviews(response.data.reviews) //should be array of review IDs [34329f432e90, 42c342da34, 54352b452f43]
      setFavorites(response.data.favoriteFoods) // should be array of favoriteFoods IDS [43024342, 34235324532, 325324234]
      console.log("favorite foods array: ", favorites)
      setUserFetched(true);
      setProfilePhotoString(response.data.profilePhoto);
      if (response.data.profilePhoto != '')
        setUseDefaultPhoto(false);
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

  useEffect(() => {
    if (userFetched && favorites) {
      for (let i = 0; i < favorites.length; i++) {
        axios.get('http:localhost:8081/api/food')
        .then(res =>
          {
              let fList = [];
              for (let data of res.data)
              {
                  if (favorites.includes(data._id))
                  {
                    fList.push(<List.Item
                      key={data._id}
                      title={data.name}
                      titleStyle={{ fontSize: FONT_SIZE }}
                      left={props => <List.Icon {...props} icon={require('../../assets/food-icon.png')} />}
                      onPress={() => navigation.navigate('Food', data._id)} />)
                  }
              }
              setFavoritesComponents(fList);
          })
      }
  }
  }, [userFetched, favorites])

  console.log("users fav foods arr outside useeffect", favoritesComponents);

  return (
    <>
    <View style={{flex: 1, alignItems:"center", justifyContent: "center", gap: 20}}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "start", margin: 20 }}>
        
        {currUser.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        <>
        <Text variant="titleLarge">{currUser.firstName}'s Profile </Text>
          {useDefaultPhoto && <Image 
            source={require("../../assets/default-profile-icon.jpg")}  
            style={{width: 200, height: 200, borderRadius: 200/ 2}} />} 
          {!useDefaultPhoto && <Image 
            source={{uri : `data:image/jpeg;base64,${profilePhotoString}`}}  
            style={{width: 200, height: 200, borderRadius: 200/ 2}} />} 
        <Text variant="bodyMedium">Name: {currUser.firstName + " " + currUser.lastName}</Text>
        <Text variant="bodyMedium">Year: {currUser.year}</Text>
        <Text variant="bodyMedium">Reviews Posted: {currUser.reviews.length}</Text>
        </>
      )}
      </View>
      <View style={{flex: 2, alignItems: "center",  justifyContent: "space-evenly", margin: 20, gap: 10}}>
        <ToggleButton.Row onValueChange={value => setValue(value)} value={value}>
          <ToggleButton icon="note-text-outline" value="reviews" />
          <ToggleButton icon="star" value="favorites" />
          <ToggleButton icon="trophy-outline" onPress={() => {navigation.navigate('Badge')}} />
        </ToggleButton.Row> 
        <View>
        {
          value == "reviews" ? (
            <Text variant="titleLarge">My Reviews:</Text>
          ) : (
            <Text variant="titleLarge">My Favorites:</Text>
          )
        }
        </View>
        <ScrollView>
          {
            value == "reviews" ? (
              <ScrollView>
    {
      reviews.length === 0 ? (
        <Text>No reviews yet!</Text>
      ) : (
        reviews.map((value, index) => (
          <Review key={index} itemName={value.item} rating={value.rating} caption={value.caption} id={value._id} photoString={value.photo} photoExists={(value.photo != "")}/>
        ))
      )
    }
  </ScrollView>
            ) : (
              <ScrollView>
    {
      favorites.length === 0 ? (
        <Text>No favorites yet!</Text>
      ) : (
        <View>{favoritesComponents}</View>
      )
    }
    
  </ScrollView>
            )
          }
        </ScrollView>
      </View>
      </View>
    </>
  );
};

export default Profile;
