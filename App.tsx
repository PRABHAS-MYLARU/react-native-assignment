import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import InboxScreen from './src/screens/InboxScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Inbox"
          screenOptions={{
            headerStyle: { backgroundColor: '#10B981' },
            headerTintColor: 'white',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Stack.Screen name="Inbox" component={InboxScreen} options={{ title: '🦷 Dental Inbox' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' }
});
