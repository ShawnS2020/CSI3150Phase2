import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';

const apiKey = "1863e78f66b2c46e9cf864ca79c4ae90";
const bibleId = "de4e12af7f28f599-01";
const url = "https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/books?include-chapters=true";
const books = [];
let chapters = [];
const verses = [];

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
	} catch (error) {
		console.error(error);
	}
})();

export const SelectList = ({myList}) => {
	console.log(myList);
	
	const [list, setList] = useState({depth:"books", items:books.slice()});
	
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

	function increaseDepth(item) {
		if (list.depth == "books") {
			chapters = [];
			for (let i = 1; i <= item.chapterCount; i ++) {
				chapters.push({ title:"" + i, chapterId:item.id + "." + i});
			}
			setList({depth:"chapters", items:chapters});
		} else if (list.depth == "chapters") {
			const verses = [];
			let verseCount;
			getVerseCount(item.chapterId).then(value => {
				for (let i = 0; i < value; i ++) {
					verses.push({ title:"" + (i + 1) });
				}
				setList({depth:"verses", items:verses});
			});
		} else if (list.depth == "verses") {
			
		}
	}

	function decreaseDepth() {
		if (list.depth == "chapters") {
			setList({depth:"books", items:books});
		} else if (list.depth == "verses") {
			setList({depth:"chapters", items:chapters});
		}
	}

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
