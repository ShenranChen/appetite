//this is just a frontend comp to structure a review

import * as React from "react";
import { useState, useEffect } from "react";
import { View, Image } from "react-native"
import { Text, Card } from 'react-native-paper'
import { IconButton, MD3Colors } from 'react-native-paper';
import axios from "axios"

const Review = ({ itemName, rating, caption, id }) => {

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [reviews, setReviews] = useState([]);

    // get the reviews by id 
    useEffect(() => {
        axios.get(`http://localhost:8081/api/reviews/${id}`)
            .then(response => {
                const reviewData = response.data;
                setReviews(reviewData);
                setLikeCount(reviewData.likes);
            })
            .catch(error => {
                console.error("Error fetching review:", error);
                // Handle the error (e.g., display an error message to the user)
            });
    }, [id]);


    const handleLikePress = async () => {
        try {
            let response;
            console.log(reviews)
            if (liked) {
                // If liked, send a request to decrement likes
                response = await fetch(`http://localhost:8081/api/reviews/${id}/unlike`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //
                    }),
                });
                console.log('Response status:', response.status);
            } else { //unliked so request to increment likes 
                response = await fetch(`http://localhost:8081/api/reviews/${id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        //
                    }),
                });
                console.log('Response status:', response.status);
            }

            // response gives the updated review with likes
            console.log('im here');
            const updatedReview = await response.json();
            console.log(updatedReview);

            setLiked(!liked);
            setLikeCount(updatedReview.likes);

        } catch (error) {
            console.error("Error updating likes:", error);
        }
    };

    return (
        <>
            <Card>
                <Card.Content>
                    <View style={{ flex: 0, alignItems: "start", justifyContent: "start", margin: 10 }}>
                        <Text variant="titleLarge">{itemName}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                [...Array(rating),].map((value, index) => (
                                    <Image key={index}
                                        source={require('../../assets/star-icon.png')}
                                        style={{ width: 20, height: 20 }} />
                                ))
                            }
                        </View>
                    </View>
                    <View style={{ flex: 0, alignItems: "start", justifyContent: "end", margin: 10, gap: 10 }}>
                        <Text variant="bodyMedium">{caption}</Text>
                        <Image
                            source={require('../../assets/bplate-icon.png')}
                            style={{ width: 150, height: 75, borderRadius: 10 }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <IconButton
                            icon={liked ? 'heart' : 'heart-outline'}
                            iconColor="#3BADDE"
                            size={20}
                            onPress={handleLikePress}
                        />
                        <Text>{likeCount}</Text>
                    </View>
                </Card.Content>

            </Card>


        </>
    )
}

export default Review