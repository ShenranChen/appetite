import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { IconButton } from 'react-native-paper';
import Review from '../components/review.jsx'


export default function FoodPage(props) {
    let foodID = props.route.params;
    const [foodName, setFoodName] = useState('');
    const [reviewList, setReviewList] = useState([]);
    const [ratingsComp, setRatingsComp] = useState(<></>);
    const [favorited, setFavorited] = useState(false);
  
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
    }, [foodID]);

    const addFavorite = async () => {
      try {
        console.log("Does nothing for now");
        // if it's favorited right now and user unfavorited do this:
        if (favorited) { // currently already favorited so do unfavorited stuff
          
        }
        // else add favorite
        else {

        }
        setFavorited(!favorited);
      } catch(error) {
        console.error("Error handling adding favorites");
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
                    onPress={addFavorite}
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