import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import Category from '../screens/Home/Category';
import SubCategory from '../screens/Home/SubCategory';
import List from '../screens/Home/List';

const Stack = createNativeStackNavigator();




export default function MainNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:true}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Category" component={Category}/>
            <Stack.Screen name="SubCategory" component={SubCategory}/>
            <Stack.Screen name="List" component={List}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}


