import * as React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Review from '../components/review.jsx'


export default function FoodPage(props) {
    let foodID = props.route.params;
    const ratingsComponent = 
    <View>
        <Text style={styles.ratingFont}>Average Ratings:</Text>
        <AirbnbRating
            style={{ alignSelf: 'center' }}
            count={5}
            reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
            reviewSize={22}
            defaultRating={avgRating}
            size={24}
            isDisabled={true}
        />
    </View>;
    const [foodName, setFoodName] = useState('');
    const [avgRating, setAvgRating] = useState(0);
    const [reviewList, setReviewList] = useState([]);
    const [ratingsComp, setRatingsComp] = useState(ratingsComponent);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const foodResponse = await axios.get('http://localhost:8081/api/food');
          const foodData = foodResponse.data.find((data) => data._id === foodID);
  
          if (foodData) {
            setFoodName(foodData.name);
            setAvgRating(foodData.avgRating);
  
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
                setRatingsComp(ratingsComponent);
            setReviewList(reviewList);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, [foodID]);
  
    return (
        <ScrollView style={{ flex: 1, margin: 20 }}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20 }}>
                <Text style={styles.foodNameFont}>{foodName}</Text>
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