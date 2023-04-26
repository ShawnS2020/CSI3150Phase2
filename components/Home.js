import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

const apiKey = "1863e78f66b2c46e9cf864ca79c4ae90";
const bibleId = "de4e12af7f28f599-01";
const url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books?include-chapters=true";
const books = [];

async function getBooks() {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"api-key": apiKey
			}
		});
		const body = await response.json();
		for (let i = 0; i < body.data.length; i ++) {
			if (i < 39 || i > 52) {
				const chapterCount = body.data[i].chapters.length - 1;
				books.push({ title:body.data[i].name, id:body.data[i].id, chapterCount:chapterCount });
			}
		}
		return books;
	} catch (error) {
		console.error(error);
	}
};

export const Home = ({navigation}) => {

	const [myList, setMyList] = useState([]);

	function handleState(verse) {
		console.log("success");
	}

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
		for (let i = 0; i < body.data.length; i ++) {
			if (i < 39 || i > 52) {
				const chapterCount = body.data[i].chapters.length - 1;
				books.push({ title:body.data[i].name, id:body.data[i].id, chapterCount:chapterCount });
			}
		}
		/*
		setMyList(books);
		*/
	} catch (error) {
		console.error(error);
	}
		
	})();


	return (
		<View>
			<Button
				styles={{height: "90px"}}
				title="Generate a verse"
				onPress={() => navigation.navigate("Generate")}
			/>
			<Button
				title="Add a verse to your collection"
				onPress={() => navigation.navigate("Collection", {handler:handleState, myList:myList})}
			/>
		</View>
	);

};
