import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ChallengeScreen from './src/screens/ChallengeScreen';
import ReportScreen from './src/screens/ReportScreen';

// Definição dos tipos das rotas (TypeScript)
export type RootStackParamList = {
  Home: undefined;
  Challenge: { id: string; title: string; description: string };
  Report: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'CodePath Assist' }} 
        />
        <Stack.Screen 
          name="Challenge" 
          component={ChallengeScreen} 
          options={{ title: 'Desafio Técnico' }}
        />
        <Stack.Screen 
          name="Report" 
          component={ReportScreen} 
          options={{ title: 'Seu Desempenho' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}