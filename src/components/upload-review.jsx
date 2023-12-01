import * as React from 'react';
import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { configureFonts, MD3LightTheme, PaperProvider, Button, TextInput } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Dropdown } from 'react-native-element-dropdown';
import axios from "axios"

const UploadReview = () => {
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/api/food")
            .then(response => setFoodItems(response.data), console.log('food:', foodItems))
            .catch(error => console.error("AAA" + error));
    }, []);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },

    ];

    const [selectedItem, setSelectedItem] = useState(null);
    const handleDropdownChange = (item) => {
        setSelectedItem(item.value);
        console.log(`Selected: ${item.label}`);
    };
    const defaultLabel = 'Select An Item to Review: ';
    const renderLabel = () => {
        if (selectedItem !== defaultLabel) {
            return (
                <Text style={styles.label}>
                    {data.find((item) => item.value === selectedItem)?.label}
                </Text>
            );
        }
        return <Text style={styles.label}>{defaultLabel}</Text>;
    };


    return (
        <View style={styles.center}>
            {renderLabel()}
            <Dropdown
                style={styles.dropdown}
                inputSearchStyle={styles.inputSearchStyle}
                placeholderStyle={styles.placeholderStyle}
                // selectedTextStyle={styles.selectedTextStyle}
                data={data}
                search
                maxHeight={400}
                labelField="label"
                valueField="value"
                placeholder="Select An Item to Review"
                searchPlaceholder="Search..."
                onChange={handleDropdownChange}
            //value={value}
            />
            <Button icon="camera" mode="outlined" onPress={() => console.log('Pressed upload photo')} textColor='#3BADDE' theme={{ colors: { outline: '#3BADDE' } }} style={styles.button}>
                Upload a photo
            </Button>
            <AirbnbRating
                style={{ alignSelf: 'center', marginBottom: 20 }}
                count={5}
                reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
                reviewSize={20}
                defaultRating={0}
                size={20}
            />
            <TextInput
                style={{ width: '100%', height: 200, alignItems: 'center' }}
                multiline={true}
                mode="outlined"
                label='Write Your Review'
                placeholder='Type Something...'
                activeUnderlineColor='#3BADDE'
                selectionColor='#3BADDE'
                textColor='black'
                //backgroundColor='#F4F0F0'
                //theme={{ colors: { primary: '#fff' } }}
                onChangeText={() => { }}
            />
            <Button mode="contained" onPress={() => console.log('submit')} buttonColor='#3BADDE' style={styles.button}>
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
        height: 20,
        borderColor: '#F5F3F3',
        borderWidth: 50,
        borderRadius: 4,
        paddingHorizontal: 4,
    },
    inputSearchStyle: { // for the search bar 
        height: 40,
        fontSize: 16,
    },
});