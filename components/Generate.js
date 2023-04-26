import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';
import { WebView } from 'react-native-webview';

const apiKey = "1863e78f66b2c46e9cf864ca79c4ae90";
const bibleId = "de4e12af7f28f599-02";
const verseId = "PRO.9.10";
let verse;
const url = "https://api.scripture.api.bible/v1/bibles/" + bibleId + "/verses/" + verseId +  "?content-type=html&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false";

export const Generate = ({navigation, route}) => {

const [verse, setVerse] = useState("");

(async () => {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"api-key": apiKey
			}
		});
		const body = await response.json();
		const verse = body.data.content;
		setVerse(verse);
	} catch (error) {
		console.error(error);
	}
})();

return (
	<View style={styles.container}>
		<View style={styles.verseWrapper}>
		<WebView
			style={styles.webView}
			source = {{html: "<h1 style='font-size: 50px; text-align: center'>" + verse + "</h1>"}}
		/>
		</View>
	</View>
);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0000FF',
		justifyContent: 'center',
	},
	verseWrapper: {
		width: "100%",
		height: "90%",
		fontSize: 20
	},
	webView: {
		backgroundColor: "pink"
	}
});
