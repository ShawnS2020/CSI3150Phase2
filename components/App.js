import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './Home.js';
import { Generate } from './Generate.js';
import { Collection } from './Collection.js';

const Stack = createNativeStackNavigator();

export default function App() {

	return (
		<NavigationContainer>
			<Stack.Navigator>
			        <Stack.Screen name="Home" component={Home}/>
			        <Stack.Screen name="Generate" component={Generate}/>
			        <Stack.Screen name="Collection" component={Collection}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
