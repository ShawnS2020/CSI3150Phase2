import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { useState } from 'react';
import { SelectList } from './SelectList.js';
import { VerseList } from './VerseList.js';

export const Collection = ({route}) => {

	return (
		<View style={styles.container}>
			<View style={styles.verseList}>
				<Text style={styles.heading}>Your verses</Text>
				<VerseList/>
			</View>
			<View style={styles.selectList}>
				<Text style={styles.heading}>Add Verses</Text>
				<SelectList myList={route.params.myList}/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	verseList: {
		flex: 1
	},
	selectList: {
		flex: 2
	},
	heading: {
		marginBottom: 10,
		textAlign: "center",
		fontSize: 20
	}
});
