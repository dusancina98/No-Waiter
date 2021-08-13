import { StyleSheet, Dimensions } from "react-native";

// screen sizing
const { width, height } = Dimensions.get("window");
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

export const welcomeStyles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logoContainer: {
		alignItems: "center",
		position: "absolute",
		top: 80,
	},
	logoText: {
		color: "white",
		fontSize: 45,
		fontFamily: "roboto-light",
		fontWeight: "bold",
	},
	registerButton: {
		width: "90%",
		marginTop: 10,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	loginButton: {
		width: "90%",
		marginTop: 100,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
	},
	registerText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	loginText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const loginStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	loginForm: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 100,
		width: "100%",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	loginButton: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const activateAccountStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	button: {
		alignSelf: "center",
		width: "90%",
		marginTop: 40,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
		paddingHorizontal: 10,
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const registrationStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
	},
	logoText: {
		color: "white",
		fontSize: 45,
		fontFamily: "roboto-light",
		fontWeight: "bold",
	},
	registrationForm: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		width: "100%",
	},
	textForm: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	button: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const objectsPageStyles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginLeft: RECIPE_ITEM_MARGIN,
		marginTop: 20,
		width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
		height: "100%",
		borderColor: "#cccccc",
		borderWidth: 0.5,
		borderRadius: 15,
	},
	photo: {
		width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
		height: RECIPE_ITEM_HEIGHT,
		borderRadius: 15,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	title: {
		flex: 1,
		fontSize: 17,
		fontWeight: "bold",
		textAlign: "center",
		color: "#444444",
		marginTop: 3,
		marginRight: 5,
		marginLeft: 5,
	},
	category: {
		textAlign: "center",
		marginTop: 5,
		marginBottom: 5,
	},
});

const { width: viewportWidth } = Dimensions.get("window");

export const objectScreenStyles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		width: "100%",
		height: 250,
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		width: viewportWidth,
		height: 250,
	},
	infoObjectContainer: {
		flex: 1,
		marginTop: 5,
		marginLeft: 25,
		marginRight: 25,
		justifyContent: "space-between",
		alignItems: "flex-start",
		flexDirection: "row",
	},
	infoObjectName: {
		fontSize: 28,
		margin: 10,
		fontWeight: "bold",
		color: "black",
	},
	infoObjectFavoriteIcon: {
		fontSize: 28,
		margin: 10,
		fontWeight: "bold",
		color: "black",
	},
	moreInformationButtonContainer: {
		marginRight: 35,
		flexDirection: "row",
		alignSelf: "flex-end",
		marginBottom: 15,
	},
	customerWorkTimeInfoContainer: {
		marginTop: 5,
		marginLeft: 35,
		marginBottom: 5,
		marginRight: 35,
		flexDirection: "row",
	},
	customerFeedbackInfoContainer: {
		marginLeft: 35,

		flexDirection: "row",
	},
	logoImage: {
		width: 20,
		height: 20,
	},
});

export const productItemStyles = StyleSheet.create({
	itemContainer: {
		backgroundColor: "white",
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
		borderWidth: 0,
		borderRadius: 15,
	},
	itemSubContainer: {
		flexDirection: "row",
		paddingVertical: 10,
	},
	image: {
		height: 100,
		width: 100,
		marginRight: 10,
	},
	content: {
		flex: 1,
		paddingLeft: 15,
		justifyContent: "space-between",
	},
	itemName: {
		fontSize: 17,
		color: "#617ae1",
	},
	itemIngredient: {
		fontSize: 16,
		color: "#5F5F5F",
	},
	itemDescription: {
		fontSize: 12,
		color: "#a4a4a4",
	},
	priceContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	price: {
		fontSize: 17,
		color: "#617ae1",
		textAlign: "right",
	},
});

export const userInfoStyle = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		paddingHorizontal: 10,
		marginTop: 20,
	},
	userDetailsContainer: {
		height: 70,
		borderRadius: 10,
		backgroundColor: "lightgray",
		flexDirection: "row",
		alignSelf: "center",
		paddingHorizontal: 20,
	},
	userImageContainer: {
		flex: 1,
		alignSelf: "center",
	},
	userInfo: {
		marginLeft: 15,
		alignSelf: "center",
		fontSize: 25,
		flex: 4,
	},
	button: {
		width: "100%",
		marginTop: 20,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "white",
		borderRadius: 10,
		borderWidth: 1,
		alignSelf: "center",
		borderColor: "black",
	},
	buttonText: {
		color: "black",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const profileEditStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
	},
	logoContainer: {
		alignItems: "center",
	},
	logoText: {
		color: "black",
		fontSize: 35,
		fontFamily: "roboto-light",
		fontWeight: "bold",
		marginTop: 20,
	},
	form: {
		alignSelf: "flex-start",
		marginLeft: 20,
		marginRight: 20,
		width: "100%",
	},
	textForm: {
		color: "black",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
	},
	textInputUneditable: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "lightgray",
	},
	textInput: {
		paddingHorizontal: 10,
		fontSize: 18,
		height: 50,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 15,
		width: "90%",
		backgroundColor: "white",
	},
	button: {
		width: "50%",
		marginTop: 30,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "#b99849",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#b99849",
	},
	errorMessage: {
		color: "red",
		fontSize: 15,
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10,
		textAlign: "center",
	},
});

export const userAddressesStyle = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		width: "100%",
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 1,
	},
	containerWrapperGray: {
		flex: 1,
		width: "100%",
		backgroundColor: "lightgray",
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginTop: 1,
	},
	addressInfo: {
		alignItems: "center",
		flexDirection: "row",
	},
	footerButton: {
		width: "100%",
		paddingVertical: 10,
		backgroundColor: "white",
	},
	footerButtonText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#b99849",
		textAlign: "center",
		paddingVertical: 10,
	},
});

export const objectDetailsStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingVertical: 10,
		marginTop: 1,
	},
	infoObjectName: {
		margin: 15,
		fontSize: 42,
		fontWeight: "bold",
		color: "black",
	},
	addessTitle: {
		marginLeft: 15,
		marginRight: 15,
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
	address: {
		marginTop: 3,
		marginLeft: 15,
		fontSize: 16,
		color: "black",
	},
	workTimeTitle: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
	workDayContainer: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	workDay: {
		flexDirection: "row",
		marginTop: 3,
		fontSize: 16,
		color: "black",
	},
	contactTitle: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 20,
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
	contactContainer: {
		marginLeft: 15,
		marginRight: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	contact: {
		flexDirection: "row",
		marginTop: 3,
		fontSize: 16,
		color: "black",
	},
});

export const productDetailsStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingVertical: 10,
		height: "100%",
		marginTop: 1,
	},
	productName: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		fontSize: 24,
		fontWeight: "bold",
		color: "black",
	},
	descriptionContainer: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		flexWrap: "wrap",
		flexDirection: "row",
	},
	descriptionTitle: {
		flexDirection: "row",
		marginTop: 3,
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	descriptionContent: {
		flexDirection: "row",
		marginTop: 3,
		marginRight: 15,
		fontSize: 16,
		color: "#5F5F5F",
		flexWrap: "wrap",
	},
	ingredientContainer: {
		flexWrap: "wrap",
		marginLeft: 15,
		marginRight: 15,
		marginTop: 10,
		flexWrap: "wrap",
		flexDirection: "row",
	},
	ingredientTitle: {
		flexDirection: "row",
		marginTop: 3,
		fontSize: 16,
		fontWeight: "bold",
		color: "black",
	},
	ingredientContent: {
		flexWrap: "wrap",
		marginLeft: 1,
		marginTop: 3,
		fontSize: 16,
	},
	ingredientDataContent: {
		flexWrap: "wrap",
		marginLeft: 1,
		fontSize: 16,
	},
	quantityButtonContainer: {
		alignItems: "center",
		marginTop: 50,
	},
	enterQuantityText: {
		marginBottom: 8,
		fontSize: 16,
		color: "#5F5F5F",
	},
	selectSideDishesContainer: {
		alignItems: "center",
		marginTop: 50,
		marginLeft: 15,
		marginRight: 15,
	},
	noteContainer: {
		marginTop: 50,
		marginLeft: 15,
		marginRight: 15,
	},
	textNote: {
		alignItems: "flex-start",
		fontSize: 16,
		color: "#5F5F5F",
	},
	noteInput: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		fontSize: 14,
		height: 60,
		marginTop: 5,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "lightgray",
		width: "100%",
		backgroundColor: "white",
		textAlignVertical: "top",
	},
	buttonContainer: {
		marginTop: 50,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 15,
		alignItems: "flex-end",
	},
});

export const shoppingCartPreviewStyle = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: 50,
		flexDirection: "row",
		borderTopColor: "#b99849",
		borderTopWidth: 1,
	},
	itemsCount: {
		marginLeft: 5,
		alignSelf: "center",
		flex: 2,
		color: "#b99849",
	},
	itemsPrice: {
		alignSelf: "center",
		textAlign: "center",
		flex: 3,
		color: "#b99849",
		fontSize: 18,
	},
	checkoutButton: {
		flex: 2,
		backgroundColor: "#b99849",
		alignSelf: "center",
		alignContent: "center",
		borderRadius: 10,
		paddingVertical: 5,
		marginRight: 5,
		borderWidth: 1,
		borderColor: "white",
	},
	checkoutButtonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});

export const checkoutStyle = StyleSheet.create({
	container: {
		backgroundColor: "white",
		height: 50,
		width: "95%",
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "center",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "lightgray",
		marginBottom: 10,
	},
	orderPriceContainer: {
		backgroundColor: "white",
		height: 50,
		flexDirection: "row",
	},
});

export const qrScannerStyles = StyleSheet.create({
	containerWrapper: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
	},
	button: {
		width: "50%",
		marginTop: 420,
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: 30,
		marginRight: 30,
		backgroundColor: "transparent",
		borderRadius: 10,
		borderWidth: 1,
		alignSelf: "center",
		borderColor: "white",
	},
	buttonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "roboto-regular",
		fontWeight: "400",
		textAlign: "center",
	},
});
