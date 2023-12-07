import * as React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

const signUpStyles = StyleSheet.create({
    button: {
        backgroundColor: '#18aff0',
        alignSelf: 'center',
        marginTop: '3%',
        justifyContent: 'flex-end'
    },
    uploadPicture: {
        alignSelf: 'center',
        marginTop: '5%',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: 18,
    },
    textInput: {
        backgroundColor: 'transparent',

    },
    dropdown: {
        margin: 2,
        marginTop: 20,
        //height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
        marginLeft: 14,
        marginBottom: 15,
        color: '#444444',
    },
    selectedTextStyle: {
        fontSize: 17,
        marginLeft: 15,
        marginBottom: 15,
        color: '#444444'
    },
    showAfterSubmit: {
        fontSize: 12,
        textColor: '#ff0000',
    },
    image: {
        width: 100, 
        height: 100,
        alignSelf: 'center',
        marginTop: '3%',
    },
});

const SignupPage = () => {
    const [first, setFirst] = React.useState("");
    const [last, setLast] = React.useState("");
    const [uclaEmail, setUclaEmail] = React.useState("");
    const [yr, setYr] = React.useState(null);
    const [pw, setPw] = React.useState("");
    const [reEnterPassword, setReEnterPassword] = React.useState("");
    const [revs, setRevs] = React.useState([]);
    const [favFoods, setFavFoods] = React.useState([]);
    const [badges, setBadges] = React.useState([]);
    const [profilePicture, setProfilePicture] = React.useState(null);

    const [showPassword, setShowPassword] = React.useState(false); 
    const [showReEnterPassword, setShowReEnterPassword] = React.useState(false); 

    const [showIncompleteInfo, setShowIncompleteInfo] = React.useState(false)
    const [showIncorrectPassword, setShowIncorrectPassword] = React.useState(false)

    const [userTakenText, setUserTakenText] = React.useState(false);

    const [createdAccMessage, setCreatedAccMessage] = React.useState(false);

    const yearData = [
        { label: 'Select Year', value: null },
        { label: '2027', value: 1 },
        { label: '2026', value: 2 },
        { label: '2025', value: 3 },
        { label: '2024', value: 4 },
    ];

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                // await requestPermissions();
                console.log('Permission denied');
                return; // Don't proceed if permissions are not granted
            }
            // else
            console.log('Permission granted');
            const options = {
                mediaType: ImagePicker.MediaTypeOptions.Images,
                base64: true, // request image as base64 format
            };

            const image = await ImagePicker.launchImageLibraryAsync(options);
            if (image.canceled) {
                console.log("image picker cancelled")
                return;
            }
            else {
                const selectedImage = image.assets[0];
                setProfilePicture({
                    uri: selectedImage.uri,
                    base64: selectedImage.base64,
                  });
                console.log("Selected Image: ", selectedImage.uri, "and base 64: ", selectedImage.base64);
                return;
            }

        } catch (error) {
            console.error(error);
        }
    };

    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const toggleShowReEnterPassword = () => {
        setShowReEnterPassword(!showReEnterPassword);
    };

    const convertEmail = () => {
        const convertedEmail = (uclaEmail.toLowerCase()).trim()
        setUclaEmail(convertedEmail);
    };

    const storeUser = async () => {
        try {
            console.log("storing");
            let photoBase64String = "";

            if (profilePicture) {
                // convert image to base64
                photoBase64String = profilePicture.base64;
                console.log("photoBase64String", profilePicture.base64);
                console.log("uri:", profilePicture.uri);
            }

            const userData = {
                firstName: first,
                lastName: last,
                email: uclaEmail,
                password: pw,
                profilePhoto: photoBase64String,
                reviews: revs,
                favoriteFoods: favFoods,
                badges: badges,
                year: yr,
            };
            console.log("got here");
            const response = await axios.post('http://localhost:8081/api/sign-up', userData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.data.message === 'Found') {
                setUserTakenText(true);
                setCreatedAccMessage(false);
                console.log("User already exists");
            }
            else {
                setUserTakenText(false);
                setCreatedAccMessage(true);
                console.log("User added successfully: ", response.data);
            }
        } catch (error) {
            console.error("Error adding user: ", error)
        }
    };

    const handleSignUp = () => {
        if (first === "" || last === "" || 
        uclaEmail === "" || yr === null || pw === "" || 
        reEnterPassword === "") {
            setShowIncompleteInfo(true);
            setShowIncorrectPassword(false);
            setCreatedAccMessage(false);
            setUserTakenText(false);
        }
        else if (pw != reEnterPassword) {
            setShowIncompleteInfo(false);
            setShowIncorrectPassword(true);
            setCreatedAccMessage(false);
            setUserTakenText(false);
        }
        else { // otherwise everyting is satisfied
            setShowIncompleteInfo(false);
            setShowIncorrectPassword(false);
            convertEmail();
            storeUser();
        }
    };

    return (
        <ScrollView>
            <KeyboardAwareScrollView extraHeight={10}>
                <View style = {{padding: 10}}>
                    {/* <Text variant="bodyLarge" style = {signUpStyles.text}>First Name: *</Text> */}
                    <TextInput
                        label="First Name* "
                        value={first}
                        // mode = "outlined"
                        autoFocus ={true}
                        activeUnderlineColor='#3CADDE'
                        style = {signUpStyles.textInput}
                        onChangeText={first => setFirst(first)}
                    />
{/* 
                    <Text variant="bodyLarge" style = {signUpStyles.text}>Last Name: *</Text> */}
                    <TextInput
                        label="Last Name*"
                        value={last}
                        // mode = "outlined"
                        autoFocus ={true}
                        activeUnderlineColor='#3CADDE'
                        style = {signUpStyles.textInput}
                        onChangeText={last => setLast(last)}
                    />

                    {/* <Text variant="bodyLarge" style = {signUpStyles.text}>UCLA email: *</Text> */}
                    <TextInput
                        label="UCLA Email*"
                        value={uclaEmail}
                        // mode = "outlined"
                        activeUnderlineColor='#3CADDE'
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        onChangeText={uclaEmail => setUclaEmail(uclaEmail)}
                    />

                    {/* <Text variant="" style = {signUpStyles.text}>Year: *</Text> */}
                    <Dropdown
                        style={signUpStyles.dropdown}
                        placeholderStyle={signUpStyles.placeholderStyle}
                        selectedTextStyle={signUpStyles.selectedTextStyle}
                        data={yearData}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Year*"
                        value={yr}
                        onChange={item => {
                            setYr(item.value);
                        }}
                    />

                    {/* <Text variant="bodyLarge" style = {signUpStyles.text}>Password: *</Text> */}
                    <TextInput
                        label="Password*"
                        value={pw}
                        // mode = "outlined"
                        activeUnderlineColor='#3CADDE'
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        secureTextEntry = {!showPassword}
                        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress = {toggleShowPassword}/>}
                        onChangeText={pw => setPw(pw)}
                    />

                    {/* <Text variant="bodyLarge" style = {signUpStyles.text}>Re-enter Password: *</Text> */}
                    <TextInput
                        label="Re-enter Password*"
                        value={reEnterPassword}
                        // mode = "outlined"
                        activeUnderlineColor='#3CADDE'
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        secureTextEntry = {!showReEnterPassword}
                        right={<TextInput.Icon icon={showReEnterPassword ? 'eye-off' : 'eye'} onPress = {toggleShowReEnterPassword}/>}
                        onChangeText={reEnterPassword => setReEnterPassword(reEnterPassword)}
                    />
                    <Button testID="uploadPicture" icon="camera" mode="outlined" onPress={pickImage} textColor='#3BADDE' theme={{ colors: { outline: '#3BADDE' } }} style={signUpStyles.uploadPicture}>
                        Upload a profile photo (optional)
                    </Button>
                    {profilePicture && <Image source={{ uri: profilePicture.uri }} style={signUpStyles.image} />}
                    <Button mode="contained" onPress={handleSignUp} style = {signUpStyles.button}>
                        Sign up
                    </Button>

                    {showIncompleteInfo && <Text testID="showAfterSubmit" variant="bodyLarge" style = {signUpStyles.text}>*Please fill out all fields</Text>}
                    {showIncorrectPassword && <Text testID="showAfterSubmit" variant="bodyLarge" style = {signUpStyles.text}>*Passwords don't match</Text>}
                    {userTakenText && <Text testID="showAfterSubmit" variant="bodyLarge" style = {signUpStyles.text}>*User already has an account under email address</Text>}
                    {createdAccMessage && <Text testID="showAfterSubmit" variant="bodyLarge" style = {signUpStyles.text}>*Successfully created an account! Go back to login page to log on</Text>}
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}

export default SignupPage;