import { StatusBar } from 'expo-status-bar';
import WelcomePageStyleSheet from './src/components/welcome-page.jsx';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from './src/components/welcome-page.jsx';
import Profile from './src/components/profile.jsx';
import HomePage from './src/components/home-page.jsx';
import UploadReview from './src/components/upload-review.jsx';
import SignupPage from './src/components/signup-page.jsx';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Home">
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
