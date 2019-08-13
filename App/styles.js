import { StyleSheet } from "react-native";

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white"
	},
	header: {
		height: 70,
		width: "100%",
		backgroundColor: "white",
		elevation: 10,
		position: "relative"
	},
	textInputContainer: {
		position: "absolute",
		left: 20,
		right: 80,
		borderBottomWidth: 1,
		borderBottomColor: "black"
	},
	textInput: { height: 40, width: "100%" },

	msgContainer: {
		flex: 1,
		flexDirection: "row"
	},
	msgCompImg: {
		height: 50,
		width: 50,
		borderRadius: 25,
		marginHorizontal: 15,
		marginVertical: 15
	},
	mggCompDetails: { flex: 1, paddingVertical: 15, paddingHorizontal: 5 },
	sndrNameTxt: { fontSize: 16, fontWeight: "600" },
	messageTxt: { flexWrap: "wrap" },
	timeTxt: { width: 60, height: "100%", padding: 5, marginTop: 10 },
	headerContainerTxt: { alignSelf: "center" },
	headerTitleTxt: { fontSize: 20, marginTop: 20 },
	menuIconContainer: {
		alignSelf: "flex-end",
		flexDirection: "row",
		marginTop: -25
	},
	menuIconMargin: { marginRight: 40 },
	headerIcon: { height: 20, width: 20, marginHorizontal: 10 }
});
