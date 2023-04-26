import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import { SelectList } from './SelectList.js';

let verse;

export default function App() {

	const [verse, setVerse] = useState({content:""});
	const [collection, setCollection] = useState([]);

	function collectionHandler(newVerse) {
		const updatedCollection = collection.slice();
		let doesExist = false;
		for (let i = 0; i < collection.length; i ++) {
			if (collection[i].id == newVerse.id) {
				doesExist = true;
			}
		}
		if (doesExist == false) {
			updatedCollection.push(newVerse);
			setCollection(updatedCollection);
		}
	}

	function generateVerse() {
		if (collection.length > 0) {
			const randIndex = Math.floor(Math.random() * collection.length);
			setVerse(collection[randIndex]);
		}
	}

	return (
		<View style={styles.container}>
			<View style={styles.generateWrapper}>
				<Button
					style={styles.button}
					title="Generate a verse"
					onPress={() => generateVerse()}
				/>
				<Text style={styles.verse}>{verse.content}</Text>
			</View>
			<View style={styles.yourVersesWrapper}>
				<Text style={styles.text}>Your verses</Text>
				<FlatList
					numColumns={5}
					style={styles.list}
					data={collection}
					renderItem={({item}) => <Text style={styles.listItem}>{item.id}   </Text>}
				/>
			</View>
				<Text style={styles.text}>Add a verse to your collection</Text>
				<SelectList collectionHandler={collectionHandler}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	generateWrapper: {
		marginTop: 50,
		width: "100%",
		backgroundColor: "pink",
	},
	verse: {
		marginVertical: 10,
		textAlign: "center",
	},
	button: {
		flex: 3,
		height: 90
	},
	text: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20
	},
	yourVersesWrapper: {
		alignItems: "center",
		height: 150
	},
	list: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	webView: {
		flex: 3,
		backgroundColor: "pink"
	}
});
