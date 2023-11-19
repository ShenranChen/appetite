import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePageStyleSheet from './components/welcome-page.jsx';
import UploadReview from './components/upload-review.jsx';
import { PaperProvider } from 'react-native-paper';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={UploadReview} />
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
