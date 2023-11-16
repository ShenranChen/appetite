import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { configureFonts, MD3LightTheme, PaperProvider, Button, TextInput } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';

const UploadReview = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 20 }}>
            <Text style={{ alignSelf: 'flex-start' }}>You're Reviewing...</Text>
            <AirbnbRating
                style={{ alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}
                count={5}
                reviews={["Terrible", "Bad", "Meh", "Pretty Good", "Amazing"]}
                defaultRating={0}
                size={20}
            />
            <TextInput
                style={{ marginTop: 20, width: '100%', height: 350 }}
                label="Write Your Review"
                multiline={true}
                textColor='black'
                backgroundColor='3BADDE'
                onChangeText={text => console.log(text)}
            />
            <Button mode="contained" onPress={() => console.log('submit')} buttonColor='#3BADDE' style={{ alignSelf: 'center', marginTop: '10%', justifyContent: 'flex-end' }}>
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
        paddingTop: 20
    },
});