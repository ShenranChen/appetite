import * as React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet, Alert } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper'
import axios from "axios"
import { useUser } from './global-user.jsx'
import Review from './review.jsx'


// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback 
//   onPress={() => Keyboard.dismiss()}> {children}
//   </TouchableWithoutFeedback>
//   );

const WelcomePage = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const { user, updateUser } = useUser();

  const hasErrors = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // console.log(email.length)
    if (email.length == 0){
      return false;
    }
    return !emailRegex.test(email);
  }

  const handleSignIn = async () => {
    try {
      // Make API request to check user credentials
      const lowercasedEmail = email.toLowerCase();
      const response = await axios.post('http://localhost:8081/api/check-user', {
        email: lowercasedEmail,
        password: pass,
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.message === 'Found') {
        updateUser(response.data.userName);

        // Navigate to home upon successful sign-in
        navigation.navigate('Home');
      } else if (response.data.message === 'No Match'){
        // No user found, display an alert message
        Alert.alert("Error signing in", 'No account associated with email and/or password. \n\n Please try again or click "Forgot Password?"' );
      }
    }
    catch (error) {
      console.error('Error signing in:', error);
    }
  };


 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
       <View style={styles.input}> 
          <TextInput 
            label="Email" 
            activeUnderlineColor='#3CADDE'
            style={styles.email} 
            value={email} 
            onChangeText={newEmail => setEmail(newEmail)}
            keyboardType="email-address"
            autoCapitalize="none"/>
          <HelperText type="error" visible={hasErrors()}>
            Email address is invalid!
          </HelperText>
        <TextInput label="Password" 
          style={styles.password} 
          value={pass} 
          activeUnderlineColor='#3CADDE'
          onChangeText={newPass => setPass(newPass)} 
          secureTextEntry={!showPass}
          right={<TextInput.Icon icon={showPass?"eye-off": "eye"} onPress={()=> {setShowPass(!showPass)}} />}/>
      </View>
    
      <View style={styles.login} >
          <Button style={styles.button} mode='contained' disabled={email.length == 0 || pass.length== 0} onPress={handleSignIn}>Sign In</Button>
          <View style={styles.redirection}>
            <Button style={{marginLeft: 40}} textColor='#3CADDE' onPress={() => {navigation.navigate('Sign Up')}}>Sign Up</Button>
            <Button style={{marginLeft: 90}} textColor='#3CADDE'onPress={() => {}}> Forgot Password?</Button>
          </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'green',
  },
  input: {
    flex: .75,
    padding: 5,
    justifyContent: 'top',
    marginTop: 10,
    // backgroundColor: 'red',
  },
  login: {
    flex: 2,
    // backgroundColor: 'green'
  },
  button: {
    backgroundColor: '#3CADDE',
    marginHorizontal: 40,
    marginBottom: 10
  },
  email: {
    backgroundColor: 'transparent',
    marginHorizontal: 10
  },
  password: {
    backgroundColor: 'transparent',
    marginHorizontal: 10,
    marginBottom: 20
  },
  redirection: {
    flexDirection:'row'
  }
  
});

export default WelcomePage;