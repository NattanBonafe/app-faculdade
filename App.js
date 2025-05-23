import React, { useEffect } from 'react';
// import OneSignal from 'react-native-onesignal';
import LoginScreen from './screens/LoginScreen';
import ProjetosScreen from './screens/ProjetosScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // console.log()
    // OneSignal.setAppId("SEU_ONESIGNAL_APP_ID");
    // OneSignal.promptForPushNotificationsWithUserResponse();
    // OneSignal.setNotificationOpenedHandler(notification => {
    //   console.log("Notificação aberta:", notification);
    // });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}  // Remover o título
        />
        <Stack.Screen
          name="Todos os Projetos"
          component={ProjetosScreen} 
          options={{ headerShown: false }}  // Remover o título
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}