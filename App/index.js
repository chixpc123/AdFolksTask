import React from "react";
import {
	View,
	FlatList,
	Text,
	TextInput,
	Image,
	Animated,
	Keyboard,
	TouchableOpacity
} from "react-native";

import styles from "./styles";

import TestData from "../demo_data.json";

import { ASSETS } from "../config";

class Header extends React.Component {
	currentInputShowing = false;
	titleOpacity = 1;
	inputRef = null;
	constructor(props) {
		super(props);

		this.state = {
			animatedInput: new Animated.Value(0)
		};
	}

	componentDidMount() {
		Keyboard.dismiss();
	}

	onClickSearch = () => {
		if (!this.currentInputShowing) {
			Animated.timing(this.state.animatedInput, {
				toValue: 1,
				timing: 500
			}).start(() => {
				this.currentInputShowing = true;
			});
		}
	};

	onClickClose = () => {
		if (this.currentInputShowing) {
			this.inputRef.blur();
			Keyboard.dismiss();
			Animated.timing(this.state.animatedInput, {
				toValue: 0,
				timing: 500
			}).start(() => {
				this.currentInputShowing = false;
			});
		}
	};

	render() {
		this.titleOpacity = this.state.animatedInput.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0]
		});

		this.inputTransform = this.state.animatedInput.interpolate({
			inputRange: [0, 1],
			outputRange: [-60, 15]
		});

		this.menuIcon = this.state.animatedInput.interpolate({
			inputRange: [0, 1],
			outputRange: [40, 100]
		});

		this.crossIcon = this.state.animatedInput.interpolate({
			inputRange: [0, 1],
			outputRange: [100, 40]
		});

		return (
			<View style={styles.header}>
				<Animated.View
					style={[styles.headerContainerTxt, { opacity: this.titleOpacity }]}
				>
					<Text style={styles.headerTitleTxt}>Messages</Text>
				</Animated.View>
				<Animated.View
					style={[
						styles.textInputContainer,
						{ transform: [{ translateY: this.inputTransform }] }
					]}
				>
					<TextInput
						ref={refs => (this.inputRef = refs)}
						style={styles.textInput}
						onChangeText={this.props.onChangeSearch}
					/>
				</Animated.View>

				<View style={styles.menuIconContainer}>
					<View style={styles.menuIconMargin}>
						<TouchableOpacity onPress={this.onClickSearch}>
							<Image style={styles.headerIcon} source={ASSETS.SEARCH_ICON} />
						</TouchableOpacity>
					</View>
					<Animated.View
						style={{
							position: "absolute",
							transform: [{ translateX: this.menuIcon }]
						}}
					>
						<TouchableOpacity>
							<Image style={styles.headerIcon} source={ASSETS.MENU_ICON} />
						</TouchableOpacity>
					</Animated.View>
					<Animated.View
						style={{
							position: "absolute",
							transform: [{ translateX: this.crossIcon }]
						}}
					>
						<TouchableOpacity onPress={this.onClickClose}>
							<Image style={styles.headerIcon} source={ASSETS.CROSS_ICON} />
						</TouchableOpacity>
					</Animated.View>
				</View>
			</View>
		);
	}
}

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

const ListComponent = ({ listData }) => {
	return (
		<FlatList
			data={listData}
			keyExtractor={(item, index) => `${index}`}
			renderItem={({ item }) => <MessageComponent value={item} />}
			extraData={listData}
		/>
	);
};

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			searchValue: "",
			listData: TestData
		};
	}

	onChangeSearch = text => {
		this.setState({ searchValue: text }, () => {
			if (text != "") {
				this.setState({
					listData: this.state.listData.filter(val => {
						return (
							val.sender_name.toLowerCase().indexOf(text.toLowerCase()) != -1
						);
					})
				});
			} else {
				this.setState({
					listData: TestData
				});
			}
		});
	};

	render() {
		return (
			<View style={styles.container}>
				<Header onChangeSearch={this.onChangeSearch} />
				<ListComponent listData={this.state.listData} />
			</View>
		);
	}
}

export default App;
