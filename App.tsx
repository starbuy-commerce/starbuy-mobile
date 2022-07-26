/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, {type PropsWithChildren} from 'react';
import {  Button,  StyleSheet } from 'react-native';

import HomeScreen from './components/views/Home';
import ItemScreen from './components/views/Item';
import OrderCheckout from './components/views/OrderCheckout';
import Orders from './components/views/Orders'
import Cart from './components/views/Cart';
import User from './components/views/User';
import Settings from './components/views/Settings';
import LoginForm from './components/views/LoginForm';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      
        <Stack.Screen
          name="Item"
          component={ItemScreen}
        />
      
        <Stack.Screen
          name="Orders"
          component={Orders}
        />
      
        <Stack.Screen
          name="Checkout"
          component={OrderCheckout}
        />
       
        <Stack.Screen
          name="Cart"
          component={Cart}
        />
      
      <Stack.Screen
        name="User"
        component={User}
      />
      
      <Stack.Screen
      name="Settings"
      component={Settings}
    />  
      <Stack.Screen
      name="LoginForm"
      component={LoginForm}
    /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
