import { StatusBar } from 'expo-status-bar';
import WelcomePageStyleSheet from './components/welcome-page.jsx';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './components/welcome-page.jsx';
import Profile from './components/profile.jsx';
import { PaperProvider } from 'react-native-paper';
import HomePage from './components/home-page.jsx';
import UploadReview from './components/upload-review.jsx';
import SignupPage from './components/signup-page.jsx';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Upload-Review" component={UploadReview} />
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Sign up for a new account" component={SignupPage}/>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />


        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
