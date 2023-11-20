import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { Text, TextInput, Button } from 'react-native-paper';

/* this is to worry about later
const signUpTheme = {

}*/

const signUpStyles = StyleSheet.create({
    button: {
        backgroundColor: '#18aff0',
    },
    text: {
        fontSize: 18,
    },
    textInput: {

    }
});

const SignupPage = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [uclaEmail, setUclaEmail] = React.useState("");
    const [year, setYear] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [reEnterPassword, setReEnterPassword] = React.useState("");

    const [showPassword, setShowPassword] = React.useState(false); 
    const [showReEnterPassword, setShowReEnterPassword] = React.useState(false); 


    const toggleShowPassword = () => { 
        setShowPassword(!showPassword); 
    }; 

    const toggleShowReEnterPassword = () => {
        setShowReEnterPassword(!showReEnterPassword);
    };


    return (
        <ScrollView>
            <KeyboardAwareScrollView /*extraHeight={200}*/>
                <View style = {{padding: 10}}>
                    <Text variant="bodyLarge" style = {signUpStyles.text}>First Name: </Text>
                    <TextInput
                        label="First Name"
                        value={firstName}
                        mode = "outlined"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        onChangeText={firstName => setFirstName(firstName)}
                    />

                    <Text variant="bodyLarge" style = {signUpStyles.text}>Last Name: </Text>
                    <TextInput
                        label="Last Name"
                        value={lastName}
                        mode = "outlined"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        onChangeText={lastName => setLastName(lastName)}
                    />

                    <Text variant="bodyLarge" style = {signUpStyles.text}>UCLA email: </Text>
                    <TextInput
                        label="UCLA Email"
                        value={uclaEmail}
                        mode = "outlined"
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        onChangeText={uclaEmail=> setUclaEmail(uclaEmail)}
                    />

                    <Text variant="" style = {signUpStyles.text}>Year: </Text>
                    <TextInput
                        label="Expected Graduation year, e.g., 2026"
                        value={year}
                        mode = "outlined"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        onChangeText={year => setYear(year)}
                    />

                    <Text variant="bodyLarge" style = {signUpStyles.text}>Password: </Text>
                    <TextInput
                        label="Password"
                        value={password}
                        mode = "outlined"
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        secureTextEntry = {!showPassword}
                        right={<TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress = {toggleShowPassword}/>}
                        onChangeText={password => setPassword(password)}
                    />

                    <Text variant="bodyLarge" style = {signUpStyles.text}>Re-enter Password: </Text>
                    <TextInput
                        label="Re-enter Password"
                        value={reEnterPassword}
                        mode = "outlined"
                        autoCapitalize="none"
                        autoFocus ={true}
                        style = {signUpStyles.textInput}
                        secureTextEntry = {!showReEnterPassword}
                        right={<TextInput.Icon icon={showReEnterPassword ? 'eye-off' : 'eye'} onPress = {toggleShowReEnterPassword}/>}
                        onChangeText={reEnterPassword=> setReEnterPassword(reEnterPassword)}
                    />
                    <Button mode="contained" onPress={() => console.log('Pressed')} style = {signUpStyles.button}>
                        Sign up
                    </Button>
                </View>
            </KeyboardAwareScrollView>
        </ScrollView>
    );
}

export default SignupPage;