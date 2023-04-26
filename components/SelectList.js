import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';

// api data
const apiKey = "81558319b1070f8bb4f17fb32a8d93d0";
const bibleId = "de4e12af7f28f599-01";
const url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books?include-chapters=true";

export const SelectList = ({collectionHandler}) => {
	
	// State is an object with "depth" that the FlatList is in. I.e. whether it is displaying books, chapters of a book, or verses of a chapter
	// And an attribute called items which is an array of the items being displayed
	const [list, setList] = useState("");

	if (list == "") {
		getBooks();
	}

	// Initial api call to get all books
	async function getBooks() {
		const books = [];
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
				// Ignoring apocryphal books
				if (i < 39 || i > 52) {
					const chapterCount = body.data[i].chapters.length - 1;
					// Book items have a title for displaying in the FlatList
					// An id needed for getting that books chapters
					// And a chapter count
					books.push({ title:body.data[i].name, id:body.data[i].id, chapterCount:chapterCount });
				}
			}
			// list keeps track of the depth, books, chapters, and verses so data persists as the user moves through the list
			setList({depth:"books", items:books, books:books, chapters:[], verses:[]});
		} catch (error) {
			console.error(error);
		}
	};
	
	// This function is called when the user clicks a chapter
	// API gets the amount of verses in the chapter for displaying the FlatList
	async function getVerseCount(chapterId) {
		const url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/chapters/" + chapterId + "/verses";
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"api-key": apiKey
				}
			});
			const body = await response.json();
			return body.data.length;
		} catch (error) {
			console.error(error);
		}
	}

	// This function gets a specific verse when the user clicks a verse
	// Verse is used to update the state in the parent component
	async function getVerse(verseId) {
		const url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-02/verses/" + verseId + "?content-type=text&include-notes=false&include-titles=true&include-chapter-numbers=false&include-verse-numbers=true&include-verse-spans=false&use-org-id=false";
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"api-key": apiKey
				}
			});
			const body = await response.json();
			return body.data.content;
		} catch (error) {
			console.error(error);
		}
	}

	// Function for when the user clicks any button besides back
	async function increaseDepth(item) {
		if (list.depth == "books") {
			chapters = [];
			for (let i = 1; i <= item.chapterCount; i ++) {
				chapters.push({ title:"" + i, chapterId:item.id + "." + i});
			}
			setList({depth:"chapters", items:chapters, books:list.books, chapters:chapters, verses:[]});
		} else if (list.depth == "chapters") {
			const verses = [];
			const verseCount = await getVerseCount(item.chapterId);
			for (let i = 0; i < verseCount; i ++) {
				verses.push({ title:"" + (i + 1), verseId:item.chapterId + "." + (i + 1)});
			}
			setList({depth:"verses", items:verses, books:list.books, chapters:list.chapters, verses:verses});
		} else if (list.depth == "verses") {
			const verseId = item.verseId;
			const verse = {id:verseId, content:await getVerse(verseId)};
			collectionHandler(verse);
		}
	}

	// Function for when the user clicks back
	function decreaseDepth() {
		if (list.depth == "chapters") {
			setList({depth:"books", items:list.books, books:list.books, chapters:[], verses:[]});
		} else if (list.depth == "verses") {
			setList({depth:"chapters", items:list.chapters, books:list.books, chapters:list.chapters, verses:[]});
		}
	}

	// Back button only appears when depth is at chapters or verses
	const BackButton = () => {
		if (list.depth != "books") {
			return (
				<Button
					title="back"
					onPress={() => { decreaseDepth() }}
				/>
			);
		}
	}

	// Label at the top of FlatList changes depending on depth
	const MenuLabel = () => {
		let label;
		if (list.depth == "books") {
			label = "BOOKS";
		} else if (list.depth == "chapters") {
			label = "CHAPTERS";
		} else {
			label = "VERSES";
		}
		return (
			<Text style={styles.label}>{label}</Text>
		);
	}

	return (
		<View style={styles.container}>
		<MenuLabel/>
		<BackButton/>
		<FlatList 
			data={list.items}
			renderItem={({item}) =>
				<Button
					title={item.title}
					onPress={() => { increaseDepth(item); }}
				/>
			}
		/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	label: {
		height: 35,
		textAlign: "center",
		backgroundColor: "darkblue",
		color: "white",
		fontSize: 25
	}
});
