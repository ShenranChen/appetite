import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { configureFonts, MD3LightTheme, PaperProvider, Button, TextInput } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';

const UploadReview = () => {
    return (
        <View style={styles.centerText}>
            <Text style={{ alignSelf: 'flex-start' }}>You're Reviewing...</Text>
            <AirbnbRating
                style={{ alignSelf: 'center' }}
                count={5}
                reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
                reviewSize={20}
                defaultRating={0}
                size={20}
            />
            <Button icon="camera" mode="outlined" onPress={() => console.log('Pressed upload photo')} textColor='#3BADDE' theme={{ colors: { outline: '#3BADDE' } }} style={styles.button}>
                Upload a photo
            </Button>
            <TextInput
                style={{ marginTop: 20, width: '100%', height: 250 }}
                multiline={true}
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
    centerText: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    button: {
        alignSelf: 'center',
        marginTop: '10%',
        justifyContent: 'flex-end'
    },
});