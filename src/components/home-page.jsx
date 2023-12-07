import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


function DHallSelectionButton({ caption, image, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Image source={image} resizeMode='cover' style={styles.dhallButtonImage} />
            <View style={styles.centeredText}>
                <Text style={styles.dhallButtonFont}>{caption}</Text>
            </View>
        </TouchableOpacity>
    );
}

const BOTTOM_APPBAR_HEIGHT = 50;
const APPBAR_ACTION_SIZE = 40;
const APPBAR_ACTION_VPAD = 20;
const APPBAR_ACTION_HPAD = 10;
const APPBAR_BGCOLOR = '#3CADDE';
function BottomBar() {
    const navigation = useNavigation();
    const { bottom } = useSafeAreaInsets();

    return (
        <Appbar style={[styles.bottom, { height: BOTTOM_APPBAR_HEIGHT + bottom }]} safeAreaInsets={{ bottom }}>
            <Appbar.Action icon={require('../../assets/search-icon.png')} onPress={() => { navigation.navigate("Search Bar")}} style={{ marginRight: APPBAR_ACTION_HPAD, marginTop: APPBAR_ACTION_VPAD }} size={APPBAR_ACTION_SIZE} />
            <Appbar.Action icon={require('../../assets/add-icon.png')} onPress={() => { navigation.navigate("Upload Review") }} style={{ marginLeft: APPBAR_ACTION_HPAD, marginTop: APPBAR_ACTION_VPAD }} size={APPBAR_ACTION_SIZE} />
            <Appbar.Action icon={require('../../assets/profile-icon.png')} onPress={() => { navigation.navigate("Profile") }} style={{ marginLeft: APPBAR_ACTION_HPAD, marginTop: APPBAR_ACTION_VPAD }} size={APPBAR_ACTION_SIZE} />
        </Appbar>
    );
};


const LETTER_DAYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
export default function HomePage()
{
    const navigation = useNavigation();
    const checkEpicAndNavigate = (diningHall) =>
    {
        let date = new Date();
        let currentHour = date.getHours();
        let currentDay = date.getDay();
        let time = '';
        if (currentHour > 16)
            time = 'dinner';
        else if (currentHour > 10)
            time = 'lunch';
        else
            time = 'breakfast'
        // Epicuria only available Sun-Thu dinner time
        if (diningHall == 'epic' && !([0, 1, 2, 3, 4].includes(currentDay) && time == 'dinner'))
        {
            Alert.alert('Dining Hall Closed', 'Sorry, Epicuria is closed.\nHours is Mon-Thu at dinner time.');
            return;
        }
        // If dining hall is open, fetch from backend and populate the food list page
        axios.get('http://localhost:8081/api/catalog')
        .then(res =>
        {
            let listOfFood = res.data[0][LETTER_DAYS[currentDay]][time][diningHall];
            navigation.navigate('FoodList', listOfFood);
        })
        .catch(error => console.error(error));
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                <DHallSelectionButton caption="BPlate" image={require('../../assets/bplate-icon.png')} onPress={() => checkEpicAndNavigate('bplate')} />
                <DHallSelectionButton caption="De Neve" image={require('../../assets/deneve-icon.png')} onPress={() => checkEpicAndNavigate('deneve')} />
                <DHallSelectionButton caption="Epicuria" image={require('../../assets/epicuria-icon.png')} onPress={() => checkEpicAndNavigate('epic')} />
            </View>
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create(
    {
        bottom: {
            backgroundColor: APPBAR_BGCOLOR,
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
        },
        centeredText: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center'
        },
        dhallButtonFont: {
            fontSize: 40,
            color: 'white',
            fontFamily: 'Noteworthy-Bold',
            // fontWeight: 'bold'
        },
        dhallButtonImage: {
            width: 300,
            height: 100
        }
    });