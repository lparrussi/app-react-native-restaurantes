import React, { useEffect } from 'react';
import Navigation  from './App/navigations/Navigation'
import { firebaseApp } from './App/Utils/firebase'
import {LogBox} from 'react-native';

 
LogBox.ignoreLogs(['Setting a timer']);

export default function App() {

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  return (
    
    <Navigation/>
  );
}
