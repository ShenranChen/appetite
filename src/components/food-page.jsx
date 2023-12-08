import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import Review from '../components/review.jsx'
import { useUser } from './global-user.jsx'


export default function FoodPage(props) {
    let foodID = props.route.params;
    const [foodName, setFoodName] = useState('');
    const [reviewList, setReviewList] = useState([]);
    const [ratingsComp, setRatingsComp] = useState(<></>);
    const [favorited, setFavorited] = useState(false);
    const [favorites, setFavorites] = useState([])
    const [favoriteComp, setFavoriteComp] = useState(<></>)
    const {user} = useUser();

    useEffect(() => {
      const fetchData = async () => {
        try {
          const foodResponse = await axios.get('http://localhost:8081/api/food');
          const foodData = foodResponse.data.find((data) => data._id === foodID);
  
          if (foodData) {
            setFoodName(foodData.name);
  
            const reviewsData = await Promise.all(
              foodData.reviews.map((reviewID) =>
                axios.get(`http://localhost:8081/api/reviews/${reviewID}`)
              )
            );
  
            let reviewList = reviewsData.map((res) => (
              <Review
                itemName={res.data.item}
                rating={res.data.rating}
                caption={res.data.caption}
                key={res.data._id}
                id={res.data._id}
                photoExists={(res.data.photo != "")}
                photoString={res.data.photo}
              />
            ));

            //use get API to get ALL currUser's favorite foods
            let favData = await axios.get(`http://localhost:8081/api/users/${user}`);
            setFavorites(favData.data.favoriteFoods);
            /*
            .then(response => {
              setFavorites(response.data.favoriteFoods); //list of favorite food IDs
            })
            */
            if (favData.data.favoriteFoods.includes(foodID)) {
              setFavorited(true);
            }
            else {
              setFavorited(false);
            }

            if (reviewList.length == 0)
            {
                reviewList = <Text style={styles.ratingFont}>No Reviews Yet</Text>;
                setRatingsComp(<></>);
            }
            else
            {
                setRatingsComp(
                    <View>
                        <Text style={styles.ratingFont}>Average Ratings:</Text>
                        <AirbnbRating
                            style={{ alignSelf: 'center' }}
                            count={5}
                            reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
                            reviewSize={22}
                            defaultRating={foodData.averageRating}
                            size={24}
                            isDisabled={true}
                        />
                    </View>);
            }
            setReviewList(reviewList);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [foodID, user, favorited]); 

    
    

    const handleFavorite = async () => {
      let fav;
      if (!favorited) { //previous
        //let prevFavorites = favorites;
        // If user favorites the item, add to array
        console.log("Previous favorites (favorites)", favorites)
        setFavorites(prevFavorites => [...prevFavorites, foodID]);
        fav = [...favorites, foodID];
      } else {
        // If user unfavorites the item, remove from array
        setFavorites(prevFavorites => prevFavorites.filter((id) => id !== foodID));
        fav = favorites.filter((id) => id !== foodID);
      }
      setFavorited(!favorited);
      console.log("in handle favorite");
      const favoriteData = {
        favArr: fav
      }
      try {
        console.log("favorites state arr:", favorites);
        const response = axios.post(`http://localhost:8081/api/users/${user}/favoriteFoods`, favoriteData, {
          headers: {
                  'Content-Type': 'application/json',
                    }
        });
      }
      catch (error) {
        console.error("Error editing fav array: ", error)
      }
    };

  
    return (
        <ScrollView style={{ flex: 1, margin: 20 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <Text style={styles.foodNameFont}>{foodName}</Text>
                <IconButton
                    icon={favorited ? 'bookmark' : 'bookmark-outline'}
                    iconColor="#3BADDE"
                    size={50}
                    onPress={handleFavorite}
                />
                {ratingsComp}
                {reviewList}
            </View>
        </ScrollView>
    );
  }

const styles = StyleSheet.create(
{
    foodNameFont: {
        fontSize: 40,
        color: 'black',
        textAlign: 'center'
    },
    ratingFont: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center'
    }
});