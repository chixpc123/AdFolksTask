import React from "react";
import { View, FlatList, Text, Image, TouchableOpacity } from "react-native";

import styles from "./styles";

import TestData from "../demo_data.json";

import { ASSETS } from "../config";

const Header = () => {
	return (
		<View style={styles.header}>
			<View style={styles.headerContainerTxt}>
				<Text style={styles.headerTitleTxt}>Messages</Text>
			</View>
			<View style={styles.menuIconContainer}>
				<TouchableOpacity>
					<Image style={styles.headerIcon} source={ASSETS.SEARCH_ICON} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Image style={styles.headerIcon} source={ASSETS.MENU_ICON} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const MessageComponent = props => {
	const { sender_name, message, sender_img, date_time } = props.value;
	return (
		<View style={styles.msgContainer}>
			<Image style={styles.msgCompImg} source={{ uri: sender_img }} />
			<View style={styles.mggCompDetails}>
				<Text style={styles.sndrNameTxt}>{sender_name}</Text>
				<Text style={styles.messageTxt}>{message}</Text>
			</View>
			<Text style={styles.timeTxt}>{date_time}</Text>
		</View>
	);
};

const ListComponent = () => {
	return (
		<FlatList
			data={TestData}
			keyExtractor={(item, index) => `${index}`}
			renderItem={({ item }) => <MessageComponent value={item} />}
		/>
	);
};

const App = () => {
	return (
		<View style={styles.container}>
			<Header />
			<ListComponent />
		</View>
	);
};

export default App;
