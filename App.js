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
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import FoodListPage from './src/components/foodlist-page.jsx'
import FoodPage from './src/components/food-page.jsx'
import BadgePage from './src/components/badge-page.jsx'
import Search from './src/components/search-bar.jsx'
import { UserProvider } from './src/components/global-user.jsx';

const Stack = createNativeStackNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400',
      }}
    />
  )
  // Add configurations for other toast types if needed
};


export default function App() {
    // options={{ headerShown: false }}
  return (
    <PaperProvider>
       <UserProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Upload Review" component={UploadReview} />
            <Stack.Screen name="Welcome" component={WelcomePage} />
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="Sign Up" component={SignupPage}/>
            <Stack.Screen name="Home" component={HomePage} options={{headerBackVisible:false}}/>
            <Stack.Screen name="FoodList" component={FoodListPage}/>
            <Stack.Screen name="Food" component={FoodPage}/>
            <Stack.Screen name="Badge" component={BadgePage}/>
            <Stack.Screen name="Search Bar" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast /*config={toastConfig}*/ />
      </UserProvider>
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
