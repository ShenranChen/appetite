import * as React from 'react';
import { View, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';


// const DismissKeyboard = ({ children }) => (
//   <TouchableWithoutFeedback 
//   onPress={() => Keyboard.dismiss()}> {children}
//   </TouchableWithoutFeedback>
//   );

const WelcomePage = () => {
  const [email, setEmail] = React.useState('');
  const hasErrors = () => {
    if (email.length == 0){
      return false;
    }
    return !email.includes('@');
  }
  const hasEmail = () => {
    return (email.length == 5);
  }
  
  const [pass, setPass] = React.useState('');

  const typeSome = () => {
    return email.length == 0 & pass.length== 0;
  }


 return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
       <View style={styles.input}> 
          <TextInput 
            label="Email" 
            activeUnderlineColor='#3CADDE'
            style={styles.email} 
            value={email} 
            onChangeText={newEmail => setEmail(newEmail)}/>
          <HelperText type="error" visible={hasErrors()}>
            Email address is invalid!
          </HelperText>
        <TextInput label="Password" 
          style={styles.password} 
          value={pass} 
          activeUnderlineColor='#3CADDE'
          onChangeText={newPass => setPass(newPass)} 
          secureTextEntry 
          right={<TextInput.Icon icon="eye" />}/>
      </View>
    
      <View style={styles.login} >
          <Button style={styles.button} mode='contained' disabled={email.length == 0 || pass.length== 0} onPress={() => {}}>Sign In</Button>
          <View style={styles.redirection}>
            <Button style={{marginLeft: 40}} textColor='#3CADDE' onPress={() => {}}>Sign Up</Button>
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