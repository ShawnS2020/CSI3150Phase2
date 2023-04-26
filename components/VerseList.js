import { StyleSheet, Text, View, Button, FlatList } from 'react-native';

const verseData = [
	{
		verseID: "GEN.1.1",
		content: "Genesis 1:1"
	},
	{
		verseID: "PRO.9.10",
		content: "Proverbs 9:10"
	}
];

export const VerseList = () => (
	<FlatList
		data={verseData}
		renderItem={({item}) => <Text>{item.content}</Text>}
	/>
);
