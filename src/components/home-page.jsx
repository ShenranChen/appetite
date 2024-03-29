import * as React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import cheerio from 'cheerio';
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

// Web scraping functions
async function fetchHTML(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching the HTML:', error);
        return null;
    }
}

const url = 'https://menu.dining.ucla.edu/Menus/Today';


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
        let epicClosed = false;
        if (currentHour > 16)
            time = 'dinner';
        else if (currentHour > 10)
            time = 'lunch';
        else
            time = 'breakfast'
        // Epicuria only available Sun-Thu dinner time
        if (diningHall == 'epicuria' && !([0, 1, 2, 3, 4].includes(currentDay) && time == 'dinner'))
        {
            epicClosed = true;
            Alert.alert('Dining Hall Closed', 'Sorry, Epicuria is closed.\nHours is Mon-Thu at dinner time.');
            return;
        }

        // Web scrape
        axios.get(url)
        .then(res =>
        {
            let html = res.data;
            const $ = cheerio.load(html);
            let element = null;

            if (time == 'breakfast' && diningHall == 'deneve')
            {
                element = $('h2#page-header+div+div')['0'];
            }
            else if (time == 'lunch' && diningHall == 'deneve')
            {
                element = $('h2#page-header+div+div')['1'];
            }
            else if (time == 'dinner' && diningHall == 'deneve')
            {
                if (epicClosed)
                {
                    element = $('h2#page-header+div+div')['2'];
                }
                else
                {
                    element = $('h2#page-header+div+div+div')['2'];
                }
            }
            else if (time == 'breakfast' && diningHall == 'bplate')
            {
                element = $('h2#page-header+div+div+div')['0'];
            }
            else if (time == 'lunch' && diningHall == 'bplate')
            {
                element = $('h2#page-header+div+div+div')['1'];
            }
            else if (time == 'dinner' && diningHall == 'bplate')
            {
                if (epicClosed)
                {
                    element = $('h2#page-header+div+div+div')['2'];
                }
                else
                {
                    element = $('h2#page-header+div+div+div+div')['0'];
                }
            }
            else if (time == 'dinner' && diningHall == 'epicuria')
            {
                element = $('h2#page-header+div+div')['2'];
            }
            
            let listOfFood = [];
            $(element).find('>ul>li>ul>li>span>a').each((index, subElement) => {
                let foodName = $(subElement).text();
                console.log(foodName);
                foodName = foodName.replace('/', '%2F');
                axios.get(`http://localhost:8081/api/food/${foodName}`)
                .then(res =>
                {
                    listOfFood.push(res.data['id']);
                })
                .catch(error => console.error(error));
            });
            navigation.navigate('FoodList', listOfFood);
        })
        .catch(error => console.error(error));

        /* Old code
        // If dining hall is open, fetch from backend and populate the food list page
        axios.get('http://localhost:8081/api/catalog')
        .then(res =>
        {
            let listOfFood = res.data[0][LETTER_DAYS[currentDay]][time][diningHall];
            navigation.navigate('FoodList', listOfFood);
        })
        .catch(error => console.error(error));
        */
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 100 }}>
                <DHallSelectionButton caption="BPlate" image={require('../../assets/bplate-icon.png')} onPress={() => checkEpicAndNavigate('bplate')} />
                <DHallSelectionButton caption="De Neve" image={require('../../assets/deneve-icon.png')} onPress={() => checkEpicAndNavigate('deneve')} />
                <DHallSelectionButton caption="Epicuria" image={require('../../assets/epicuria-icon.png')} onPress={() => checkEpicAndNavigate('epicuria')} />
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