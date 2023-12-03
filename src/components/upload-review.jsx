import * as React from 'react';
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { configureFonts, MD3LightTheme, PaperProvider, Button, TextInput } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios"

const UploadReview = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [selectedFoodItem, setSelectedFoodItem] = useState(null);
    const defaultLabel = 'Select An Item to Review: ';
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('')

    useEffect(() => {
        axios.get("http://localhost:8081/api/food")
            .then(response => setFoodItems(response.data))
            .catch(error => console.error("upload review page food fetch error " + error));
    }, []);

    const handleDropdownChange = (foodItem) => {
        setSelectedFoodItem(foodItem ? foodItem._id : null);
        console.log(`Selected: ${foodItem ? foodItem.name : 'None'}`);
    };

    const handleRating = (ratingValue) => {
        // Update the local state
        setRating(ratingValue);
    }

    const handleSubmitReview = async () => {
        try {
            if (!selectedFoodItem) {
                console.error("No food item selected.");
                return;
            }

            const response = await fetch("http://localhost:8081/api/reviews", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedFoodItem: selectedFoodItem,
                    reviewText: reviewText,
                    rating: rating,
                }),
            });

            const data = await response.json(); // assuming the response is JSON

            console.log("response json data:", data); // Handle the response as needed
        } catch (error) {
            console.error("Review submission error:", error);
        }
    };

    return (
        <View style={styles.center}>
            <Dropdown
                style={styles.dropdown}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                data={foodItems}
                search
                maxHeight={400}
                labelField="name"
                valueField="_id" // uniquely identifies an item
                placeholder="Select An Item to Review"
                searchPlaceholder="Search..."
                onChange={handleDropdownChange}
            //value={value}
            />
            <AirbnbRating
                style={{ alignSelf: 'center' }}
                count={5}
                reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
                reviewSize={18}
                defaultRating={0}
                size={20}
                onFinishRating={handleRating}
            />
            <TextInput
                style={{ width: '100%', height: 200, /*alignItems: 'center'*/ }}
                multiline={true}
                mode="outlined"
                label='Write Your Review Here...'
                placeholder='Type Something...'
                selectionColor='#3BADDE'
                textColor='black'
                activeOutlineColor='#3BADDE'
                onChangeText={(reviewText) => { setReviewText(reviewText) }}
                backgroundColor='#F7FAFB'
                theme={{ colors: { primary: 'gray' } }}
            />
            <Button icon="camera" mode="outlined" onPress={() => console.log('Pressed upload photo')} textColor='#3BADDE' theme={{ colors: { outline: '#3BADDE' } }} style={styles.button} contentStyle={{ width: 335 }}>
                Upload a photo
            </Button>
            <Button mode="contained" onPress={handleSubmitReview} buttonColor='#3BADDE' style={styles.button} contentStyle={{ width: 335 }}>
                Submit
            </Button>
        </View>
    );
}

export default UploadReview;

const styles = StyleSheet.create({
    center: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20,
        justifyContent: 'center',
        justifyContent: 'space-between',
        //alignItems: 'center',
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'flex-end'
    },
    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderRadius: 8,
        borderWidth: 0.8,
        paddingHorizontal: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
        borderTopWidth: 0.3,
        //margin: 5,
    },
    inputSearchStyle: { // for the search bar 
        height: 40,
        fontSize: 16,
    },
});