import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();

function RootNavigation() {

  const { user } = useAuthentication();

  return (
      <></>
  )
}

export default RootNavigation