/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux'
import store from "./src/core/store"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MainNavigation from './src/navigation/Main';
axios.defaults.baseURL = "http://46.101.204.245:9000/";



const App = ()=>{
  return(
    <Provider store={store}>
      <MainNavigation/>
    </Provider>
  )
}



export default App;
